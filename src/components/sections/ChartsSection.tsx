'use client';

import React from 'react';
import { GenreBarChart } from '@/components/charts/GenreBarChart';
import { TrendAreaChart } from '@/components/charts/TrendAreaChart';
import { RoleStackedBar } from '@/components/charts/RoleStackedBar';
import { BucketDonut } from '@/components/charts/BucketDonut';
import type {
  BucketDistribution,
  GenreDistribution,
  TrendDecade,
  RoleDistribution,
} from '@/lib/types';

interface ChartsSectionProps {
  genres: GenreDistribution[];
  trends: TrendDecade[];
  roles: RoleDistribution[];
  buckets: BucketDistribution[];
  selectedGenre: string;
  selectedBucket: string;
  onSelectGenre: (genre: string) => void;
  onSelectBucket: (bucket: string) => void;
  isDark: boolean;
  loading?: boolean;
}

export function ChartsSection({
  genres,
  trends,
  roles,
  buckets,
  selectedGenre,
  selectedBucket,
  onSelectGenre,
  onSelectBucket,
  isDark,
  loading = false,
}: ChartsSectionProps) {
  return (
    <section className="mb-10 space-y-4" aria-label="Visualisasi Analitik">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GenreBarChart
          data={genres}
          selectedGenre={selectedGenre}
          onSelectGenre={onSelectGenre}
          isDark={isDark}
          loading={loading}
        />
        <TrendAreaChart data={trends} isDark={isDark} loading={loading} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RoleStackedBar data={roles} isDark={isDark} loading={loading} />
        <BucketDonut
          data={buckets}
          selectedBucket={selectedBucket}
          onSelectBucket={onSelectBucket}
          isDark={isDark}
          loading={loading}
        />
      </div>
    </section>
  );
}
