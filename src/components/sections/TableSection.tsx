'use client';

import React from 'react';
import type { BucketDistribution, GenreDistribution, Kreator } from '@/lib/types';
import { KreatorTable } from '@/components/table/KreatorTable';
import { KreatorCard } from '@/components/table/KreatorCard';
import { FilterBar } from '@/components/layout/FilterBar';
import { EmptyState } from '@/components/ui/EmptyState';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Download,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

interface TableSectionProps {
  data: Kreator[];
  total: number;
  totalAll?: number;
  page: number;
  limit: number;
  pages: number;
  genres: GenreDistribution[];
  buckets: BucketDistribution[];
  selectedGenre: string;
  selectedBucket: string;
  selectedPeran: string;
  search: string;
  onSearchChange: (value: string) => void;
  onSelectGenreDirect: (genre: string) => void;
  onSelectBucketDirect: (bucket: string) => void;
  onSelectPeran: (peran: string) => void;
  sortCol: string;
  sortDir: 'asc' | 'desc';
  onSort: (col: string) => void;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onClearGenre: () => void;
  onClearBucket: () => void;
  onClearPeran: () => void;
  onClearSearch: () => void;
  onResetAll: () => void;
  onSelectKreator: (kreator: Kreator) => void;
  exportUrl: string;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

const PERAN_OPTIONS = [
  { value: '1', label: '1 Peran (Spesialis)' },
  { value: '2', label: '2 Peran' },
  { value: '3', label: '3 Peran' },
  { value: '4', label: '4 Peran (All-Rounder)' },
  { value: '0', label: '0 Peran' },
];

export function TableSection({
  data,
  total,
  totalAll,
  page,
  limit,
  pages,
  genres,
  buckets,
  selectedGenre,
  selectedBucket,
  selectedPeran,
  search,
  onSearchChange,
  onSelectGenreDirect,
  onSelectBucketDirect,
  onSelectPeran,
  sortCol,
  sortDir,
  onSort,
  onPageChange,
  onLimitChange,
  onClearGenre,
  onClearBucket,
  onClearPeran,
  onClearSearch,
  onResetAll,
  onSelectKreator,
  exportUrl,
  loading = false,
  error = null,
  onRetry,
}: TableSectionProps) {
  const hasActiveFilters = Boolean(selectedGenre || selectedBucket || selectedPeran || search);
  const totalCatalogLabel = (totalAll ?? 11361).toLocaleString('id-ID');
  const startRow = total === 0 ? 0 : (page - 1) * limit + 1;
  const endRow = total === 0 ? 0 : Math.min(page * limit, total);

  const selectClass =
    'px-2.5 py-2 text-xs font-mono bg-ocean-950 text-text-primary rounded-md card-border focus:outline-none focus:border-signal transition-all cursor-pointer min-h-[38px]';

  return (
    <section
      className="p-5 rounded-lg card-border bg-ocean-900/80 backdrop-blur-sm"
      aria-label="Eksplorasi Data Kreator"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="font-serif text-lg text-sand">Eksplorasi Katalog Kreator Musik</h3>
          <p className="text-xs text-text-secondary mt-0.5">
            Daftar lengkap {totalCatalogLabel} kreator dengan filter genre, produktivitas karya, variasi peran, dan ekspor CSV.
          </p>
        </div>

        {/* Export CSV & Reset */}
        <div className="flex items-center gap-2 self-start lg:self-auto">
          <a
            href={total > 0 ? exportUrl : undefined}
            download="kreator-oceanus.csv"
            aria-disabled={total === 0 || loading}
            onClick={(e) => {
              if (total === 0 || loading) e.preventDefault();
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono rounded-md border transition-all min-h-[38px] ${
              total === 0 || loading
                ? 'bg-ocean-950/60 text-text-muted border-ocean-800 opacity-50 cursor-not-allowed'
                : 'bg-ocean-950 text-signal border-signal/35 hover:bg-signal/10 hover:border-signal cursor-pointer'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV ({total.toLocaleString('id-ID')})</span>
          </a>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetAll}
              className="px-3 py-2 text-xs font-mono text-text-secondary hover:text-coral bg-ocean-950 border border-ocean-800 hover:border-coral/40 rounded-md transition-all whitespace-nowrap cursor-pointer min-h-[38px]"
            >
              Reset Filter
            </button>
          )}
        </div>
      </div>

      {/* Search & Multi-Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2.5 mb-4">
        {/* Search Input */}
        <div className="relative sm:col-span-2 lg:col-span-5">
          <Search className="w-4 h-4 text-text-secondary absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari nama atau nama panggung..."
            aria-label="Cari kreator berdasarkan nama atau nama panggung"
            className="w-full pl-9 pr-8 py-2 text-xs bg-ocean-950 text-text-primary placeholder:text-text-muted rounded-md card-border focus:outline-none focus:border-signal transition-all min-h-[38px]"
          />
          {search && (
            <button
              type="button"
              onClick={onClearSearch}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-text-muted hover:text-text-primary p-1 cursor-pointer"
              aria-label="Hapus pencarian"
            >
              ✕
            </button>
          )}
        </div>

        {/* Genre Dropdown (semua 27 genre) */}
        <select
          aria-label="Filter berdasarkan genre musik"
          value={selectedGenre}
          onChange={(e) => onSelectGenreDirect(e.target.value)}
          className={`${selectClass} lg:col-span-3`}
        >
          <option value="">Semua Genre ({genres.length || 27})</option>
          {genres.map((g) => (
            <option key={g.genre} value={g.genre}>
              {g.genre} ({g.count.toLocaleString('id-ID')})
            </option>
          ))}
        </select>

        {/* Bucket Karya Dropdown */}
        <select
          aria-label="Filter berdasarkan bucket jumlah karya"
          value={selectedBucket}
          onChange={(e) => onSelectBucketDirect(e.target.value)}
          className={`${selectClass} lg:col-span-2`}
        >
          <option value="">Semua Bucket</option>
          {(buckets.length > 0
            ? buckets.map((b) => b.bucket)
            : ['1', '2-3', '4-9', '10+', '0']
          ).map((bucketVal) => (
            <option key={bucketVal} value={bucketVal}>
              {bucketVal} Karya
            </option>
          ))}
        </select>

        {/* Variasi Peran Dropdown */}
        <select
          aria-label="Filter berdasarkan jumlah variasi peran"
          value={selectedPeran}
          onChange={(e) => onSelectPeran(e.target.value)}
          className={`${selectClass} lg:col-span-2`}
        >
          <option value="">Semua Peran</option>
          {PERAN_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <FilterBar
        selectedGenre={selectedGenre}
        selectedBucket={selectedBucket}
        selectedPeran={selectedPeran}
        search={search}
        onClearGenre={onClearGenre}
        onClearBucket={onClearBucket}
        onClearPeran={onClearPeran}
        onClearSearch={onClearSearch}
        onResetAll={onResetAll}
        totalFiltered={total}
      />

      {error ? (
        <div className="p-8 rounded-lg bg-ocean-950/60 border border-ocean-800 flex flex-col items-center justify-center text-center gap-3">
          <AlertCircle className="w-6 h-6 text-coral" />
          <p className="text-xs text-text-secondary">{error}</p>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-mono bg-ocean-800 text-signal border border-signal/30 hover:border-signal/60 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Coba Lagi</span>
            </button>
          )}
        </div>
      ) : data.length === 0 && !loading ? (
        <EmptyState onReset={onResetAll} />
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden sm:block">
            <KreatorTable
              data={data}
              onSelectKreator={onSelectKreator}
              sortCol={sortCol}
              sortDir={sortDir}
              onSort={onSort}
              loading={loading}
            />
          </div>

          {/* Mobile Card View */}
          <div className="sm:hidden space-y-2.5">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-24 rounded-lg bg-ocean-800/40 animate-pulse card-border"
                  />
                ))
              : data.map((item) => (
                  <KreatorCard
                    key={item.id_kreator}
                    kreator={item}
                    onSelect={onSelectKreator}
                  />
                ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 pt-4 border-t border-ocean-800 text-xs font-mono text-text-secondary">
            <div className="flex flex-wrap items-center gap-3">
              <span>
                {total === 0 ? (
                  'Menampilkan 0 dari 0 kreator'
                ) : (
                  <>
                    Menampilkan {startRow.toLocaleString('id-ID')}–{endRow.toLocaleString('id-ID')} dari{' '}
                    <strong className="text-sand">{total.toLocaleString('id-ID')}</strong> kreator
                  </>
                )}
              </span>

              <select
                aria-label="Jumlah data per halaman"
                value={limit}
                onChange={(e) => onLimitChange(Number(e.target.value))}
                disabled={loading}
                className="px-2 py-1 text-xs font-mono bg-ocean-950 text-text-primary rounded border border-ocean-800 focus:outline-none focus:border-signal cursor-pointer disabled:opacity-40"
              >
                <option value={20}>20 / hal</option>
                <option value={50}>50 / hal</option>
                <option value={100}>100 / hal</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onPageChange(page - 1)}
                disabled={loading || page <= 1}
                className="px-2.5 py-1.5 rounded bg-ocean-950 border border-ocean-800 hover:border-signal/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1 cursor-pointer min-h-[36px]"
                aria-label="Halaman sebelumnya"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Sebelumnya</span>
              </button>

              <span className="px-3 py-1.5 rounded bg-ocean-800 text-sand border border-ocean-700">
                {page} / {pages || 1}
              </span>

              <button
                type="button"
                onClick={() => onPageChange(page + 1)}
                disabled={loading || page >= pages}
                className="px-2.5 py-1.5 rounded bg-ocean-950 border border-ocean-800 hover:border-signal/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1 cursor-pointer min-h-[36px]"
                aria-label="Halaman berikutnya"
              >
                <span>Berikutnya</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
