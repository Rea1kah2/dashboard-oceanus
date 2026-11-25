'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';

interface FilterBarProps {
  selectedGenre: string;
  selectedBucket: string;
  selectedPeran: string;
  search: string;
  onClearGenre: () => void;
  onClearBucket: () => void;
  onClearPeran: () => void;
  onClearSearch: () => void;
  onResetAll: () => void;
  totalFiltered: number;
}

export function FilterBar({
  selectedGenre,
  selectedBucket,
  selectedPeran,
  search,
  onClearGenre,
  onClearBucket,
  onClearPeran,
  onClearSearch,
  onResetAll,
  totalFiltered,
}: FilterBarProps) {
  const hasActiveFilters = Boolean(selectedGenre || selectedBucket || selectedPeran || search);

  if (!hasActiveFilters) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-ocean-900/60 border border-ocean-800 rounded-lg mb-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-text-secondary font-mono">Filter Aktif:</span>
        {selectedGenre && (
          <Badge variant="cyan" onRemove={onClearGenre}>
            Genre: {selectedGenre}
          </Badge>
        )}
        {selectedBucket && (
          <Badge variant="amber" onRemove={onClearBucket}>
            Bucket Karya: {selectedBucket}
          </Badge>
        )}
        {selectedPeran && (
          <Badge variant="emerald" onRemove={onClearPeran}>
            Variasi Peran: {selectedPeran} peran
          </Badge>
        )}
        {search && (
          <Badge variant="indigo" onRemove={onClearSearch}>
            Pencarian: &quot;{search}&quot;
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs font-mono text-sand">
          Hasil: <strong className="text-signal">{totalFiltered.toLocaleString('id-ID')}</strong> kreator
        </span>
        <button
          type="button"
          onClick={onResetAll}
          className="text-xs text-text-secondary hover:text-coral transition-colors underline font-mono cursor-pointer"
        >
          Hapus Semua
        </button>
      </div>
    </div>
  );
}
