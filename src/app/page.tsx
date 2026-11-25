'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
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

  // Baca preferensi tema dari localStorage setelah mount (sinkron dengan init script di layout.tsx)
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('oceanus-theme');
      const nextDark = saved !== 'light';
      setIsDark(nextDark);
    } catch {
      // Abaikan jika localStorage tidak tersedia
    }
  }, []);

  const handleToggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      const root = document.documentElement;
      if (next) {
        root.classList.remove('light');
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
      }
      try {
        window.localStorage.setItem('oceanus-theme', next ? 'dark' : 'light');
      } catch {
        // Abaikan jika storage diblokir
      }
      return next;
    });
  }, []);

  const {
    filters,
    hydrated,
    toggleGenre,
    setGenreDirect,
    toggleBucket,
    setBucketDirect,
    setPeran,
    setSearch,
    setSorting,
    setPage,
    setLimit,
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

  // UI & Error states
  const [statsLoading, setStatsLoading] = useState(true);
  const [chartsLoading, setChartsLoading] = useState(true);
  const [initialError, setInitialError] = useState<string | null>(null);
  const [initialReloadTick, setInitialReloadTick] = useState(0);

  const [tableLoading, setTableLoading] = useState(true);
  const [tableError, setTableError] = useState<string | null>(null);
  const [tableReloadTick, setTableReloadTick] = useState(0);

  const [selectedKreator, setSelectedKreator] = useState<Kreator | null>(null);

  const retryInitial = useCallback(() => {
    setInitialReloadTick((prev) => prev + 1);
  }, []);

  const retryTable = useCallback(() => {
    setTableReloadTick((prev) => prev + 1);
  }, []);

  // 1. Fetch static KPI & Charts data
  useEffect(() => {
    const controller = new AbortController();

    async function loadInitialData() {
      try {
        setStatsLoading(true);
        setChartsLoading(true);
        setInitialError(null);

        const [statsRes, genreRes, trendRes, peranRes] = await Promise.all([
          fetch('/api/stats', { signal: controller.signal }),
          fetch('/api/genre', { signal: controller.signal }),
          fetch('/api/trend', { signal: controller.signal }),
          fetch('/api/peran', { signal: controller.signal }),
        ]);

        if (!statsRes.ok || !genreRes.ok || !trendRes.ok || !peranRes.ok) {
          throw new Error('Gagal mengambil sebagian data analitik.');
        }

        const [statsJson, genreJson, trendJson, peranJson] = await Promise.all([
          statsRes.json() as Promise<StatsResponse>,
          genreRes.json() as Promise<GenreDistribution[]>,
          trendRes.json() as Promise<TrendDecade[]>,
          peranRes.json() as Promise<RoleDistribution[]>,
        ]);

        setStats(statsJson);
        setGenres(genreJson);
        setTrends(trendJson);
        setRoles(peranJson);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return;
        console.error('Error fetching initial dashboard data:', err);
        setInitialError('Gagal memuat data statistik & visualisasi. Periksa koneksi server.');
      } finally {
        if (!controller.signal.aborted) {
          setStatsLoading(false);
          setChartsLoading(false);
        }
      }
    }

    loadInitialData();
    return () => controller.abort();
  }, [initialReloadTick]);

  // 2. Fetch paginated & filtered kreators whenever filters or debounced search changes
  useEffect(() => {
    if (!hydrated) return;
    const controller = new AbortController();

    async function fetchKreators() {
      setTableLoading(true);
      setTableError(null);
      try {
        const params = new URLSearchParams({
          page: String(filters.page),
          limit: String(filters.limit),
          genre: filters.genre,
          bucket: filters.bucket,
          peran: filters.peran,
          search: debouncedSearch,
          sort: filters.sort,
          dir: filters.dir,
        });

        const res = await fetch(`/api/kreator?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const json = (await res.json()) as PaginatedKreatorResponse;
        setKreatorData(json);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return;
        console.error('Error fetching kreators list:', err);
        setTableError('Gagal memuat daftar kreator. Silakan coba lagi.');
      } finally {
        if (!controller.signal.aborted) {
          setTableLoading(false);
        }
      }
    }

    fetchKreators();
    return () => controller.abort();
  }, [
    hydrated,
    filters.page,
    filters.limit,
    filters.genre,
    filters.bucket,
    filters.peran,
    filters.sort,
    filters.dir,
    debouncedSearch,
    tableReloadTick,
  ]);

  const exportUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (filters.genre) params.set('genre', filters.genre);
    if (filters.bucket) params.set('bucket', filters.bucket);
    if (filters.peran) params.set('peran', filters.peran);
    if (debouncedSearch.trim()) params.set('search', debouncedSearch.trim());
    params.set('sort', filters.sort);
    params.set('dir', filters.dir);
    return `/api/kreator/export?${params.toString()}`;
  }, [
    filters.genre,
    filters.bucket,
    filters.peran,
    filters.sort,
    filters.dir,
    debouncedSearch,
  ]);

  const heroTotalLabel = (stats?.total_kreator ?? 11361).toLocaleString('id-ID');
  const heroMinYear = stats?.thn_pertama_min ?? 1975;
  const heroMaxYear = stats?.thn_terakhir_max ?? 2040;
  const heroTopGenre = stats?.genre_terbanyak ?? 'Dream Pop';

  return (
    <div className="min-h-screen bg-ocean-950 flex flex-col font-sans transition-colors duration-300">
      {/* Top Navbar */}
      <Navbar
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        totalKreator={stats?.total_kreator}
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
                Analisis mendalam terhadap {heroTotalLabel} kreator musik dari kurun waktu {heroMinYear} hingga {heroMaxYear}.
                Eksplorasi dominasi genre {heroTopGenre}, tren lonjakan era digital, serta profil para musisi paling berpengaruh.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* KPI Section */}
        <KpiSection
          stats={stats}
          loading={statsLoading}
          error={initialError}
          onRetry={retryInitial}
        />

        {/* 2x2 Charts Section */}
        <ChartsSection
          genres={genres}
          trends={trends}
          roles={roles}
          buckets={stats?.buckets ?? []}
          selectedGenre={filters.genre}
          selectedBucket={filters.bucket}
          onSelectGenre={toggleGenre}
          onSelectBucket={toggleBucket}
          isDark={isDark}
          loading={chartsLoading}
        />

        {/* Top 10 Leaderboard Section */}
        <LeaderboardSection onSelectKreator={(k) => setSelectedKreator(k)} />

        {/* Full Table & Mobile Cards Section */}
        <TableSection
          data={kreatorData.data}
          total={kreatorData.total}
          totalAll={stats?.total_kreator}
          page={kreatorData.page}
          limit={filters.limit}
          pages={kreatorData.pages}
          genres={genres}
          buckets={stats?.buckets ?? []}
          selectedGenre={filters.genre}
          selectedBucket={filters.bucket}
          selectedPeran={filters.peran}
          search={filters.search}
          onSearchChange={setSearch}
          onSelectGenreDirect={setGenreDirect}
          onSelectBucketDirect={setBucketDirect}
          onSelectPeran={setPeran}
          sortCol={filters.sort}
          sortDir={filters.dir}
          onSort={setSorting}
          onPageChange={setPage}
          onLimitChange={setLimit}
          onClearGenre={() => setGenreDirect('')}
          onClearBucket={() => setBucketDirect('')}
          onClearPeran={() => setPeran('')}
          onClearSearch={() => setSearch('')}
          onResetAll={resetFilters}
          onSelectKreator={(k) => setSelectedKreator(k)}
          exportUrl={exportUrl}
          loading={tableLoading}
          error={tableError}
          onRetry={retryTable}
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
            <span>Dashboard Analisis Kreator Musik Oceanus</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
