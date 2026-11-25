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
  isDark: boolean;
  loading?: boolean;
}

export function TrendAreaChart({ data, isDark, loading = false }: TrendAreaChartProps) {
  if (loading) {
    return <div className="h-72 rounded bg-ocean-900/40 animate-pulse card-border" />;
  }

  const totalCount = data.reduce((sum, item) => sum + item.count, 0) || 1;
  const peak = data.reduce<TrendDecade | null>(
    (best, item) => (!best || item.count > best.count ? item : best),
    null
  );
  const peakPct = peak ? ((peak.count / totalCount) * 100).toFixed(1) : '0';
  const rangeLabel =
    data.length > 1
      ? `${data[0].label} – ${data[data.length - 1].label}`
      : data[0]?.label || '1970s – 2030s';

  const strokeColor = isDark ? '#38BDF8' : '#0284C7';
  const axisTickColor = isDark ? '#7A9BB5' : '#2E5272';
  const axisNumberColor = isDark ? '#6488A6' : '#4B6E8F';
  const axisLineColor = isDark ? '#152D55' : '#CBD8E8';

  return (
    <div className="p-4 sm:p-5 rounded-lg card-border bg-ocean-900/80 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-2 mb-1">
        <h3 className="font-serif text-base text-sand">Tren Munculnya Kreator Baru</h3>
        <span className="text-[11px] font-mono text-signal">{rangeLabel}</span>
      </div>
      <p className="text-xs text-text-secondary mb-4">
        {peak
          ? `Lonjakan dekade ${peak.label} mendominasi ${peakPct}% (${peak.count.toLocaleString('id-ID')} kreator).`
          : 'Dinamika jumlah kreator baru per dekade.'}
      </p>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 15, left: -10, bottom: 5 }}>
            <defs>
              <linearGradient id="oceanWave" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={strokeColor} stopOpacity={isDark ? 0.24 : 0.28} />
                <stop offset="95%" stopColor={strokeColor} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="label"
              stroke={axisTickColor}
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: axisLineColor }}
            />
            <YAxis
              stroke={axisNumberColor}
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: axisLineColor }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload as TrendDecade;
                  return (
                    <div className="p-2.5 rounded bg-ocean-950 border border-ocean-700/80 text-xs font-mono shadow-xl">
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
              stroke={strokeColor}
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
