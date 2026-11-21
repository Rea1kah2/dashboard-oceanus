'use client';

import React from 'react';
import { StatCard } from '@/components/ui/StatCard';
import type { StatsResponse } from '@/lib/types';
import { Users, Disc3, Sparkles, Flame } from 'lucide-react';

interface KpiSectionProps {
  stats: StatsResponse | null;
  loading?: boolean;
}

export function KpiSection({ stats, loading = false }: KpiSectionProps) {
  if (loading || !stats) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 rounded-md bg-ocean-900/40 animate-pulse card-border" />
        ))}
      </div>
    );
  }

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
            (stats.genre_terbanyak_count / stats.total_kreator) *
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
          subtext={`Hanya ${((stats.kreator_elite / stats.total_kreator) * 100).toFixed(2)}% dari total`}
          icon={<Sparkles className="w-4 h-4" />}
        />
      </div>
    </section>
  );
}
