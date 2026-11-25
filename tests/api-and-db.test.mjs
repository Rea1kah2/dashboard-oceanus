import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import { spawn } from 'node:child_process';
import Database from 'better-sqlite3';

function getFreePort() {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.unref();
    srv.on('error', reject);
    srv.listen(0, '127.0.0.1', () => {
      const addr = srv.address();
      const port = typeof addr === 'object' && addr ? addr.port : 3456;
      srv.close(() => resolve(port));
    });
  });
}

const projectRoot = process.cwd();
const dbPath = path.join(projectRoot, 'data', 'oceanus.db');
const standaloneServerPath = path.join(projectRoot, '.next', 'standalone', 'server.js');

test('SQLite database integrity & non-WAL portability', () => {
  assert.ok(fs.existsSync(dbPath), 'data/oceanus.db harus ada');
  assert.equal(fs.existsSync(`${dbPath}-wal`), false, 'File -wal tidak boleh ada');
  assert.equal(fs.existsSync(`${dbPath}-shm`), false, 'File -shm tidak boleh ada');

  const db = new Database(dbPath, { readonly: true, fileMustExist: true });
  try {
    const mode = db.pragma('journal_mode', { simple: true });
    assert.equal(mode, 'delete', 'journal_mode harus delete untuk portabilitas read-only');

    const total = db.prepare('SELECT COUNT(*) as c FROM kreator').get();
    assert.equal(total.c, 11361, 'Total kreator harus 11.361');

    const genres = db.prepare('SELECT COUNT(DISTINCT genre_utama) as c FROM kreator').get();
    assert.equal(genres.c, 27, 'Total genre unik harus 27');

    const peranIdx = db
      .prepare("SELECT name FROM sqlite_master WHERE type='index' AND name='idx_kreator_peran'")
      .get();
    assert.ok(peranIdx, 'Indeks idx_kreator_peran harus terpasang');
  } finally {
    db.close();
  }
});

async function waitForServer(url, timeoutMs = 15000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // Tunggu server siap
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Server tidak merespons di ${url} dalam ${timeoutMs}ms`);
}

test('Production standalone server & REST API endpoints', async (t) => {
  assert.ok(
    fs.existsSync(standaloneServerPath),
    'Jalankan `npm run build` terlebih dulu sebelum `npm test` (.next/standalone/server.js belum ada).'
  );

  const port = await getFreePort();
  const baseUrl = `http://127.0.0.1:${port}`;

  const serverProc = spawn(process.execPath, [standaloneServerPath], {
    cwd: projectRoot,
    env: {
      ...process.env,
      NODE_ENV: 'production',
      HOSTNAME: '127.0.0.1',
      PORT: String(port),
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  let stderrLogs = '';
  serverProc.stderr.on('data', (chunk) => {
    stderrLogs += chunk.toString();
  });

  t.after(() => {
    if (!serverProc.killed) {
      serverProc.kill('SIGTERM');
    }
  });

  try {
    await waitForServer(`${baseUrl}/api/health`);
  } catch (err) {
    throw new Error(`${err.message}\nServer stderr:\n${stderrLogs}`);
  }

  await t.test('GET /api/health returns 200 & 11361 records', async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    assert.equal(res.status, 200);
    const json = await res.json();
    assert.equal(json.status, 'ok');
    assert.equal(json.records, 11361);
  });

  await t.test('GET /api/stats returns KPI metrics + dynamic buckets + cache/security headers', async () => {
    const res = await fetch(`${baseUrl}/api/stats`);
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('x-content-type-options'), 'nosniff');
    assert.equal(res.headers.get('x-frame-options'), 'DENY');
    assert.match(res.headers.get('cache-control') || '', /s-maxage=3600/);

    const json = await res.json();
    assert.equal(json.total_kreator, 11361);
    assert.equal(json.genre_terbanyak, 'Dream Pop');
    assert.equal(json.kreator_elite, 65);
    assert.ok(Array.isArray(json.buckets) && json.buckets.length === 5);
    const bucketSum = json.buckets.reduce((acc, b) => acc + b.count, 0);
    assert.equal(bucketSum, 11361);
  });

  await t.test('GET /api/genre, /api/trend, /api/peran return expected shapes', async () => {
    const [genreRes, trendRes, peranRes] = await Promise.all([
      fetch(`${baseUrl}/api/genre`),
      fetch(`${baseUrl}/api/trend`),
      fetch(`${baseUrl}/api/peran`),
    ]);

    assert.equal(genreRes.status, 200);
    assert.equal(trendRes.status, 200);
    assert.equal(peranRes.status, 200);

    const [genres, trends, peran] = await Promise.all([
      genreRes.json(),
      trendRes.json(),
      peranRes.json(),
    ]);
    assert.equal(genres.length, 27);
    assert.equal(trends.length, 7);
    assert.equal(peran.length, 7);
  });

  await t.test('GET /api/leaderboard returns full Kreator fields (fixes modal NaN bug)', async () => {
    for (const metric of ['notable', 'pengaruh', 'karya']) {
      const res = await fetch(`${baseUrl}/api/leaderboard?by=${metric}`);
      assert.equal(res.status, 200);
      const rows = await res.json();
      assert.equal(rows.length, 10);

      for (const row of rows) {
        assert.equal(typeof row.n_performer, 'number');
        assert.equal(typeof row.n_komposer, 'number');
        assert.equal(typeof row.n_lirik, 'number');
        assert.equal(typeof row.n_produser, 'number');
        assert.equal(typeof row.n_genre, 'number');
        assert.equal(typeof row.n_grup, 'number');
        assert.equal(typeof row.n_peran, 'number');
        assert.equal(typeof row.bucket_karya, 'string');
        assert.ok(row.bucket_karya.length > 0);
      }
    }
  });

  await t.test('GET /api/kreator handles invalid params, wildcard escaping, and peran filter', async () => {
    // Non-numeric page/limit fallback
    const badParamsRes = await fetch(`${baseUrl}/api/kreator?page=abc&limit=xyz`);
    assert.equal(badParamsRes.status, 200);
    const badParamsJson = await badParamsRes.json();
    assert.equal(badParamsJson.page, 1);
    assert.equal(badParamsJson.limit, 20);
    assert.equal(badParamsJson.data.length, 20);

    // SQL LIKE wildcard '%' must be escaped
    const wildcardRes = await fetch(`${baseUrl}/api/kreator?search=%25`);
    assert.equal(wildcardRes.status, 200);
    const wildcardJson = await wildcardRes.json();
    assert.equal(wildcardJson.total, 0);

    // Peran filter
    const peranRes = await fetch(`${baseUrl}/api/kreator?peran=4`);
    assert.equal(peranRes.status, 200);
    const peranJson = await peranRes.json();
    assert.equal(peranJson.total, 81);
    assert.ok(peranJson.data.every((k) => k.n_peran === 4));
  });

  await t.test('GET /api/kreator/export returns UTF-8 BOM CSV matching active filter', async () => {
    const res = await fetch(`${baseUrl}/api/kreator/export?genre=Dream%20Pop`);
    assert.equal(res.status, 200);
    assert.match(res.headers.get('content-type') || '', /text\/csv/);
    assert.equal(res.headers.get('x-export-count'), '2535');

    const rawBytes = new Uint8Array(await res.arrayBuffer());
    assert.equal(rawBytes[0], 0xef, 'Byte 0 harus UTF-8 BOM (0xEF)');
    assert.equal(rawBytes[1], 0xbb, 'Byte 1 harus UTF-8 BOM (0xBB)');
    assert.equal(rawBytes[2], 0xbf, 'Byte 2 harus UTF-8 BOM (0xBF)');

    const body = new TextDecoder('utf-8').decode(rawBytes);
    const lines = body.trim().split('\r\n');
    assert.equal(lines.length, 2536, 'Harus 1 header + 2535 baris Dream Pop');
    assert.match(lines[0], /^ID Kreator,Nama,Nama Panggung,Genre Utama/);
  });

  await t.test('Homepage & SVG icon serve without error', async () => {
    const [homeRes, iconRes] = await Promise.all([
      fetch(`${baseUrl}/`),
      fetch(`${baseUrl}/icon.svg`),
    ]);
    assert.equal(homeRes.status, 200);
    assert.equal(iconRes.status, 200);
  });

  assert.equal(stderrLogs.includes('Error:'), false, `Server stderr tidak boleh error: ${stderrLogs}`);
});
