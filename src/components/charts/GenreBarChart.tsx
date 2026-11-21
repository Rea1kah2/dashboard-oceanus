'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import type { GenreDistribution } from '@/lib/types';

interface GenreBarChartProps {
  data: GenreDistribution[];
  selectedGenre: string;
  onSelectGenre: (genre: string) => void;
  loading?: boolean;
}

export function GenreBarChart({
  data,
  selectedGenre,
  onSelectGenre,
  loading = false,
}: GenreBarChartProps) {
  if (loading) {
    return <div className="h-72 rounded bg-ocean-900/40 animate-pulse card-border" />;
  }

  // Ambil top 12 untuk keterbacaan chart yang tajam
  const displayData = data.slice(0, 12);

  return (
    <div className="p-4 sm:p-5 rounded-lg card-border bg-ocean-900/80 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-serif text-base text-sand flex items-center gap-2">
          <span>Distribusi Genre Teratas</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-ocean-800 text-signal border border-signal/20">
            Top 12
          </span>
        </h3>
        <span className="text-[11px] font-mono text-text-secondary">
          {selectedGenre ? `Filter: ${selectedGenre}` : 'Klik bar untuk filter'}
        </span>
      </div>
      <p className="text-xs text-text-secondary mb-4">
        Jumlah kreator berdasarkan genre musik utama.
      </p>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={displayData}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <XAxis
              type="number"
              stroke="#4B6E8F"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#152D55' }}
            />
            <YAxis
              type="category"
              dataKey="genre"
              stroke="#7A9BB5"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#152D55' }}
              width={100}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload as GenreDistribution;
                  return (
                    <div className="p-2.5 rounded bg-ocean-950 border border-ocean-700/80 text-xs font-mono shadow-xl">
                      <div className="text-sand font-bold mb-1">{item.genre}</div>
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
            <Bar
              dataKey="count"
              radius={[0, 4, 4, 0]}
              cursor="pointer"
              onClick={(entry) => onSelectGenre(entry.genre)}
            >
              {displayData.map((entry) => {
                const isSelected = selectedGenre === entry.genre;
                return (
                  <Cell
                    key={`cell-${entry.genre}`}
                    fill={isSelected ? '#2496BE' : '#1B4F8A'}
                    stroke={isSelected ? '#38BDF8' : '#2A6BB8'}
                    strokeWidth={isSelected ? 1 : 0}
                    className="transition-all duration-200 hover:opacity-85"
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
