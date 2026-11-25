'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import type { RoleDistribution } from '@/lib/types';

interface RoleStackedBarProps {
  data: RoleDistribution[];
  isDark: boolean;
  loading?: boolean;
}

export function RoleStackedBar({ data, isDark, loading = false }: RoleStackedBarProps) {
  if (loading) {
    return <div className="h-72 rounded bg-ocean-900/40 animate-pulse card-border" />;
  }

  const axisTickColor = isDark ? '#7A9BB5' : '#2E5272';
  const axisNumberColor = isDark ? '#6488A6' : '#4B6E8F';
  const axisLineColor = isDark ? '#152D55' : '#CBD8E8';

  const barColors = isDark
    ? {
        performer: '#38BDF8',
        komposer: '#818CF8',
        lirik: '#34D399',
        produser: '#F87171',
      }
    : {
        performer: '#0284C7',
        komposer: '#4F46E5',
        lirik: '#059669',
        produser: '#DC2626',
      };

  return (
    <div className="p-4 sm:p-5 rounded-lg card-border bg-ocean-900/80 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-2 mb-1">
        <h3 className="font-serif text-base text-sand">Komposisi Rata-Rata Peran Musik</h3>
        <span className="text-[11px] font-mono text-text-secondary">Top 7 Genre</span>
      </div>
      <p className="text-xs text-text-secondary mb-4">
        Perbandingan rata-rata karya sebagai performer, komposer, lirik, dan produser.
      </p>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 15, left: -10, bottom: 20 }}
          >
            <XAxis
              dataKey="genre"
              stroke={axisTickColor}
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: axisLineColor }}
              interval={0}
              angle={-25}
              textAnchor="end"
            />
            <YAxis
              stroke={axisNumberColor}
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: axisLineColor }}
            />
            <Tooltip
              cursor={{ fill: isDark ? 'rgba(56, 189, 248, 0.08)' : 'rgba(2, 132, 199, 0.08)' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload as RoleDistribution;
                  return (
                    <div className="p-2.5 rounded bg-ocean-950 border border-signal/30 text-xs font-mono shadow-xl space-y-1">
                      <div className="text-sand font-bold border-b border-ocean-800 pb-1 mb-1">
                        {item.genre}
                      </div>
                      <div className="text-signal">Performer: {item.avg_performer}</div>
                      <div className="text-metric-indigo">Komposer: {item.avg_komposer}</div>
                      <div className="text-metric-cited">Lirik: {item.avg_lirik}</div>
                      <div className="text-coral">Produser: {item.avg_produser}</div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              wrapperStyle={{
                fontSize: '11px',
                paddingTop: '10px',
                color: axisTickColor,
              }}
              iconSize={8}
            />
            <Bar dataKey="avg_performer" name="Performer" fill={barColors.performer} stackId="a" />
            <Bar dataKey="avg_komposer" name="Komposer" fill={barColors.komposer} stackId="a" />
            <Bar dataKey="avg_lirik" name="Lirik" fill={barColors.lirik} stackId="a" />
            <Bar dataKey="avg_produser" name="Produser" fill={barColors.produser} stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
