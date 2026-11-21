'use client';

import React from 'react';
import { GenreBarChart } from '@/components/charts/GenreBarChart';
import { TrendAreaChart } from '@/components/charts/TrendAreaChart';
import { RoleStackedBar } from '@/components/charts/RoleStackedBar';
import { BucketDonut } from '@/components/charts/BucketDonut';
import type { GenreDistribution, TrendDecade, RoleDistribution } from '@/lib/types';

interface ChartsSectionProps {
  genres: GenreDistribution[];
  trends: TrendDecade[];
  roles: RoleDistribution[];
  selectedGenre: string;
  selectedBucket: string;
  onSelectGenre: (genre: string) => void;
  onSelectBucket: (bucket: string) => void;
  loading?: boolean;
}

export function ChartsSection({
  genres,
  trends,
  roles,
  selectedGenre,
  selectedBucket,
  onSelectGenre,
  onSelectBucket,
  loading = false,
}: ChartsSectionProps) {
  return (
    <section className="mb-10 space-y-4" aria-label="Visualisasi Analitik">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GenreBarChart
          data={genres}
          selectedGenre={selectedGenre}
          onSelectGenre={onSelectGenre}
          loading={loading}
        />
        <TrendAreaChart data={trends} loading={loading} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RoleStackedBar data={roles} loading={loading} />
        <BucketDonut
          selectedBucket={selectedBucket}
          onSelectBucket={onSelectBucket}
          loading={loading}
        />
      </div>
    </section>
  );
}
