'use client';

import React, { useState } from 'react';
import { Search, Music, Waves, Menu, X } from 'lucide-react';

interface NavbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onResetAll?: () => void;
}

export function Navbar({ search, onSearchChange, onResetAll }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-ocean-950/90 backdrop-blur-md border-b border-ocean-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-ocean-900 border border-signal/40 flex items-center justify-center text-signal ocean-glow">
            <Waves className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl tracking-wide text-sand">OCEANUS</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-signal/10 text-signal border border-signal/20">
                BI Analitik
              </span>
            </div>
            <p className="text-[11px] text-text-secondary hidden sm:block">
              Eksplorasi 11.361 Kreator Musik & Ekosistem Suara
            </p>
          </div>
        </div>

        {/* Global Search Bar (Desktop) */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari nama kreator atau nama panggung..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-ocean-900/90 text-text-primary placeholder:text-text-muted rounded-md card-border focus:outline-none focus:border-signal/60 transition-all"
            />
            {search && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-text-muted hover:text-text-primary"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Actions & Links */}
        <div className="hidden sm:flex items-center gap-3">
          {onResetAll && (
            <button
              type="button"
              onClick={onResetAll}
              className="text-xs font-mono text-text-secondary hover:text-signal transition-colors px-3 py-1.5 rounded hover:bg-ocean-900"
            >
              Reset Filter
            </button>
          )}
          <a
            href="https://github.com/Rea1kah2/dashboard-oceanus"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-ocean-900 hover:bg-ocean-800 text-sand border border-ocean-700 rounded-md transition-all"
          >
            <Music className="w-3.5 h-3.5 text-signal" />
            <span>GitHub</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md bg-ocean-900 border border-ocean-700 text-text-secondary hover:text-sand"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile search bar dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-3 bg-ocean-900 border-b border-ocean-800 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari kreator..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-ocean-950 text-text-primary placeholder:text-text-muted rounded card-border focus:outline-none focus:border-signal"
            />
          </div>
          {onResetAll && (
            <button
              type="button"
              onClick={() => {
                onResetAll();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2 text-xs font-mono text-signal bg-ocean-950 rounded border border-signal/20"
            >
              Reset Semua Filter
            </button>
          )}
        </div>
      )}
    </header>
  );
}
