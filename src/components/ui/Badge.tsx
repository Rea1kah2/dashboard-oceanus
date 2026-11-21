import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'indigo' | 'coral' | 'amber' | 'neutral';
  onRemove?: () => void;
  clickable?: boolean;
  onClick?: () => void;
}

export function Badge({
  children,
  variant = 'cyan',
  onRemove,
  clickable = false,
  onClick,
}: BadgeProps) {
  const variantStyles = {
    cyan: 'bg-signal/10 text-signal border-signal/30 hover:border-signal/50',
    indigo: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30 hover:border-indigo-500/50',
    coral: 'bg-coral/10 text-coral border-coral/30 hover:border-coral/50',
    amber: 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:border-amber-500/50',
    neutral: 'bg-ocean-800 text-text-secondary border-ocean-700 hover:border-ocean-600',
  };

  return (
    <span
      onClick={clickable ? onClick : undefined}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono border transition-all ${
        variantStyles[variant]
      } ${clickable ? 'cursor-pointer hover:brightness-110' : ''}`}
    >
      <span>{children}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="hover:text-white transition-colors ml-0.5"
          aria-label="Hapus filter"
        >
          ✕
        </button>
      )}
    </span>
  );
}
