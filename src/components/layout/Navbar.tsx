'use client';

import React from 'react';
import { Waves, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-ocean-950/90 backdrop-blur-md border-b border-ocean-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-ocean-900 border border-signal/40 flex items-center justify-center text-signal ocean-glow">
            <Waves className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl tracking-wide text-sand">OCEANUS</span>
            </div>
            <p className="text-[11px] text-text-secondary hidden sm:block">
              Eksplorasi 11.361 Kreator Musik & Ekosistem Suara
            </p>
          </div>
        </div>

        {/* Theme Toggle Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'}
            className="p-2 sm:px-3 sm:py-1.5 rounded-lg text-text-secondary hover:text-signal hover:bg-ocean-900 border border-ocean-800 hover:border-signal/40 transition-all flex items-center gap-2 min-w-[40px] min-h-[40px] justify-center cursor-pointer"
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-amber-300" />
                <span className="text-xs font-mono hidden sm:inline">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-signal" />
                <span className="text-xs font-mono hidden sm:inline">Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
