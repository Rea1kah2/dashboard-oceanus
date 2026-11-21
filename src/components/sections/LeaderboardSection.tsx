'use client';

import React, { useState, useEffect } from 'react';
import type { LeaderboardKreator, Kreator } from '@/lib/types';
import { Trophy, Award, Flame, Radio } from 'lucide-react';

interface LeaderboardSectionProps {
  onSelectKreator: (kreator: Kreator) => void;
}

export function LeaderboardSection({ onSelectKreator }: LeaderboardSectionProps) {
  const [metric, setMetric] = useState<'notable' | 'pengaruh' | 'karya'>('notable');
  const [data, setData] = useState<LeaderboardKreator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      setLoading(true);
      try {
        const res = await fetch(`/api/leaderboard?by=${metric}`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, [metric]);

  return (
    <section className="mb-10 p-5 rounded-lg card-border bg-ocean-900/80 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-ocean-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <h3 className="font-serif text-lg text-sand">Panggung Kehormatan: Top 10 Kreator Elit</h3>
          </div>
          <p className="text-xs text-text-secondary mt-0.5">
            Kreator dengan kontribusi musik paling berpengaruh di Oceanus.
          </p>
        </div>

        {/* Metric Switcher */}
        <div className="flex items-center gap-1 bg-ocean-950 p-1 rounded-md border border-ocean-800 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setMetric('notable')}
            className={`px-2.5 py-1 text-xs font-mono rounded transition-all cursor-pointer flex items-center gap-1.5 ${
              metric === 'notable'
                ? 'bg-signal/20 text-signal border border-signal/40 font-medium'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Award className="w-3 h-3" />
            <span>Karya Notable</span>
          </button>
          <button
            type="button"
            onClick={() => setMetric('pengaruh')}
            className={`px-2.5 py-1 text-xs font-mono rounded transition-all cursor-pointer flex items-center gap-1.5 ${
              metric === 'pengaruh'
                ? 'bg-signal/20 text-signal border border-signal/40 font-medium'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Radio className="w-3 h-3" />
            <span>Dampak Pengaruh</span>
          </button>
          <button
            type="button"
            onClick={() => setMetric('karya')}
            className={`px-2.5 py-1 text-xs font-mono rounded transition-all cursor-pointer flex items-center gap-1.5 ${
              metric === 'karya'
                ? 'bg-signal/20 text-signal border border-signal/40 font-medium'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Flame className="w-3 h-3" />
            <span>Total Karya</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-sans">
          <thead>
            <tr className="border-b border-ocean-800 text-[11px] font-mono text-text-secondary uppercase">
              <th className="py-2.5 px-3">#</th>
              <th className="py-2.5 px-3">Nama Kreator</th>
              <th className="py-2.5 px-3">Genre Utama</th>
              <th className="py-2.5 px-3 text-right">Total Karya</th>
              <th className="py-2.5 px-3 text-right">Karya Notable</th>
              <th className="py-2.5 px-3 text-right">Pengaruh</th>
              <th className="py-2.5 px-3 text-center">Tahun Aktif</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ocean-800/60">
            {loading ? (
              [1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={7} className="py-3 px-3">
                    <div className="h-4 bg-ocean-800/50 rounded w-full" />
                  </td>
                </tr>
              ))
            ) : (
              data.map((item, idx) => (
                <tr
                  key={item.id_kreator}
                  onClick={() => onSelectKreator(item as any)}
                  className="hover:bg-ocean-800/50 cursor-pointer transition-colors group"
                >
                  <td className="py-2.5 px-3 font-mono">
                    {idx === 0 && <span className="text-amber-400 font-bold">🥇 1</span>}
                    {idx === 1 && <span className="text-slate-300 font-bold">🥈 2</span>}
                    {idx === 2 && <span className="text-amber-600 font-bold">🥉 3</span>}
                    {idx > 2 && <span className="text-text-muted">{idx + 1}</span>}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-sand group-hover:text-signal transition-colors">
                    {item.nama}
                    {item.nama_panggung && (
                      <span className="text-[11px] text-text-secondary ml-1.5 italic">
                        "{item.nama_panggung}"
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-ocean-800 text-text-secondary">
                      {item.genre_utama}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-sand font-semibold">
                    {item.total_karya}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-amber-300">
                    {item.karya_notable}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-signal">
                    {item.pengaruh_diterima}
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono text-text-muted text-[11px]">
                    {item.thn_pertama || '?'}–{item.thn_terakhir || '?'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
