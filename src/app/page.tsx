'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { KpiSection } from '@/components/sections/KpiSection';
import { ChartsSection } from '@/components/sections/ChartsSection';
import { LeaderboardSection } from '@/components/sections/LeaderboardSection';
import { TableSection } from '@/components/sections/TableSection';
import { KreatorModal } from '@/components/modal/KreatorModal';
import { useFilters } from '@/hooks/useFilters';
import { useDebounce } from '@/hooks/useDebounce';
import type {
  StatsResponse,
  GenreDistribution,
  TrendDecade,
  RoleDistribution,
  Kreator,
  PaginatedKreatorResponse,
} from '@/lib/types';
import { Waves, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const [isDark, setIsDark] = useState(true);

  // Sync theme class to <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove('light');
    } else {
      root.classList.add('light');
    }
  }, [isDark]);

  const {
    filters,
    setGenre,
    setBucket,
    setSearch,
    setSorting,
    setPage,
    resetFilters,
  } = useFilters();

  const debouncedSearch = useDebounce(filters.search, 300);

  // Data states
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [genres, setGenres] = useState<GenreDistribution[]>([]);
  const [trends, setTrends] = useState<TrendDecade[]>([]);
  const [roles, setRoles] = useState<RoleDistribution[]>([]);
  const [kreatorData, setKreatorData] = useState<PaginatedKreatorResponse>({
    data: [],
    total: 0,
    page: 1,
    limit: 20,
    pages: 1,
  });

  // UI states
  const [statsLoading, setStatsLoading] = useState(true);
  const [chartsLoading, setChartsLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(true);
  const [selectedKreator, setSelectedKreator] = useState<Kreator | null>(null);

  // 1. Fetch static KPI & Charts data once on load
  useEffect(() => {
    async function loadInitialData() {
      try {
        setStatsLoading(true);
        setChartsLoading(true);

        const [statsRes, genreRes, trendRes, peranRes] = await Promise.all([
          fetch('/api/stats'),
          fetch('/api/genre'),
          fetch('/api/trend'),
          fetch('/api/peran'),
        ]);

        if (statsRes.ok) setStats(await statsRes.json());
        if (genreRes.ok) setGenres(await genreRes.json());
        if (trendRes.ok) setTrends(await trendRes.json());
        if (peranRes.ok) setRoles(await peranRes.json());
      } catch (err) {
        console.error('Error fetching initial dashboard data:', err);
      } finally {
        setStatsLoading(false);
        setChartsLoading(false);
      }
    }
    loadInitialData();
  }, []);

  // 2. Fetch paginated & filtered kreators whenever filters or debounced search changes
  useEffect(() => {
    async function fetchKreators() {
      setTableLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(filters.page),
          limit: '20',
          genre: filters.genre,
          bucket: filters.bucket,
          search: debouncedSearch,
          sort: filters.sort,
          dir: filters.dir,
        });

        const res = await fetch(`/api/kreator?${params.toString()}`);
        if (res.ok) {
          const json = await res.json();
          setKreatorData(json);
        }
      } catch (err) {
        console.error('Error fetching kreators list:', err);
      } finally {
        setTableLoading(false);
      }
    }
    fetchKreators();
  }, [
    filters.page,
    filters.genre,
    filters.bucket,
    filters.sort,
    filters.dir,
    debouncedSearch,
  ]);

  return (
    <div className="min-h-screen bg-ocean-950 flex flex-col font-sans transition-colors duration-300">
      {/* Top Navbar */}
      <Navbar
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
      />

      {/* Hero Sub-Header */}
      <div className="border-b border-ocean-900 bg-ocean-900/30 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-signal/10 border border-signal/20 text-signal text-xs font-mono mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Business Intelligence Dashboard</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-sand">
                Ekosistem Kreator Musik Oceanus
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary mt-1 max-w-2xl leading-relaxed">
                Analisis mendalam terhadap 11.361 kreator musik dari kurun waktu 1975 hingga 2040.
                Eksplorasi dominasi genre Dream Pop, tren lonjakan era 2020-an, serta profil para musisi paling berpengaruh.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-ocean-900/80 border border-ocean-800 text-right font-mono transition-colors">
                <div className="text-[10px] text-text-secondary uppercase">Status Data</div>
                <div className="text-xs text-signal flex items-center gap-1.5 justify-end mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
                  11.361 Rekor Aktif
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* KPI Section */}
        <KpiSection stats={stats} loading={statsLoading} />

        {/* 2x2 Charts Section */}
        <ChartsSection
          genres={genres}
          trends={trends}
          roles={roles}
          selectedGenre={filters.genre}
          selectedBucket={filters.bucket}
          onSelectGenre={setGenre}
          onSelectBucket={setBucket}
          loading={chartsLoading}
        />

        {/* Top 10 Leaderboard Section */}
        <LeaderboardSection onSelectKreator={(k) => setSelectedKreator(k)} />

        {/* Full Table & Mobile Cards Section */}
        <TableSection
          data={kreatorData.data}
          total={kreatorData.total}
          page={kreatorData.page}
          limit={kreatorData.limit}
          pages={kreatorData.pages}
          selectedGenre={filters.genre}
          selectedBucket={filters.bucket}
          search={filters.search}
          onSearchChange={setSearch}
          sortCol={filters.sort}
          sortDir={filters.dir}
          onSort={setSorting}
          onPageChange={setPage}
          onClearGenre={() => setGenre('')}
          onClearBucket={() => setBucket('')}
          onClearSearch={() => setSearch('')}
          onResetAll={resetFilters}
          onSelectKreator={(k) => setSelectedKreator(k)}
          loading={tableLoading}
        />
      </main>

      {/* Creator Detail Modal Popup */}
      <KreatorModal
        kreator={selectedKreator}
        onClose={() => setSelectedKreator(null)}
      />

      {/* Footer */}
      <footer className="border-t border-ocean-900 bg-ocean-950 py-6 mt-12 text-center text-xs font-mono text-text-muted transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-2">
          <div className="flex items-center gap-2 text-text-secondary">
            <Waves className="w-4 h-4 text-signal" />
            <span>Dashboard Analisis Kreator Musik Oceanus • Semester 5 Business Intelligence</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
