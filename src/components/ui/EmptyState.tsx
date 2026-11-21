import React from 'react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  onReset?: () => void;
}

export function EmptyState({
  title = 'Tidak Ada Data Kreator',
  message = 'Tidak ada kreator yang sesuai dengan kriteria filter atau pencarian Anda.',
  onReset,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center card-border rounded-lg bg-ocean-900/40">
      <div className="w-12 h-12 rounded-full bg-ocean-800/80 border border-ocean-700 flex items-center justify-center text-text-secondary mb-3 text-xl">
        🌊
      </div>
      <h3 className="text-base font-serif text-sand mb-1">{title}</h3>
      <p className="text-xs text-text-secondary max-w-sm mb-4 leading-relaxed">{message}</p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="px-3.5 py-1.5 rounded text-xs font-mono font-medium bg-ocean-800 hover:bg-ocean-700 text-signal border border-signal/30 hover:border-signal/50 transition-all cursor-pointer"
        >
          Reset Filter & Pencarian
        </button>
      )}
    </div>
  );
}
