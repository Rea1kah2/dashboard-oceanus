import { useState, useCallback } from 'react';
import type { FilterState } from '@/lib/types';

export function useFilters() {
  const [filters, setFilters] = useState<FilterState>({
    genre: '',
    bucket: '',
    search: '',
    sort: 'total_karya',
    dir: 'desc',
    page: 1,
  });

  const setGenre = useCallback((genre: string) => {
    setFilters((prev) => ({
      ...prev,
      genre: prev.genre === genre ? '' : genre, // toggle
      page: 1,
    }));
  }, []);

  const setBucket = useCallback((bucket: string) => {
    setFilters((prev) => ({
      ...prev,
      bucket: prev.bucket === bucket ? '' : bucket, // toggle
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
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      genre: '',
      bucket: '',
      search: '',
      sort: 'total_karya',
      dir: 'desc',
      page: 1,
    });
  }, []);

  return {
    filters,
    setGenre,
    setBucket,
    setSearch,
    setSorting,
    setPage,
    resetFilters,
  };
}
