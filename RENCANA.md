# 🌊 Dashboard Oceanus — Rencana Implementasi

> **Status:** Draft Final · Siap Implementasi  
> **Dibuat:** 21 November 2026  
> **Konteks:** Mata Kuliah Business Intelligence — Presentasi Akademik  
> **Repo:** [Rea1kah2/dashboard-oceanus](https://github.com/Rea1kah2/dashboard-oceanus.git)

---

## 1. Ringkasan Proyek

Dashboard analitik web untuk visualisasi data **11.361 kreator musik** di dunia fiksi *Oceanus*, dari dataset `Analisis Kreator Musik Oceanus.xlsx`. Dibangun dengan metodologi **Spec-Driven Development (Kiro)**, desain premium **"Laut & Suara"** (ocean-dark theme), responsif mobile-first, dan dideploy ke GitHub.

### Keputusan Final

| Aspek | Keputusan |
|---|---|
| Framework | ✅ Next.js 15 (App Router + TypeScript) |
| Database | ✅ SQLite via `better-sqlite3` |
| Charts | ✅ Recharts |
| Table | ✅ TanStack Table v8 |
| Styling | ✅ Tailwind CSS v4 |
| Detail kreator | ✅ Modal popup (bottom-sheet di mobile) |
| Leaderboard | ✅ Section top 10 kreator elit |
| Commit data | ✅ xlsx + oceanus.db masuk repo |
| Audiens | ✅ Akademik/presentasi BI |
| Responsivitas | ✅ Mobile-first (xs → xl breakpoints) |

---

## 2. Insight Dataset (Hasil Analisis)

| Metrik | Nilai |
|---|---|
| Total kreator | 11.361 baris |
| Genre unik | 27 genre |
| Genre #1 | Dream Pop (2.535 kreator, 22.3%) |
| Bucket terbanyak | "1 karya" = 8.558 kreator (75.3%) |
| Kreator 10+ karya (elite) | 65 orang (0.57%) |
| Dekade paling aktif | 2020-an (6.160 kreator mulai) |
| Kreator 1 peran saja | 7.221 (63.5%) |
| Tahun aktif | 1975–2040 |
| Kreator tanpa nama panggung | 10.838 (95.4%) |

### Top 10 Genre (untuk chart)
1. Dream Pop — 2.535
2. Indie Folk — 1.234
3. Doom Metal — 1.051
4. Synthwave — 842
5. Psychedelic Rock — 641
6. Americana — 594
7. Oceanus Folk — 575
8. Alternative Rock — 482
9. Indie Rock — 467
10. Desert Rock — 456

---

## 3. Visual Design System — "Laut & Suara"

Tema: **Deep Ocean meets Analogue Music** — gelap, tenang, intens seperti kedalaman samudra bertemu estetika rekaman analog.

### Design Tokens (Palet Warna)

```css
/* Background */
--ocean-950: #060E1B;   /* Page background (void) */
--ocean-900: #0A1628;   /* Section background */
--ocean-800: #0F2240;   /* Card surface */
--ocean-700: #152D55;   /* Card hover / active border */
--ocean-500: #1B4F8A;   /* Interactive border */

/* Accent */
--signal:     #38BDF8;  /* Primary accent: bioluminescent cyan */
--signal-dim: #0EA5E9;  /* Accent pressed state */

/* Text */
--text-primary:   #E2EAF2;  /* Hampir putih, tinted blue */
--text-secondary: #7A9BB5;  /* Muted seafoam */
--text-muted:     #3D6080;  /* Sangat muted */

/* Chart (Ocean Palette) */
--chart-1: #38BDF8;  /* Cyan */
--chart-2: #818CF8;  /* Indigo-lavender */
--chart-3: #34D399;  /* Seafoam green */
--chart-4: #F472B6;  /* Coral pink */
--chart-5: #FBBF24;  /* Amber */
--chart-6: #A78BFA;  /* Purple */
--chart-7: #60A5FA;  /* Sky blue */
```

### Tipografi

| Role | Typeface | Weight |
|---|---|---|
| Hero/Display | DM Serif Display | 400 (italic) |
| Heading | Inter | 700, 600 |
| Body | Inter | 400, 500 |
| Data/Mono | JetBrains Mono | 400 |

### Anti-Slop Checklist

- ❌ Tidak ada eyebrow ALL-CAPS di atas setiap heading
- ❌ Tidak ada `A · B · C` middle-dot metadata strings
- ❌ Tidak ada `→` dekoratif di link/button
- ❌ Tidak ada card seragam dengan shadow `rgba(0,0,0,0.1)` semua
- ❌ Tidak ada gradient wash sebagai ornamen
- ❌ Tidak ada background `#F4F1EA` warm cream atau `#D97757` terracotta
- ✅ Satu elemen jadi bintang per section, sisanya tenang
- ✅ Motion hanya pada hover, tooltip, modal open/close

---

## 4. Wireframe Halaman

### Desktop (1280px+)

```
┌─────────────────────────────────────────────────────────────────────┐
│  🌊 OCEANUS                [Search kreator...]        [Filter ▾]    │
├─────────────────────────────────────────────────────────────────────┤
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────────┐   │
│  │   11,361   │ │ Dream Pop  │ │   2020s    │ │      65        │   │
│  │  Kreator   │ │  Genre #1  │ │ Era Puncak │ │  Kreator Elite │   │
│  └────────────┘ └────────────┘ └────────────┘ └────────────────┘   │
├─────────────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────┐  ┌────────────────────────────────┐ │
│  │  DISTRIBUSI GENRE          │  │  TREN KREATOR PER DEKADE       │ │
│  │  [Horizontal Bar Chart]    │  │  [Area Chart 1975–2038]        │ │
│  │  Dream Pop ████████ 2,535  │  │          ╭────╮               │ │
│  │  Indie Folk █████   1,234  │  │  ____╭───╯    ╰──            │ │
│  │  Doom Metal ████    1,051  │  │  1975    2010    2038         │ │
│  │  ...klik untuk filter      │  │                               │ │
│  └────────────────────────────┘  └────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────┐  ┌────────────────────────────────┐ │
│  │  DISTRIBUSI PERAN (top 7)  │  │  BUCKET KARYA                  │ │
│  │  [Stacked Bar per Genre]   │  │  [Donut Chart]                 │ │
│  │  Dream Pop [████|██|██|█]  │  │       ╭────╮                  │ │
│  │  Indie Folk[███|█|██|██]   │  │    ╭──╯    ╰──╮              │ │
│  │  Doom Metal[████|██|█|██]  │  │    │  1 karya  │              │ │
│  │  ...                       │  │    ╰──╮      ╭──╯              │ │
│  └────────────────────────────┘  └────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────┤
│  TOP 10 KREATOR ELIT                                                 │
│  ┌──┬────────────────┬───────┬────────┬──────────┬──────────────┐  │
│  │# │ Nama           │ Karya │Notable │ Genre    │ Pengaruh     │  │
│  ├──┼────────────────┼───────┼────────┼──────────┼──────────────┤  │
│  │1 │ Jay Walters    │  37   │   35   │ S. Gothic│    164       │  │
│  │2 │ [nama kreator] │  36   │   34   │ ...      │    ...       │  │
│  │  │ ...            │  ...  │  ...   │          │              │  │
│  └──┴────────────────┴───────┴────────┴──────────┴──────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│  DATA KREATOR       [Search] [Genre ▾] [Bucket ▾] [Peran ▾] [Sort] │
│  ┌──────────────┬──────────────┬───────┬────────┬──────┬──────────┐ │
│  │ Nama         │ Genre Utama  │ Karya │Notable │Aktif │Pengaruh  │ │
│  ├──────────────┼──────────────┼───────┼────────┼──────┼──────────┤ │
│  │ Jay Walters  │ Southern...  │  37   │   35   │1984–2│   164    │ │
│  │ Min Fu       │ Lo-Fi Electro│  10   │   10   │1997–2│   162    │ │
│  │ ...          │ ...          │  ...  │  ...   │ ...  │  ...     │ │
│  └──────────────┴──────────────┴───────┴────────┴──────┴──────────┘ │
│                   [←] [1] [2] [3] ... [114] [→]    Tampilkan 20 ▾   │
└─────────────────────────────────────────────────────────────────────┘
```

### Mobile (375px)

```
┌──────────────────────┐
│ 🌊 OCEANUS    [☰]   │
├──────────────────────┤
│ [🔍 Search kreator] │
├──────────────────────┤
│  ┌────────┬────────┐ │
│  │ 11,361 │  Dream │ │
│  │ Kreator│  Pop ✦ │ │
│  └────────┴────────┘ │
│  ┌────────┬────────┐ │
│  │  2020s │   65   │ │
│  │  Era↑  │ Elite  │ │
│  └────────┴────────┘ │
├──────────────────────┤
│  DISTRIBUSI GENRE    │
│  [scroll horizontal] │
│  Dream Pop ████ 2.5k │
│  Indie Folk ██  1.2k │
├──────────────────────┤
│  TREN PER DEKADE     │
│  [Area Chart]        │
│  ____╭──────╮____   │
│  1975         2038   │
├──────────────────────┤
│  DISTRIBUSI PERAN    │
│  [Stacked Bar]       │
├──────────────────────┤
│  BUCKET KARYA        │
│  [Donut Chart kecil] │
├──────────────────────┤
│  TOP 10 ELITE        │
│  [Card horizontal    │
│   scroll]            │
├──────────────────────┤
│  DATA KREATOR        │
│  [Filter] [Sort]     │
│  ─────────────────── │
│  Jay Walters     [>] │
│  S. Gothic · 37 🎵   │
│  1984–2030           │
│  ─────────────────── │
│  Min Fu          [>] │
└──────────────────────┘
```

### Modal Detail Kreator

```
Desktop (centered dialog):         Mobile (bottom sheet):
┌──────────────────────────────┐   ┌──────────────────────┐
│                           ✕  │   │ ─────── (handle) ─── │
│  Jay Walters                 │   │ ✕    Jay Walters      │
│  Southern Gothic Rock        │   │ Southern Gothic Rock  │
│  ID: 2070                    │   ├──────────────────────┤
├──────────────────────────────┤   │ ┌────┐┌────┐┌──────┐ │
│  ┌──────┬──────┬────┬──────┐ │   │ │ 37 ││ 35 ││ 164  │ │
│  │  37  │  35  │164 │  30  │ │   │ │krya││notb││pngrh │ │
│  │karya │notabl│pngh│dirujk│ │   │ └────┘└────┘└──────┘ │
│  └──────┴──────┴────┴──────┘ │   ├──────────────────────┤
├──────────────────────────────┤   │  DISTRIBUSI PERAN     │
│  Distribusi Peran:           │   │  Performer  ████ 16   │
│  [Bar mini horizontal]       │   │  Komposer   ██    6   │
│  Performer ████████████ 16   │   │  Lirik      ███   7   │
│  Komposer  ████         6   │   │  Produser   ████ 17   │
│  Lirik     ███          7   │   ├──────────────────────┤
│  Produser  █████████   17   │   │  Genre: S. Gothic Rock│
├──────────────────────────────┤   │  n_genre: 4 · n_grp:2 │
│  Genre: Southern Gothic Rock │   │  Aktif: 1984–2030     │
│  n_genre: 4 · n_grup: 2      │   │  Durasi: 46 tahun     │
│  Aktif: 1984 → 2030 (46 thn) │   └──────────────────────┘
│  Peran: 4 jenis              │
└──────────────────────────────┘
```

---

## 5. Spesifikasi Interaktivitas

| Elemen | Interaksi | Behavior |
|---|---|---|
| Bar chart genre | Klik bar | Filter seluruh tabel ke genre itu + highlight bar |
| Donut bucket | Klik segment | Filter tabel ke bucket itu |
| Area trend | Hover | Tooltip jumlah kreator + tahun |
| Tabel baris | Klik | Buka modal detail kreator |
| Leaderboard baris | Klik | Buka modal detail kreator |
| Search box | Type (debounce 300ms) | Filter tabel real-time |
| Filter dropdown | Pilih | Update tabel + sync chart |
| Filter aktif | Badge dengan ✕ | Klik ✕ reset filter itu |
| Reset semua | Tombol "Reset" | Clear semua filter |
| Modal | Click-outside / Esc / ✕ | Close modal |
| Pagination | Nomor / prev / next | Load halaman data |
| Sort header | Klik kolom heading | Toggle asc/desc |
| Mobile nav | Hamburger | Slide-in filter panel overlay |

### Responsivitas Mobile-First

| Breakpoint | Lebar | Perubahan Layout |
|---|---|---|
| `xs` default | < 640px | 1 kolom, tabel jadi card-list, chart full-width |
| `sm` | ≥ 640px | 2 kolom KPI cards |
| `md` | ≥ 768px | Navbar horizontal, filter inline |
| `lg` | ≥ 1024px | 2 kolom chart side-by-side |
| `xl` | ≥ 1280px | Full 2×2 chart grid, wide table |

**Mobile-specific:**
- Tabel → card list (lebih mudah disentuh)
- Chart genre → scroll horizontal
- Modal → bottom sheet slide-up
- Filter → bottom sheet overlay
- Touch target minimum: **44×44px** semua elemen interaktif

---

## 6. Arsitektur Teknis

### Diagram Alur Data

```
Analisis Kreator Musik Oceanus.xlsx
         │
         ▼ scripts/import.mjs
     data/oceanus.db  (SQLite)
         │
         ▼ src/lib/db.ts (better-sqlite3 singleton)
         │
    ┌────┴─────────────────────────────┐
    │            API Routes            │
    ├──────────────────────────────────┤
    │ /api/stats    /api/kreator       │
    │ /api/genre    /api/trend         │
    │ /api/peran    /api/leaderboard   │
    └────┬─────────────────────────────┘
         │
    ┌────┴────────────────────────────────┐
    │          React Components           │
    ├─────────────────────────────────────┤
    │ StatCards    GenreBarChart          │
    │ TrendArea    RoleStackedBar         │
    │ BucketDonut  Leaderboard            │
    │ KreatorTable (TanStack)             │
    │ KreatorModal (Portal)               │
    └─────────────────────────────────────┘
```

### Database Schema (SQLite)

```sql
CREATE TABLE kreator (
  id_kreator        INTEGER PRIMARY KEY,
  nama              TEXT NOT NULL,
  nama_panggung     TEXT DEFAULT '',
  n_performer       INTEGER DEFAULT 0,
  n_komposer        INTEGER DEFAULT 0,
  n_lirik           INTEGER DEFAULT 0,
  n_produser        INTEGER DEFAULT 0,
  total_karya       INTEGER DEFAULT 0,
  karya_notable     INTEGER DEFAULT 0,
  n_genre           INTEGER DEFAULT 0,
  genre_utama       TEXT,
  thn_pertama       INTEGER,
  thn_terakhir      INTEGER,
  pengaruh_diterima INTEGER DEFAULT 0,
  karya_dirujuk     INTEGER DEFAULT 0,
  n_grup            INTEGER DEFAULT 0,
  n_peran           INTEGER DEFAULT 0,
  bucket_karya      TEXT
);

CREATE INDEX idx_genre    ON kreator(genre_utama);
CREATE INDEX idx_thn      ON kreator(thn_pertama);
CREATE INDEX idx_bucket   ON kreator(bucket_karya);
CREATE INDEX idx_karya    ON kreator(total_karya DESC);
CREATE INDEX idx_notable  ON kreator(karya_notable DESC);
CREATE INDEX idx_pengaruh ON kreator(pengaruh_diterima DESC);
```

### API Endpoints

| Method | Endpoint | Query Params | Response |
|---|---|---|---|
| GET | `/api/stats` | — | KPI global (total, avg, genre #1, dsb) |
| GET | `/api/kreator` | `genre`, `bucket`, `peran`, `search`, `page`, `limit`, `sort`, `dir` | Paginated kreator list |
| GET | `/api/genre` | — | Count per genre (27 items) |
| GET | `/api/trend` | — | Kreator per dekade (1970s–2030s) |
| GET | `/api/peran` | — | Distribusi peran top 7 genre |
| GET | `/api/leaderboard` | `by=notable\|pengaruh\|karya` | Top 10 kreator |

### Response Types (TypeScript)

```typescript
// GET /api/stats
interface StatsResponse {
  total_kreator: number;        // 11361
  avg_total_karya: number;      // 1.5
  genre_terbanyak: string;      // "Dream Pop"
  genre_count: number;          // 2535
  kreator_elite: number;        // 65
  thn_pertama_min: number;      // 1975
  thn_terakhir_max: number;     // 2040
  dekade_puncak: string;        // "2020s"
}

// GET /api/kreator
interface KreatorListResponse {
  data: KreatorRow[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

interface KreatorRow {
  id_kreator: number;
  nama: string;
  nama_panggung: string;
  genre_utama: string;
  total_karya: number;
  karya_notable: number;
  thn_pertama: number;
  thn_terakhir: number;
  pengaruh_diterima: number;
  n_peran: number;
  bucket_karya: string;
  // Detail only (untuk modal):
  n_performer?: number;
  n_komposer?: number;
  n_lirik?: number;
  n_produser?: number;
  n_genre?: number;
  n_grup?: number;
  karya_dirujuk?: number;
}
```

---

## 7. Struktur Direktori Proyek

```
dashboard-oceanus/
│
├── RENCANA.md                    ← (file ini)
│
├── .kiro/
│   ├── steering/
│   │   ├── product.md            ← Visi, persona, goals
│   │   ├── tech.md               ← Stack whitelist/blacklist
│   │   └── structure.md          ← Dir conventions, naming
│   └── specs/
│       └── dashboard/
│           ├── requirements.md   ← EARS requirements
│           ├── design.md         ← Architecture blueprint
│           └── tasks.md          ← Checklist atomik
│
├── data/
│   └── oceanus.db                ← SQLite DB (di-generate)
│
├── scripts/
│   └── import.mjs                ← Parse xlsx → SQLite
│
├── public/
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── layout.tsx            ← Root layout (font, metadata)
│   │   ├── page.tsx              ← Dashboard utama (/)
│   │   ├── globals.css           ← Design tokens + Tailwind
│   │   └── api/
│   │       ├── stats/route.ts
│   │       ├── kreator/route.ts
│   │       ├── genre/route.ts
│   │       ├── trend/route.ts
│   │       ├── peran/route.ts
│   │       └── leaderboard/route.ts
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx        ← Top nav + hamburger mobile
│   │   │   └── FilterBar.tsx     ← Active filter chips + reset
│   │   ├── charts/
│   │   │   ├── GenreBarChart.tsx ← Horizontal bar, klikable
│   │   │   ├── TrendAreaChart.tsx← Area chart dekade
│   │   │   ├── RoleStackedBar.tsx← Peran per genre top 7
│   │   │   └── BucketDonut.tsx   ← Donut chart bucket
│   │   ├── sections/
│   │   │   ├── KpiSection.tsx    ← 4 stat cards
│   │   │   ├── ChartsSection.tsx ← 2×2 chart grid
│   │   │   ├── Leaderboard.tsx   ← Top 10 kreator elit
│   │   │   └── TableSection.tsx  ← Full data table
│   │   ├── table/
│   │   │   ├── KreatorTable.tsx  ← TanStack table, sort, paginate
│   │   │   └── KreatorCard.tsx   ← Card view untuk mobile
│   │   ├── modal/
│   │   │   └── KreatorModal.tsx  ← Popup / bottom-sheet
│   │   └── ui/
│   │       ├── StatCard.tsx      ← KPI card komponen
│   │       ├── Badge.tsx         ← Genre/bucket tag
│   │       ├── Spinner.tsx       ← Loading spinner
│   │       └── EmptyState.tsx    ← Hasil kosong
│   │
│   ├── hooks/
│   │   ├── useFilters.ts         ← Filter state global
│   │   └── useDebounce.ts        ← Debounce 300ms
│   │
│   └── lib/
│       ├── db.ts                 ← Singleton DB connection
│       └── types.ts              ← Semua TypeScript interfaces
│
├── .gitignore
├── README.md
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 8. Checklist Implementasi (Tasks Atomik)

### Phase 0 — Git & Steering Setup

- [ ] `git init` di folder `dashboard-oceanus/`
- [ ] `git remote add origin https://github.com/Rea1kah2/dashboard-oceanus.git`
- [ ] Buat `.kiro/steering/product.md`
- [ ] Buat `.kiro/steering/tech.md`
- [ ] Buat `.kiro/steering/structure.md`
- [ ] Buat `.kiro/specs/dashboard/requirements.md`
- [ ] Buat `.kiro/specs/dashboard/design.md`
- [ ] Buat `.kiro/specs/dashboard/tasks.md`

### Phase 1 — Project Bootstrap

- [ ] `npx create-next-app@latest . --typescript --tailwind --app --src-dir`
- [ ] Install deps: `npm install better-sqlite3 recharts @tanstack/react-table xlsx`
- [ ] Install dev deps: `npm install -D @types/better-sqlite3`
- [ ] Setup font: DM Serif Display + Inter + JetBrains Mono via `next/font/google`
- [ ] Setup design tokens di `globals.css` (CSS custom properties ocean palette)
- [ ] Extend Tailwind config dengan warna ocean
- [ ] Setup `src/lib/types.ts` dengan semua interface TypeScript

### Phase 2 — Data Layer

- [ ] Buat `scripts/import.mjs` — parse xlsx dengan `xlsx` library → insert ke SQLite
- [ ] Jalankan: `node scripts/import.mjs` — verifikasi output `✓ Imported 11361 rows`
- [ ] Buat `src/lib/db.ts` — singleton `better-sqlite3` dengan lazy initialization

### Phase 3 — API Routes

- [ ] `/api/stats/route.ts` — query aggregate KPI
- [ ] `/api/kreator/route.ts` — paginated, filtered (genre/bucket/peran), searched, sorted
- [ ] `/api/genre/route.ts` — COUNT per genre_utama ORDER BY count DESC
- [ ] `/api/trend/route.ts` — GROUP BY dekade (thn_pertama // 10 * 10)
- [ ] `/api/peran/route.ts` — AVG peran per top 7 genre
- [ ] `/api/leaderboard/route.ts` — top 10 by karya_notable / pengaruh_diterima

### Phase 4 — UI Components (Bottom-up)

- [ ] `ui/StatCard.tsx` — KPI card dengan label + angka DM Serif besar
- [ ] `ui/Badge.tsx` — genre/bucket colored badge
- [ ] `ui/Spinner.tsx` — loading state
- [ ] `ui/EmptyState.tsx` — ilustrasi + teks saat filter 0 hasil
- [ ] `layout/Navbar.tsx` — logo + search box + hamburger (mobile)
- [ ] `layout/FilterBar.tsx` — chip filter aktif + tombol reset
- [ ] `charts/GenreBarChart.tsx` — Recharts horizontal BarChart, klik = filter
- [ ] `charts/TrendAreaChart.tsx` — Recharts AreaChart, responsive
- [ ] `charts/RoleStackedBar.tsx` — Recharts BarChart stacked per genre
- [ ] `charts/BucketDonut.tsx` — Recharts PieChart donut, klik = filter
- [ ] `table/KreatorTable.tsx` — TanStack Table, sortable header, pagination
- [ ] `table/KreatorCard.tsx` — card mobile view per kreator
- [ ] `modal/KreatorModal.tsx` — dialog desktop + bottom-sheet mobile
- [ ] `sections/KpiSection.tsx` — grid 4 StatCard
- [ ] `sections/ChartsSection.tsx` — 2×2 chart grid responsive
- [ ] `sections/Leaderboard.tsx` — top 10 table (by notable, pengaruh, total karya — toggle)
- [ ] `sections/TableSection.tsx` — FilterBar + KreatorTable/KreatorCard
- [ ] `hooks/useDebounce.ts`
- [ ] `hooks/useFilters.ts`

### Phase 5 — Halaman Utama

- [ ] `src/app/layout.tsx` — font setup, metadata, body class
- [ ] `src/app/globals.css` — CSS tokens, base styles, Tailwind directives
- [ ] `src/app/page.tsx` — komposisi: KpiSection + ChartsSection + Leaderboard + TableSection
- [ ] Implementasi state filter: genre, bucket, peran, search
- [ ] Koneksi chart → filter: klik genre di chart → update state filter → table update
- [ ] Loading skeleton saat fetching data

### Phase 6 — Quality & Polish

- [ ] Test di 375px: layout mobile, card list, bottom-sheet modal
- [ ] Test di 768px: tablet intermediate
- [ ] Test di 1280px: full desktop layout
- [ ] Keyboard: `Tab` navigasi, `Esc` close modal
- [ ] `aria-label` pada semua chart, button, dan interactive element
- [ ] `prefers-reduced-motion` media query untuk animasi
- [ ] Loading skeleton agar tidak layout shift
- [ ] Empty state visual saat filter hasil 0

### Phase 7 — GitHub Push

- [ ] Buat `.gitignore` (node_modules, .next, .env*)
- [ ] Buat `README.md` dengan deskripsi + cara run lokal
- [ ] Tambahkan file data: `data/oceanus.db` + xlsx asli
- [ ] `git add .`
- [ ] `git commit -m "feat: initial dashboard oceanus — 11361 kreator musik"`
- [ ] `git push -u origin main`

---

## 9. Verification Plan

### Build & Import Check

```bash
# 1. Import data
node scripts/import.mjs
# Expected: "✓ Imported 11361 rows into data/oceanus.db"

# 2. TypeScript check
npx tsc --noEmit
# Expected: 0 errors

# 3. Build produksi
npm run build
# Expected: ✓ Compiled successfully, 0 errors

# 4. Dev server
npm run dev
# Expected: Ready on http://localhost:3000
```

### Manual Testing Checklist

- [ ] `localhost:3000` → 4 KPI cards tampil dengan angka benar
- [ ] Genre chart klik "Dream Pop" → tabel filter hanya Dream Pop
- [ ] Ketik "Jay" di search → Jay Walters muncul dalam < 1 detik
- [ ] Klik baris tabel → modal detail kreator terbuka dengan data benar
- [ ] Tekan `Esc` → modal close
- [ ] Klik luar modal → modal close
- [ ] Leaderboard menampilkan kreator dengan notable ≥ 30
- [ ] Toggle leaderboard by "Pengaruh" → urutan berubah
- [ ] Filter aktif tampil sebagai badge di FilterBar
- [ ] Klik `✕` pada badge → filter direset
- [ ] Resize ke 375px → layout mobile, tabel jadi card list
- [ ] Di mobile, klik hamburger → filter panel muncul
- [ ] Di mobile, klik kreator card → bottom sheet slide up
- [ ] `git log` → commit terdapat, push ke GitHub berhasil

---

## 10. Stack Referensi Cepat

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "better-sqlite3": "^11.0.0",
    "recharts": "^2.13.0",
    "@tanstack/react-table": "^8.20.0",
    "xlsx": "^0.18.5"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/better-sqlite3": "^7.6.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0"
  }
}
```

---

> **File ini adalah rencana aktif proyek Dashboard Oceanus.**  
> Update file ini setiap kali ada perubahan arsitektur atau keputusan desain.  
> Implementasi dimulai setelah user memberikan approval final.
