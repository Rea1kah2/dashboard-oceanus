import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  highlight?: boolean;
  accentColor?: string;
  icon?: React.ReactNode;
}

export function StatCard({ label, value, subtext, highlight = false, icon }: StatCardProps) {
  return (
    <div
      className={`relative p-5 rounded-md card-border bg-ocean-900/80 backdrop-blur-sm transition-all duration-300 ${
        highlight ? 'ocean-glow border-signal/40' : ''
      }`}
    >
      <div className="flex items-center justify-between text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
        <span>{label}</span>
        {icon && <span className="text-signal/70">{icon}</span>}
      </div>
      <div className="text-3xl lg:text-4xl font-serif text-sand font-normal tracking-tight">
        {value}
      </div>
      {subtext && (
        <div className="text-xs text-text-secondary/80 mt-2 font-sans flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-signal" />
          {subtext}
        </div>
      )}
    </div>
  );
}
