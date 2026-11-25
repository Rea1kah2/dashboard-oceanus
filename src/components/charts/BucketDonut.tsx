'use client';

import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import type { BucketDistribution } from '@/lib/types';

interface BucketDonutProps {
  data: BucketDistribution[];
  selectedBucket: string;
  onSelectBucket: (bucket: string) => void;
  isDark: boolean;
  loading?: boolean;
}

const DARK_BUCKET_COLORS: Record<string, string> = {
  '1': '#1B4F8A',
  '2-3': '#38BDF8',
  '4-9': '#818CF8',
  '10+': '#E8D5B0',
  '0': '#475569',
};

const LIGHT_BUCKET_COLORS: Record<string, string> = {
  '1': '#1D4ED8',
  '2-3': '#0284C7',
  '4-9': '#4F46E5',
  '10+': '#B45309',
  '0': '#64748B',
};

export function BucketDonut({
  data,
  selectedBucket,
  onSelectBucket,
  isDark,
  loading = false,
}: BucketDonutProps) {
  if (loading) {
    return <div className="h-72 rounded bg-ocean-900/40 animate-pulse card-border" />;
  }

  const bucketColors = isDark ? DARK_BUCKET_COLORS : LIGHT_BUCKET_COLORS;
  const defaultStroke = isDark ? '#0A1628' : '#FFFFFF';
  const activeStroke = isDark ? '#7DD3FC' : '#0369A1';

  const topBucket = data.reduce<BucketDistribution | null>(
    (best, item) => (!best || item.count > best.count ? item : best),
    null
  );

  return (
    <div className="p-4 sm:p-5 rounded-lg card-border bg-ocean-900/80 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-2 mb-1">
        <h3 className="font-serif text-base text-sand">Segmentasi Produktivitas Karya</h3>
        <span className="text-[11px] font-mono text-text-secondary">
          {selectedBucket ? `Filter: ${selectedBucket}` : 'Klik untuk filter'}
        </span>
      </div>
      <p className="text-xs text-text-secondary mb-2">
        {topBucket
          ? `Mayoritas (${topBucket.percentage}%) kreator berada pada bucket ${topBucket.bucket} karya musik.`
          : 'Distribusi kreator berdasarkan jumlah karya yang dirilis.'}
      </p>

      <div className="h-64 sm:h-72 w-full flex flex-col sm:flex-row items-center justify-between">
        <div className="h-48 sm:h-full w-full sm:w-3/5">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="bucket"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={2}
                cursor="pointer"
                onClick={(entry) => {
                  if (entry?.bucket !== undefined) {
                    onSelectBucket(String(entry.bucket));
                  }
                }}
              >
                {data.map((entry) => {
                  const isSelected = selectedBucket === entry.bucket;
                  return (
                    <Cell
                      key={`bucket-${entry.bucket}`}
                      fill={bucketColors[entry.bucket] || '#38BDF8'}
                      stroke={isSelected ? activeStroke : defaultStroke}
                      strokeWidth={isSelected ? 2 : 1}
                      className="transition-all duration-200 hover:opacity-85"
                    />
                  );
                })}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload as BucketDistribution;
                    return (
                      <div className="p-2 rounded bg-ocean-950 border border-ocean-700/80 text-xs font-mono shadow-xl">
                        <div className="text-sand font-bold mb-1">
                          Bucket: {item.bucket} Karya
                        </div>
                        <div className="text-signal">
                          {item.count.toLocaleString('id-ID')} kreator ({item.percentage}%)
                        </div>
                        <div className="text-[10px] text-text-secondary mt-1">
                          Klik untuk memfilter tabel
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="w-full sm:w-2/5 flex flex-wrap sm:flex-col gap-1.5 justify-center px-2">
          {data.map((b) => {
            const isSelected = selectedBucket === b.bucket;
            return (
              <button
                type="button"
                key={b.bucket}
                onClick={() => onSelectBucket(b.bucket)}
                className={`flex items-center justify-between text-left px-2.5 py-1.5 rounded text-xs font-mono transition-all w-[48%] sm:w-full cursor-pointer border ${
                  isSelected
                    ? 'bg-signal/15 text-signal border-signal/35'
                    : 'text-text-secondary border-transparent hover:bg-ocean-800/60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
                    style={{ backgroundColor: bucketColors[b.bucket] || '#38BDF8' }}
                  />
                  <span>{b.bucket} Karya</span>
                </div>
                <span className="text-[10px] text-text-muted">{b.percentage}%</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
