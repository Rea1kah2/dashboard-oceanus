export interface Kreator {
  id_kreator: number;
  nama: string;
  nama_panggung: string;
  n_performer: number;
  n_komposer: number;
  n_lirik: number;
  n_produser: number;
  total_karya: number;
  karya_notable: number;
  n_genre: number;
  genre_utama: string;
  thn_pertama: number | null;
  thn_terakhir: number | null;
  pengaruh_diterima: number;
  karya_dirujuk: number;
  n_grup: number;
  n_peran: number;
  bucket_karya: string;
}

export interface StatsResponse {
  total_kreator: number;
  avg_total_karya: number;
  genre_terbanyak: string;
  genre_terbanyak_count: number;
  kreator_elite: number;
  thn_pertama_min: number;
  thn_terakhir_max: number;
  dekade_puncak: string;
  total_karya_all: number;
}

export interface GenreDistribution {
  genre: string;
  count: number;
  percentage: number;
}

export interface TrendDecade {
  dekade: number;
  label: string;
  count: number;
}

export interface RoleDistribution {
  genre: string;
  avg_performer: number;
  avg_komposer: number;
  avg_lirik: number;
  avg_produser: number;
  total_kreator: number;
}

export interface BucketDistribution {
  bucket: string;
  count: number;
  percentage: number;
}

export interface LeaderboardKreator {
  id_kreator: number;
  nama: string;
  nama_panggung: string;
  genre_utama: string;
  total_karya: number;
  karya_notable: number;
  pengaruh_diterima: number;
  karya_dirujuk: number;
  thn_pertama: number;
  thn_terakhir: number;
}

export interface PaginatedKreatorResponse {
  data: Kreator[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface FilterState {
  genre: string;
  bucket: string;
  search: string;
  sort: string;
  dir: 'asc' | 'desc';
  page: number;
}
