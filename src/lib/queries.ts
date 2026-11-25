import type { Kreator } from '@/lib/types';

export const STATIC_CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
} as const;

export const ALLOWED_SORT_COLS: Record<string, string> = {
  nama: 'nama',
  genre_utama: 'genre_utama',
  total_karya: 'total_karya',
  karya_notable: 'karya_notable',
  pengaruh_diterima: 'pengaruh_diterima',
  karya_dirujuk: 'karya_dirujuk',
  thn_pertama: 'thn_pertama',
  n_peran: 'n_peran',
};

export function parseSafeInt(
  raw: string | null,
  fallback: number,
  min: number,
  max: number
): number {
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

export function escapeLike(value: string): string {
  return value.replace(/[\\%_]/g, '\\$&');
}

export function resolveSort(
  sort: string | null,
  dir: string | null
): { sortCol: string; sortDir: 'ASC' | 'DESC' } {
  const sortCol = (sort && ALLOWED_SORT_COLS[sort]) || 'total_karya';
  const sortDir = (dir || 'desc').toLowerCase() === 'asc' ? 'ASC' : 'DESC';
  return { sortCol, sortDir };
}

export interface KreatorFilterParams {
  genre?: string;
  bucket?: string;
  peran?: string;
  search?: string;
}

export function buildKreatorWhereClause(filters: KreatorFilterParams): {
  whereClause: string;
  sqlParams: (string | number)[];
} {
  const conditions: string[] = [];
  const sqlParams: (string | number)[] = [];

  const genre = (filters.genre || '').trim();
  const bucket = (filters.bucket || '').trim();
  const peran = (filters.peran || '').trim();
  const search = (filters.search || '').trim();

  if (genre) {
    conditions.push('genre_utama = ?');
    sqlParams.push(genre);
  }

  if (bucket) {
    conditions.push('bucket_karya = ?');
    sqlParams.push(bucket);
  }

  if (peran) {
    const pNum = Number.parseInt(peran, 10);
    if (Number.isFinite(pNum) && pNum >= 0 && pNum <= 10) {
      conditions.push('n_peran = ?');
      sqlParams.push(pNum);
    }
  }

  if (search) {
    const escaped = `%${escapeLike(search)}%`;
    conditions.push("(nama LIKE ? ESCAPE '\\' OR nama_panggung LIKE ? ESCAPE '\\')");
    sqlParams.push(escaped, escaped);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  return { whereClause, sqlParams };
}

export function sanitizeCsvCell(value: unknown): string {
  if (value === null || value === undefined) return '';
  let str = String(value);

  // Neutralize spreadsheet formula injection
  if (/^[=+\-@\t\r]/.test(str)) {
    str = `'${str}`;
  }

  if (/[",\r\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

const CSV_HEADERS = [
  'ID Kreator',
  'Nama',
  'Nama Panggung',
  'Genre Utama',
  'Total Karya',
  'Karya Notable',
  'Pengaruh Diterima',
  'Karya Dirujuk',
  'Performer',
  'Komposer',
  'Lirik',
  'Produser',
  'Variasi Peran',
  'Total Genre',
  'Grup Musik',
  'Tahun Pertama',
  'Tahun Terakhir',
  'Bucket Karya',
];

export function toKreatorCsv(rows: Kreator[]): string {
  const lines = [CSV_HEADERS.map(sanitizeCsvCell).join(',')];

  for (const k of rows) {
    lines.push(
      [
        k.id_kreator,
        k.nama,
        k.nama_panggung,
        k.genre_utama,
        k.total_karya,
        k.karya_notable,
        k.pengaruh_diterima,
        k.karya_dirujuk,
        k.n_performer,
        k.n_komposer,
        k.n_lirik,
        k.n_produser,
        k.n_peran,
        k.n_genre,
        k.n_grup,
        k.thn_pertama ?? '',
        k.thn_terakhir ?? '',
        k.bucket_karya,
      ]
        .map(sanitizeCsvCell)
        .join(',')
    );
  }

  return `\uFEFF${lines.join('\r\n')}\r\n`;
}
