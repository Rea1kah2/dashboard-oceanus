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
  loading?: boolean;
}

export function RoleStackedBar({ data, loading = false }: RoleStackedBarProps) {
  if (loading) {
    return <div className="h-72 rounded bg-ocean-900/40 animate-pulse card-border" />;
  }

  return (
    <div className="p-4 sm:p-5 rounded-lg card-border bg-ocean-900/80 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-serif text-base text-sand">Komposisi Rata-Rata Peran Musik</h3>
        <span className="text-[11px] font-mono text-text-secondary">Top 7 Genre</span>
      </div>
      <p className="text-xs text-text-secondary/80 mb-4">
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
              stroke="#7A9BB5"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: '#152D55' }}
              interval={0}
              angle={-25}
              textAnchor="end"
            />
            <YAxis
              stroke="#4B6E8F"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#152D55' }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload as RoleDistribution;
                  return (
                    <div className="p-2.5 rounded bg-ocean-950 border border-signal/30 text-xs font-mono shadow-xl space-y-1">
                      <div className="text-sand font-bold border-b border-ocean-800 pb-1 mb-1">
                        {item.genre}
                      </div>
                      <div className="text-sky-300">Performer: {item.avg_performer}</div>
                      <div className="text-indigo-300">Komposer: {item.avg_komposer}</div>
                      <div className="text-emerald-300">Lirik: {item.avg_lirik}</div>
                      <div className="text-coral">Produser: {item.avg_produser}</div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
              iconSize={8}
            />
            <Bar dataKey="avg_performer" name="Performer" fill="#38BDF8" stackId="a" />
            <Bar dataKey="avg_komposer" name="Komposer" fill="#818CF8" stackId="a" />
            <Bar dataKey="avg_lirik" name="Lirik" fill="#34D399" stackId="a" />
            <Bar dataKey="avg_produser" name="Produser" fill="#F87171" stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
