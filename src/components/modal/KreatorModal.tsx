'use client';

import React, { useEffect } from 'react';
import type { Kreator } from '@/lib/types';
import { X, Music, Calendar, Disc, Share2, Layers, Users } from 'lucide-react';

interface KreatorModalProps {
  kreator: Kreator | null;
  onClose: () => void;
}

export function KreatorModal({ kreator, onClose }: KreatorModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    if (kreator) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [kreator, onClose]);

  if (!kreator) return null;

  const totalRoles =
    kreator.n_performer + kreator.n_komposer + kreator.n_lirik + kreator.n_produser || 1;

  const roles = [
    { name: 'Performer', count: kreator.n_performer, color: 'bg-sky-400' },
    { name: 'Komposer', count: kreator.n_komposer, color: 'bg-indigo-400' },
    { name: 'Lirik', count: kreator.n_lirik, color: 'bg-emerald-400' },
    { name: 'Produser', count: kreator.n_produser, color: 'bg-coral' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ocean-950/80 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full sm:max-w-xl max-h-[90vh] overflow-y-auto bg-ocean-900 border border-ocean-700/80 rounded-t-2xl sm:rounded-xl shadow-2xl p-5 sm:p-6 card-border text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile handle indicator */}
        <div className="w-12 h-1 bg-ocean-700 rounded-full mx-auto mb-4 sm:hidden" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-ocean-800 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-signal/10 text-signal border border-signal/20">
                ID #{kreator.id_kreator}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-ocean-800 text-text-secondary border border-ocean-700">
                Bucket {kreator.bucket_karya}
              </span>
            </div>
            <h2 className="text-2xl font-serif text-sand">{kreator.nama}</h2>
            {kreator.nama_panggung && (
              <p className="text-xs text-text-secondary italic">
                Dikenal sebagai: "{kreator.nama_panggung}"
              </p>
            )}
            <p className="text-xs text-signal font-medium mt-1">
              {kreator.genre_utama}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md text-text-secondary hover:text-text-primary hover:bg-ocean-800 transition-colors"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
          <div className="p-3 rounded bg-ocean-950 border border-ocean-800 text-center">
            <div className="text-[10px] font-mono text-text-secondary uppercase">Total Karya</div>
            <div className="text-2xl font-serif text-sand mt-0.5">{kreator.total_karya}</div>
          </div>
          <div className="p-3 rounded bg-ocean-950 border border-ocean-800 text-center">
            <div className="text-[10px] font-mono text-text-secondary uppercase">Notable</div>
            <div className="text-2xl font-serif text-amber-300 mt-0.5">{kreator.karya_notable}</div>
          </div>
          <div className="p-3 rounded bg-ocean-950 border border-ocean-800 text-center">
            <div className="text-[10px] font-mono text-text-secondary uppercase">Pengaruh</div>
            <div className="text-2xl font-serif text-signal mt-0.5">{kreator.pengaruh_diterima}</div>
          </div>
          <div className="p-3 rounded bg-ocean-950 border border-ocean-800 text-center">
            <div className="text-[10px] font-mono text-text-secondary uppercase">Dirujuk</div>
            <div className="text-2xl font-serif text-emerald-300 mt-0.5">{kreator.karya_dirujuk}</div>
          </div>
        </div>

        {/* Role breakdown */}
        <div className="mb-5 p-4 rounded bg-ocean-950/60 border border-ocean-800">
          <h4 className="text-xs font-mono text-text-secondary uppercase mb-3 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-signal" />
            <span>Distribusi Kontribusi Peran</span>
          </h4>
          <div className="space-y-2">
            {roles.map((r) => {
              const pct = Math.round((r.count / totalRoles) * 100);
              return (
                <div key={r.name} className="text-xs">
                  <div className="flex justify-between font-mono mb-1 text-[11px]">
                    <span className="text-text-secondary">{r.name}</span>
                    <span className="text-sand">
                      {r.count} karya ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-ocean-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${r.color} transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional metadata */}
        <div className="grid grid-cols-2 gap-3 text-xs font-sans border-t border-ocean-800 pt-4">
          <div className="flex items-center gap-2 text-text-secondary">
            <Calendar className="w-4 h-4 text-signal/80" />
            <span>
              Tahun Aktif:{' '}
              <strong className="text-sand font-mono">
                {kreator.thn_pertama || '?'}–{kreator.thn_terakhir || '?'}
              </strong>
            </span>
          </div>
          <div className="flex items-center gap-2 text-text-secondary">
            <Users className="w-4 h-4 text-signal/80" />
            <span>
              Grup Musik:{' '}
              <strong className="text-sand font-mono">{kreator.n_grup} grup</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 text-text-secondary">
            <Disc className="w-4 h-4 text-signal/80" />
            <span>
              Total Genre:{' '}
              <strong className="text-sand font-mono">{kreator.n_genre} genre</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 text-text-secondary">
            <Share2 className="w-4 h-4 text-signal/80" />
            <span>
              Variasi Peran:{' '}
              <strong className="text-sand font-mono">{kreator.n_peran} jenis</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
