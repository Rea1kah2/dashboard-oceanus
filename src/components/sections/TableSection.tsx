'use client';

import React from 'react';
import type { Kreator } from '@/lib/types';
import { KreatorTable } from '@/components/table/KreatorTable';
import { KreatorCard } from '@/components/table/KreatorCard';
import { FilterBar } from '@/components/layout/FilterBar';
import { EmptyState } from '@/components/ui/EmptyState';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TableSectionProps {
  data: Kreator[];
  total: number;
  page: number;
  limit: number;
  pages: number;
  selectedGenre: string;
  selectedBucket: string;
  search: string;
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
  return (
    <section className="p-5 rounded-lg card-border bg-ocean-900/80 backdrop-blur-sm" aria-label="Eksplorasi Data Kreator">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="font-serif text-lg text-sand">Eksplorasi Katalog Kreator Musik</h3>
          <p className="text-xs text-text-secondary mt-0.5">
            Daftar lengkap 11.361 kreator dengan filter genre, produktivitas karya, dan pengaruh.
          </p>
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
                className="px-2.5 py-1.5 rounded bg-ocean-950 border border-ocean-800 hover:border-signal/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1"
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
                className="px-2.5 py-1.5 rounded bg-ocean-950 border border-ocean-800 hover:border-signal/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1"
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
