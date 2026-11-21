import Database from 'better-sqlite3';
import * as xlsxModule from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const XLSX = xlsxModule.default || xlsxModule;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const excelPath = path.join(projectRoot, 'data', 'Analisis Kreator Musik Oceanus.xlsx');
const dbPath = path.join(projectRoot, 'data', 'oceanus.db');

console.log('🌊 Inisialisasi Ingesti Data Oceanus...');
console.log(`📁 Sumber Excel: ${excelPath}`);
console.log(`💾 Target SQLite: ${dbPath}`);

if (!fs.existsSync(excelPath)) {
  console.error(`❌ Error: File Excel tidak ditemukan di ${excelPath}`);
  process.exit(1);
}

// Hapus file db lama jika ada
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
  console.log('🧹 Menghapus database lama...');
}

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');

// DDL
db.exec(`
  CREATE TABLE kreator (
    id_kreator        INTEGER PRIMARY KEY,
    nama              TEXT NOT NULL,
    nama_panggung     TEXT DEFAULT '',
    n_performer       INTEGER DEFAULT 0,
    n_komposer        INTEGER DEFAULT 0,
    n_lirik           INTEGER DEFAULT 0,
    n_produser        INTEGER DEFAULT 0,
    total_karya       INTEGER DEFAULT 0,
    karya_notable     INTEGER DEFAULT 0,
    n_genre           INTEGER DEFAULT 0,
    genre_utama       TEXT,
    thn_pertama       INTEGER,
    thn_terakhir      INTEGER,
    pengaruh_diterima INTEGER DEFAULT 0,
    karya_dirujuk     INTEGER DEFAULT 0,
    n_grup            INTEGER DEFAULT 0,
    n_peran           INTEGER DEFAULT 0,
    bucket_karya      TEXT
  );

  CREATE INDEX idx_kreator_genre   ON kreator(genre_utama);
  CREATE INDEX idx_kreator_bucket  ON kreator(bucket_karya);
  CREATE INDEX idx_kreator_thn     ON kreator(thn_pertama);
  CREATE INDEX idx_kreator_notable ON kreator(karya_notable DESC);
  CREATE INDEX idx_kreator_karya   ON kreator(total_karya DESC);
  CREATE INDEX idx_kreator_pengaruh ON kreator(pengaruh_diterima DESC);
  CREATE INDEX idx_kreator_nama    ON kreator(nama COLLATE NOCASE);
`);

console.log('📖 Membaca workbook Excel...');
const workbook = XLSX.readFile(excelPath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const rawData = XLSX.utils.sheet_to_json(sheet);

console.log(`📊 Total baris dibaca: ${rawData.length}`);

const insertStmt = db.prepare(`
  INSERT INTO kreator (
    id_kreator,
    nama,
    nama_panggung,
    n_performer,
    n_komposer,
    n_lirik,
    n_produser,
    total_karya,
    karya_notable,
    n_genre,
    genre_utama,
    thn_pertama,
    thn_terakhir,
    pengaruh_diterima,
    karya_dirujuk,
    n_grup,
    n_peran,
    bucket_karya
  ) VALUES (
    @id_kreator,
    @nama,
    @nama_panggung,
    @n_performer,
    @n_komposer,
    @n_lirik,
    @n_produser,
    @total_karya,
    @karya_notable,
    @n_genre,
    @genre_utama,
    @thn_pertama,
    @thn_terakhir,
    @pengaruh_diterima,
    @karya_dirujuk,
    @n_grup,
    @n_peran,
    @bucket_karya
  )
`);

const insertMany = db.transaction((rows) => {
  for (const r of rows) {
    insertStmt.run({
      id_kreator: Number(r.id_kreator) || 0,
      nama: String(r.nama || '').trim(),
      nama_panggung: String(r.nama_panggung || '').trim(),
      n_performer: Number(r.n_performer) || 0,
      n_komposer: Number(r.n_komposer) || 0,
      n_lirik: Number(r.n_lirik) || 0,
      n_produser: Number(r.n_produser) || 0,
      total_karya: Number(r.total_karya) || 0,
      karya_notable: Number(r.karya_notable) || 0,
      n_genre: Number(r.n_genre) || 0,
      genre_utama: String(r.genre_utama || '').trim(),
      thn_pertama: Number(r.thn_pertama) || null,
      thn_terakhir: Number(r.thn_terakhir) || null,
      pengaruh_diterima: Number(r.pengaruh_diterima) || 0,
      karya_dirujuk: Number(r.karya_dirujuk) || 0,
      n_grup: Number(r.n_grup) || 0,
      n_peran: Number(r.n_peran) || 0,
      bucket_karya: String(r.bucket_karya || '0').trim(),
    });
  }
});

console.log('⚡ Menjalankan migrasi data ke SQLite...');
const startTime = Date.now();
insertMany(rawData);
const duration = Date.now() - startTime;

const countRow = db.prepare('SELECT COUNT(*) as total FROM kreator').get();
console.log(`✅ Berhasil mengimpor ${countRow.total} baris ke SQLite dalam ${duration}ms!`);

// Cek sampel
const sample = db.prepare('SELECT * FROM kreator ORDER BY total_karya DESC LIMIT 3').all();
console.log('🏆 Top 3 kreator by total_karya:');
console.table(sample);

db.close();
console.log('🎉 Migrasi data selesai dengan sempurna!');
