'use client';

import React from 'react';
import { StatCard } from '@/components/ui/StatCard';
import type { StatsResponse } from '@/lib/types';
import { Users, Disc3, Sparkles, Flame, AlertCircle, RefreshCw } from 'lucide-react';

interface KpiSectionProps {
  stats: StatsResponse | null;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export function KpiSection({ stats, loading = false, error = null, onRetry }: KpiSectionProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 rounded-md bg-ocean-900/40 animate-pulse card-border" />
        ))}
      </div>
    );
  }

  if (error || !stats) {
    return (
      <section className="mb-8 p-5 rounded-lg card-border bg-ocean-900/80 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 text-sm text-coral">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error || 'Gagal memuat ringkasan statistik KPI.'}</span>
        </div>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono bg-ocean-800 text-signal border border-signal/30 hover:border-signal/60 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Coba Lagi</span>
          </button>
        )}
      </section>
    );
  }

  const totalDenominator = stats.total_kreator || 1;

  return (
    <section className="mb-8" aria-label="Key Performance Indicators">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          label="Total Kreator"
          value={stats.total_kreator.toLocaleString('id-ID')}
          subtext={`Rata-rata ${stats.avg_total_karya} karya/kreator`}
          icon={<Users className="w-4 h-4" />}
        />
        <StatCard
          label="Genre #1 Terbanyak"
          value={stats.genre_terbanyak}
          subtext={`${stats.genre_terbanyak_count.toLocaleString('id-ID')} kreator (${(
            (stats.genre_terbanyak_count / totalDenominator) *
            100
          ).toFixed(1)}%)`}
          highlight
          icon={<Disc3 className="w-4 h-4" />}
        />
        <StatCard
          label="Era Puncak Dimulai"
          value={stats.dekade_puncak}
          subtext={`Rentang aktif ${stats.thn_pertama_min}–${stats.thn_terakhir_max}`}
          icon={<Flame className="w-4 h-4" />}
        />
        <StatCard
          label="Kreator Elit (10+ Karya)"
          value={stats.kreator_elite.toLocaleString('id-ID')}
          subtext={`Hanya ${((stats.kreator_elite / totalDenominator) * 100).toFixed(2)}% dari total`}
          icon={<Sparkles className="w-4 h-4" />}
        />
      </div>
    </section>
  );
}
