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
  isDark: boolean;
  loading?: boolean;
}

export function GenreBarChart({
  data,
  selectedGenre,
  onSelectGenre,
  isDark,
  loading = false,
}: GenreBarChartProps) {
  if (loading) {
    return <div className="h-72 rounded bg-ocean-900/40 animate-pulse card-border" />;
  }

  const displayData = data.slice(0, 12);
  const axisTickColor = isDark ? '#7A9BB5' : '#2E5272';
  const axisNumberColor = isDark ? '#6488A6' : '#4B6E8F';
  const axisLineColor = isDark ? '#152D55' : '#CBD8E8';
  const barBaseFill = isDark ? '#1B4F8A' : '#3B82C4';
  const barActiveFill = isDark ? '#2496BE' : '#0284C7';
  const barActiveStroke = isDark ? '#38BDF8' : '#0369A1';

  return (
    <div className="p-4 sm:p-5 rounded-lg card-border bg-ocean-900/80 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-2 mb-1">
        <h3 className="font-serif text-base text-sand flex items-center gap-2">
          <span>Distribusi Genre Teratas</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-ocean-800 text-signal border border-signal/20">
            Top 12
          </span>
        </h3>
        <span className="text-[11px] font-mono text-text-secondary truncate max-w-[160px]">
          {selectedGenre ? `Filter: ${selectedGenre}` : 'Klik bar untuk filter'}
        </span>
      </div>
      <p className="text-xs text-text-secondary mb-4">
        Jumlah kreator berdasarkan genre musik utama (dari total {data.length || 27} genre).
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
              stroke={axisNumberColor}
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: axisLineColor }}
            />
            <YAxis
              type="category"
              dataKey="genre"
              stroke={axisTickColor}
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: axisLineColor }}
              width={108}
            />
            <Tooltip
              cursor={{ fill: isDark ? 'rgba(56, 189, 248, 0.08)' : 'rgba(2, 132, 199, 0.08)' }}
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
              onClick={(entry) => {
                if (entry?.genre) {
                  onSelectGenre(String(entry.genre));
                }
              }}
            >
              {displayData.map((entry) => {
                const isSelected = selectedGenre === entry.genre;
                return (
                  <Cell
                    key={`cell-${entry.genre}`}
                    fill={isSelected ? barActiveFill : barBaseFill}
                    stroke={isSelected ? barActiveStroke : 'transparent'}
                    strokeWidth={isSelected ? 1.5 : 0}
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
