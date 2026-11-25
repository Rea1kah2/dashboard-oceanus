import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'indigo' | 'coral' | 'amber' | 'emerald' | 'neutral';
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
    indigo: 'bg-metric-indigo/10 text-metric-indigo border-metric-indigo/30 hover:border-metric-indigo/50',
    coral: 'bg-coral/10 text-coral border-coral/30 hover:border-coral/50',
    amber: 'bg-metric-notable/10 text-metric-notable border-metric-notable/30 hover:border-metric-notable/50',
    emerald: 'bg-metric-cited/10 text-metric-cited border-metric-cited/30 hover:border-metric-cited/50',
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
          className="hover:text-text-primary transition-colors ml-0.5 cursor-pointer"
          aria-label="Hapus filter"
        >
          ✕
        </button>
      )}
    </span>
  );
}
