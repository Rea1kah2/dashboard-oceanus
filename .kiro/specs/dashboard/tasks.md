# Tasks: Dashboard Oceanus Implementation

## Phase 0: Setup & Steering Grounding
- [x] 0.1 Setup Foundational Steering (`product.md`, `tech.md`, `structure.md`)
- [x] 0.2 Setup Feature Specification (`requirements.md`, `design.md`, `tasks.md`)

## Phase 1: Inisialisasi Proyek & Git
- [x] 1.1 Inisialisasi Git repository & remote `https://github.com/Rea1kah2/dashboard-oceanus.git`
- [x] 1.2 Scaffold Next.js 15 project structure (TypeScript, Tailwind CSS, App Router)
- [x] 1.3 Install dependencies: `better-sqlite3`, `recharts`, `@tanstack/react-table`, `xlsx`, `lucide-react`
- [x] 1.4 Konfigurasi typography Google Fonts & Tailwind CSS custom tokens (Ocean palette)

## Phase 2: Ingesti Data & Database Layer
- [x] 2.1 Buat script migrasi `scripts/import.mjs` (Excel xlsx ke SQLite `data/oceanus.db`)
- [x] 2.2 Eksekusi import & verifikasi integritas 11.361 baris data
- [x] 2.3 Buat database client singleton `src/lib/db.ts` dan tipe data `src/lib/types.ts`

## Phase 3: REST API Endpoints
- [x] 3.1 Implementasi `/api/stats` (Agregasi metrik KPI)
- [x] 3.2 Implementasi `/api/genre` (Distribusi genre lengkap)
- [x] 3.3 Implementasi `/api/trend` (Tren kreator per dekade)
- [x] 3.4 Implementasi `/api/peran` (Komposisi peran top genre)
- [x] 3.5 Implementasi `/api/leaderboard` (Top 10 kreator elit)
- [x] 3.6 Implementasi `/api/kreator` (Query tersaring, paginasi, pencarian)

## Phase 4: Komponen UI & Visualisasi Data
- [x] 4.1 Buat komponen layout: `Navbar.tsx` dan `FilterBar.tsx`
- [x] 4.2 Buat `StatCard.tsx` dan `KpiSection.tsx`
- [x] 4.3 Buat komponen chart: `GenreBarChart.tsx`, `TrendAreaChart.tsx`, `RoleStackedBar.tsx`, `BucketDonut.tsx`
- [x] 4.4 Buat `LeaderboardSection.tsx` (Top 10 kreator dengan toggle metrik)
- [x] 4.5 Buat `KreatorTable.tsx` (TanStack Table untuk desktop) dan `KreatorCard.tsx` (list view untuk mobile)
- [x] 4.6 Buat `KreatorModal.tsx` (Popup detail responsif dengan radar/bar komposisi peran)

## Phase 5: Halaman Dashboard Utama & Interaktivitas
- [x] 5.1 Implementasi hook filter `useFilters.ts` & debounce `useDebounce.ts`
- [x] 5.2 Integrasikan seluruh section di `src/app/page.tsx`
- [x] 5.3 Sinkronisasi interaktivitas: klik bar genre memicu filter tabel, pencarian nama instan, klik baris membuka modal
- [x] 5.4 Optimasi responsivitas mobile (375px) dan tablet (768px)

## Phase 6: Verifikasi & Build Testing
- [x] 6.1 Jalankan typecheck `npx tsc --noEmit`
- [x] 6.2 Eksekusi `npm run build` dan verifikasi 0 error
- [x] 6.3 Validasi pengujian fungsi (filter, modal, search, responsive)

## Phase 7: Publikasi ke GitHub
- [x] 7.1 Siapkan `.gitignore` dan `README.md` komprehensif dengan panduan instalasi
- [x] 7.2 Commit seluruh pekerjaan
- [x] 7.3 Push ke remote repository `Rea1kah2/dashboard-oceanus`
