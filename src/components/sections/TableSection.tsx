'use client';

import React from 'react';
import type { Kreator } from '@/lib/types';
import { KreatorTable } from '@/components/table/KreatorTable';
import { KreatorCard } from '@/components/table/KreatorCard';
import { FilterBar } from '@/components/layout/FilterBar';
import { EmptyState } from '@/components/ui/EmptyState';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

interface TableSectionProps {
  data: Kreator[];
  total: number;
  page: number;
  limit: number;
  pages: number;
  selectedGenre: string;
  selectedBucket: string;
  search: string;
  onSearchChange: (value: string) => void;
  sortCol: string;
  sortDir: 'asc' | 'desc';
  onSort: (col: string) => void;
  onPageChange: (page: number) => void;
  onClearGenre: () => void;
  onClearBucket: () => void;
  onClearSearch: () => void;
  onResetAll: () => void;
  onSelectKreator: (kreator: Kreator) => void;
  loading?: boolean;
}

export function TableSection({
  data,
  total,
  page,
  limit,
  pages,
  selectedGenre,
  selectedBucket,
  search,
  onSearchChange,
  sortCol,
  sortDir,
  onSort,
  onPageChange,
  onClearGenre,
  onClearBucket,
  onClearSearch,
  onResetAll,
  onSelectKreator,
  loading = false,
}: TableSectionProps) {
  const hasActiveFilters = Boolean(selectedGenre || selectedBucket || search);

  return (
    <section className="p-5 rounded-lg card-border bg-ocean-900/80 backdrop-blur-sm" aria-label="Eksplorasi Data Kreator">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="font-serif text-lg text-sand">Eksplorasi Katalog Kreator Musik</h3>
          <p className="text-xs text-text-secondary mt-0.5">
            Daftar lengkap 11.361 kreator dengan filter genre, produktivitas karya, dan pengaruh.
          </p>
        </div>

        {/* Search Bar & Reset Filter Inline */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="w-4 h-4 text-text-secondary absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari nama atau panggung..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-ocean-950 text-text-primary placeholder:text-text-muted rounded-md card-border focus:outline-none focus:border-signal transition-all"
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
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetAll}
              className="px-3 py-2 text-xs font-mono text-text-secondary hover:text-signal bg-ocean-950 border border-ocean-800 hover:border-signal/40 rounded-md transition-all whitespace-nowrap cursor-pointer"
            >
              Reset Filter
            </button>
          )}
        </div>
      </div>

      <FilterBar
        selectedGenre={selectedGenre}
        selectedBucket={selectedBucket}
        search={search}
        onClearGenre={onClearGenre}
        onClearBucket={onClearBucket}
        onClearSearch={onClearSearch}
        onResetAll={onResetAll}
        totalFiltered={total}
      />

      {data.length === 0 && !loading ? (
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
            {data.map((item) => (
              <KreatorCard
                key={item.id_kreator}
                kreator={item}
                onSelect={onSelectKreator}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 pt-4 border-t border-ocean-800 text-xs font-mono text-text-secondary">
            <div>
              Menampilkan {(page - 1) * limit + 1}–{Math.min(page * limit, total)} dari{' '}
              <strong className="text-sand">{total.toLocaleString('id-ID')}</strong> kreator
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onPageChange(page - 1)}
                disabled={page <= 1}
                className="px-2.5 py-1.5 rounded bg-ocean-950 border border-ocean-800 hover:border-signal/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1 cursor-pointer"
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
                disabled={page >= pages}
                className="px-2.5 py-1.5 rounded bg-ocean-950 border border-ocean-800 hover:border-signal/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1 cursor-pointer"
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
