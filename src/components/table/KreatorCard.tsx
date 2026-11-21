'use client';

import React from 'react';
import type { Kreator } from '@/lib/types';
import { ChevronRight } from 'lucide-react';

interface KreatorCardProps {
  kreator: Kreator;
  onSelect: (kreator: Kreator) => void;
}

export function KreatorCard({ kreator, onSelect }: KreatorCardProps) {
  return (
    <div
      onClick={() => onSelect(kreator)}
      className="p-4 rounded-lg card-border bg-ocean-900/80 backdrop-blur-sm active:bg-ocean-800 cursor-pointer transition-all flex items-center justify-between gap-3 group"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-ocean-800 text-signal border border-signal/20">
            {kreator.genre_utama}
          </span>
          <span className="text-[10px] font-mono text-text-muted">
            {kreator.thn_pertama || '?'}–{kreator.thn_terakhir || '?'}
          </span>
        </div>
        <div className="text-sm font-medium text-sand truncate group-hover:text-signal transition-colors">
          {kreator.nama}
          {kreator.nama_panggung && (
            <span className="text-xs text-text-secondary italic ml-1">
              "{kreator.nama_panggung}"
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs font-mono text-text-secondary mt-1.5">
          <span>
            Karya: <strong className="text-sand">{kreator.total_karya}</strong>
          </span>
          <span>•</span>
          <span>
            Notable: <strong className="text-amber-300">{kreator.karya_notable}</strong>
          </span>
          <span>•</span>
          <span>
            Pengaruh: <strong className="text-signal">{kreator.pengaruh_diterima}</strong>
          </span>
        </div>
      </div>

      <div className="text-text-muted group-hover:text-signal transition-colors">
        <ChevronRight className="w-5 h-5" />
      </div>
    </div>
  );
}
