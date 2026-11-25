import { useState, useCallback, useEffect } from 'react';
import type { FilterState } from '@/lib/types';

const DEFAULT_FILTERS: FilterState = {
  genre: '',
  bucket: '',
  peran: '',
  search: '',
  sort: 'total_karya',
  dir: 'desc',
  page: 1,
  limit: 20,
};

const VALID_SORTS = new Set([
  'nama',
  'genre_utama',
  'total_karya',
  'karya_notable',
  'pengaruh_diterima',
  'karya_dirujuk',
  'thn_pertama',
  'n_peran',
]);

const VALID_LIMITS = new Set([20, 50, 100]);

function readFiltersFromUrl(): FilterState {
  if (typeof window === 'undefined') return DEFAULT_FILTERS;
  const params = new URLSearchParams(window.location.search);

  const genre = params.get('genre') || '';
  const bucket = params.get('bucket') || '';
  const peran = params.get('peran') || '';
  const search = params.get('search') || '';
  const rawSort = params.get('sort') || '';
  const sort = VALID_SORTS.has(rawSort) ? rawSort : DEFAULT_FILTERS.sort;
  const dir: 'asc' | 'desc' = params.get('dir') === 'asc' ? 'asc' : 'desc';

  const rawPage = Number.parseInt(params.get('page') || '1', 10);
  const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;

  const rawLimit = Number.parseInt(params.get('limit') || '20', 10);
  const limit = VALID_LIMITS.has(rawLimit) ? rawLimit : 20;

  return { genre, bucket, peran, search, sort, dir, page, limit };
}

export function useFilters() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate filter awal dari URL saat mount di client
  useEffect(() => {
    setFilters(readFiltersFromUrl());
    setHydrated(true);
  }, []);

  // Sinkronkan filter aktif ke URL query string (tanpa reload)
  useEffect(() => {
    if (!hydrated || typeof window === 'undefined') return;
    const params = new URLSearchParams();
    if (filters.genre) params.set('genre', filters.genre);
    if (filters.bucket) params.set('bucket', filters.bucket);
    if (filters.peran) params.set('peran', filters.peran);
    if (filters.search.trim()) params.set('search', filters.search.trim());
    if (filters.sort !== DEFAULT_FILTERS.sort) params.set('sort', filters.sort);
    if (filters.dir !== DEFAULT_FILTERS.dir) params.set('dir', filters.dir);
    if (filters.page > 1) params.set('page', String(filters.page));
    if (filters.limit !== DEFAULT_FILTERS.limit) params.set('limit', String(filters.limit));

    const query = params.toString();
    const nextUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
    if (nextUrl !== `${window.location.pathname}${window.location.search}`) {
      window.history.replaceState(null, '', nextUrl);
    }
  }, [filters, hydrated]);

  const toggleGenre = useCallback((genre: string) => {
    setFilters((prev) => ({
      ...prev,
      genre: prev.genre === genre ? '' : genre,
      page: 1,
    }));
  }, []);

  const setGenreDirect = useCallback((genre: string) => {
    setFilters((prev) => ({
      ...prev,
      genre,
      page: 1,
    }));
  }, []);

  const toggleBucket = useCallback((bucket: string) => {
    setFilters((prev) => ({
      ...prev,
      bucket: prev.bucket === bucket ? '' : bucket,
      page: 1,
    }));
  }, []);

  const setBucketDirect = useCallback((bucket: string) => {
    setFilters((prev) => ({
      ...prev,
      bucket,
      page: 1,
    }));
  }, []);

  const setPeran = useCallback((peran: string) => {
    setFilters((prev) => ({
      ...prev,
      peran,
      page: 1,
    }));
  }, []);

  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({
      ...prev,
      search,
      page: 1,
    }));
  }, []);

  const setSorting = useCallback((sort: string) => {
    setFilters((prev) => ({
      ...prev,
      sort,
      dir: prev.sort === sort && prev.dir === 'desc' ? 'asc' : 'desc',
      page: 1,
    }));
  }, []);

  const setPage = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page: Math.max(1, page) }));
  }, []);

  const setLimit = useCallback((limit: number) => {
    setFilters((prev) => ({ ...prev, limit, page: 1 }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters((prev) => ({
      ...DEFAULT_FILTERS,
      limit: prev.limit,
    }));
  }, []);

  return {
    filters,
    hydrated,
    toggleGenre,
    setGenreDirect,
    toggleBucket,
    setBucketDirect,
    setPeran,
    setSearch,
    setSorting,
    setPage,
    setLimit,
    resetFilters,
  };
}
