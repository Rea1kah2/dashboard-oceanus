'use client';

import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import type { TrendDecade } from '@/lib/types';

interface TrendAreaChartProps {
  data: TrendDecade[];
  loading?: boolean;
}

export function TrendAreaChart({ data, loading = false }: TrendAreaChartProps) {
  if (loading) {
    return <div className="h-72 rounded bg-ocean-900/40 animate-pulse card-border" />;
  }

  return (
    <div className="p-4 sm:p-5 rounded-lg card-border bg-ocean-900/80 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-serif text-base text-sand">Tren Munculnya Kreator Baru</h3>
        <span className="text-[11px] font-mono text-signal">1970s – 2030s</span>
      </div>
      <p className="text-xs text-text-secondary/80 mb-4">
        Lonjakan era digital 2020-an mendominasi lebih dari 54% kreator.
      </p>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 15, left: -10, bottom: 5 }}>
            <defs>
              <linearGradient id="oceanWave" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="label"
              stroke="#7A9BB5"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#152D55' }}
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
                  const item = payload[0].payload as TrendDecade;
                  return (
                    <div className="p-2.5 rounded bg-ocean-950 border border-signal/30 text-xs font-mono shadow-xl">
                      <div className="text-sand font-bold mb-1">Dekade {item.label}</div>
                      <div className="text-signal">
                        {item.count.toLocaleString('id-ID')} kreator mulai berkarya
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#38BDF8"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#oceanWave)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
