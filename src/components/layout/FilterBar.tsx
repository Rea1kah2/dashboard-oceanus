'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';

interface FilterBarProps {
  selectedGenre: string;
  selectedBucket: string;
  search: string;
  onClearGenre: () => void;
  onClearBucket: () => void;
  onClearSearch: () => void;
  onResetAll: () => void;
  totalFiltered: number;
}

export function FilterBar({
  selectedGenre,
  selectedBucket,
  search,
  onClearGenre,
  onClearBucket,
  onClearSearch,
  onResetAll,
  totalFiltered,
}: FilterBarProps) {
  const hasActiveFilters = Boolean(selectedGenre || selectedBucket || search);

  if (!hasActiveFilters) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-ocean-900/60 border border-ocean-800 rounded-lg mb-6">
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
        {search && (
          <Badge variant="indigo" onRemove={onClearSearch}>
            Pencarian: "{search}"
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
          className="text-xs text-text-secondary hover:text-coral transition-colors underline font-mono"
        >
          Hapus Semua
        </button>
      </div>
    </div>
  );
}
