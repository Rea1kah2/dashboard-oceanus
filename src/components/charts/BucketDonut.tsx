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
  selectedBucket: string;
  onSelectBucket: (bucket: string) => void;
  loading?: boolean;
}

const BUCKET_DATA: BucketDistribution[] = [
  { bucket: '1', count: 8558, percentage: 75.3 },
  { bucket: '2-3', count: 2204, percentage: 19.4 },
  { bucket: '4-9', count: 531, percentage: 4.7 },
  { bucket: '10+', count: 65, percentage: 0.6 },
  { bucket: '0', count: 3, percentage: 0.03 },
];

const BUCKET_COLORS: Record<string, string> = {
  '1': '#1B4F8A',
  '2-3': '#38BDF8',
  '4-9': '#818CF8',
  '10+': '#E8D5B0',
  '0': '#0F2240',
};

export function BucketDonut({
  selectedBucket,
  onSelectBucket,
  loading = false,
}: BucketDonutProps) {
  if (loading) {
    return <div className="h-72 rounded bg-ocean-900/40 animate-pulse card-border" />;
  }

  return (
    <div className="p-4 sm:p-5 rounded-lg card-border bg-ocean-900/80 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-serif text-base text-sand">Segmentasi Produktivitas Karya</h3>
        <span className="text-[11px] font-mono text-text-secondary">
          {selectedBucket ? `Filter: ${selectedBucket}` : 'Klik untuk filter'}
        </span>
      </div>
      <p className="text-xs text-text-secondary mb-2">
        Mayoritas (75.3%) kreator hanya merilis 1 karya musik.
      </p>

      <div className="h-64 sm:h-72 w-full flex flex-col sm:flex-row items-center justify-between">
        <div className="h-48 sm:h-full w-full sm:w-3/5">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={BUCKET_DATA}
                dataKey="count"
                nameKey="bucket"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={2}
                cursor="pointer"
                onClick={(entry) => onSelectBucket(entry.bucket)}
              >
                {BUCKET_DATA.map((entry) => {
                  const isSelected = selectedBucket === entry.bucket;
                  return (
                    <Cell
                      key={`bucket-${entry.bucket}`}
                      fill={BUCKET_COLORS[entry.bucket] || '#38BDF8'}
                      stroke={isSelected ? '#7DD3FC' : '#0A1628'}
                      strokeWidth={isSelected ? 1.5 : 1}
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
        <div className="w-full sm:w-2/5 flex flex-wrap sm:flex-col gap-2 justify-center px-2">
          {BUCKET_DATA.map((b) => {
            const isSelected = selectedBucket === b.bucket;
            return (
              <button
                type="button"
                key={b.bucket}
                onClick={() => onSelectBucket(b.bucket)}
                className={`flex items-center justify-between text-left px-2 py-1.5 rounded text-xs font-mono transition-all w-full cursor-pointer ${
                  isSelected
                    ? 'bg-signal/15 text-signal border border-signal/30'
                    : 'text-text-secondary hover:bg-ocean-800/60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{ backgroundColor: BUCKET_COLORS[b.bucket] }}
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
