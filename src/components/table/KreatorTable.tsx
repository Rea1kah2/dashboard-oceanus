'use client';

import React from 'react';
import type { Kreator } from '@/lib/types';
import { ArrowUpDown } from 'lucide-react';

interface KreatorTableProps {
  data: Kreator[];
  onSelectKreator: (kreator: Kreator) => void;
  sortCol: string;
  sortDir: 'asc' | 'desc';
  onSort: (col: string) => void;
  loading?: boolean;
}

export function KreatorTable({
  data,
  onSelectKreator,
  sortCol,
  sortDir,
  onSort,
  loading = false,
}: KreatorTableProps) {
  const columns = [
    { key: 'nama', label: 'Nama Kreator', align: 'left' },
    { key: 'genre_utama', label: 'Genre Utama', align: 'left' },
    { key: 'total_karya', label: 'Total Karya', align: 'right' },
    { key: 'karya_notable', label: 'Notable', align: 'right' },
    { key: 'pengaruh_diterima', label: 'Pengaruh', align: 'right' },
    { key: 'karya_dirujuk', label: 'Dirujuk', align: 'right' },
    { key: 'thn_pertama', label: 'Tahun Aktif', align: 'center' },
    { key: 'n_peran', label: 'Variasi Peran', align: 'center' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs font-sans">
        <thead>
          <tr className="border-b border-ocean-800 text-[11px] font-mono text-text-secondary uppercase tracking-wider">
            {columns.map((col) => {
              const isSorted = sortCol === col.key;
              return (
                <th
                  key={col.key}
                  onClick={() => onSort(col.key)}
                  className={`py-3 px-3 cursor-pointer hover:text-signal transition-colors ${
                    col.align === 'right'
                      ? 'text-right'
                      : col.align === 'center'
                      ? 'text-center'
                      : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-flex items-center gap-1 ${
                      col.align === 'right'
                        ? 'justify-end'
                        : col.align === 'center'
                        ? 'justify-center'
                        : 'justify-start'
                    }`}
                  >
                    <span>{col.label}</span>
                    <ArrowUpDown
                      className={`w-3 h-3 transition-opacity ${
                        isSorted ? 'opacity-100 text-signal' : 'opacity-40'
                      }`}
                    />
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-ocean-800/60 font-sans">
          {loading ? (
            Array.from({ length: 10 }).map((_, i) => (
              <tr key={i} className="animate-pulse">
                <td colSpan={columns.length} className="py-3 px-3">
                  <div className="h-4 bg-ocean-800/40 rounded w-full" />
                </td>
              </tr>
            ))
          ) : (
            data.map((item) => (
              <tr
                key={item.id_kreator}
                onClick={() => onSelectKreator(item)}
                className="hover:bg-ocean-800/50 cursor-pointer transition-colors group"
              >
                <td className="py-3 px-3 font-medium text-sand group-hover:text-signal transition-colors">
                  <div>{item.nama}</div>
                  {item.nama_panggung && (
                    <div className="text-[10px] text-text-secondary italic">
                      "{item.nama_panggung}"
                    </div>
                  )}
                </td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-ocean-800 text-text-secondary">
                    {item.genre_utama}
                  </span>
                </td>
                <td className="py-3 px-3 text-right font-mono font-semibold text-sand">
                  {item.total_karya}
                </td>
                <td className="py-3 px-3 text-right font-mono text-amber-300">
                  {item.karya_notable}
                </td>
                <td className="py-3 px-3 text-right font-mono text-signal">
                  {item.pengaruh_diterima}
                </td>
                <td className="py-3 px-3 text-right font-mono text-emerald-300">
                  {item.karya_dirujuk}
                </td>
                <td className="py-3 px-3 text-center font-mono text-text-muted text-[11px]">
                  {item.thn_pertama || '?'}–{item.thn_terakhir || '?'}
                </td>
                <td className="py-3 px-3 text-center font-mono">
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-ocean-950 border border-ocean-700 text-text-secondary">
                    {item.n_peran} peran
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
