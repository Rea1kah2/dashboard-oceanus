# Tech Steering: Dashboard Oceanus

## Technology Stack
- **Framework**: Next.js 15 (App Router, React 19, TypeScript, `output: 'standalone'`)
- **Database Engine**: SQLite 3 via `better-sqlite3` (Embedded, zero-latency, single-file read-only `journal_mode = DELETE` at `./data/oceanus.db`)
- **Data Ingestion**: Node.js offline script (`scripts/import.mjs`) dengan `xlsx` (`devDependencies` only) untuk migrasi Excel ke SQLite schema
- **Data Visualization**: Recharts (Custom themed charts: Bar, Area, Donut, Stacked Bar — adaptif Dark & Light Mode)
- **Table Management**: Server-side SQLite pagination, multi-column sorting, filter dropdown (27 genre, bucket, variasi peran), URL query sync, dan Export CSV
- **Styling Engine**: Tailwind CSS v3.4 + CSS Custom Properties (Design Tokens Dark & Light Mode)
- **Typography**: Google Fonts via `next/font` (`DM Serif Display`, `Inter`, `JetBrains Mono`)
- **Icons**: Lucide React icons
- **Deployment**: Multi-stage Docker (`node:22-slim`) + Blueprint `render.yaml` (Render Singapore)

## Strict Rules & Constraints
1. **Zero External DB Dependency**: Database wajib self-contained dalam file `data/oceanus.db` (non-WAL) sehingga repositori dapat di-clone, dijalankan lokal, atau dideploy via Docker tanpa setup PostgreSQL/DB eksternal.
2. **Server-Side Data Operations**: Query filtering, pagination, agregasi KPI, leaderboard, dan ekspor CSV dieksekusi di backend API via SQLite SQL berindeks, bukan client-side parsing pada 11.000 baris.
3. **No Slop Visual Policy**:
   - Dilarang memakai warna background generik warm cream `#F4F1EA` atau terracotta `#D97757`.
   - Gunakan palet deep ocean `#060E1B` / `#0A1628` (Dark) dan ocean-tinted `#EEF4FA` / `#FFFFFF` (Light) dengan kontras WCAG AA.
   - Card radius tidak boleh seragam membulat besar; gunakan radius presisi 4px–8px.
4. **Mobile Usability**:
   - Seluruh touch target minimal 44x44px pada aksi utama.
   - Tabel otomatis beralih menjadi stacked card list di layar mobile (< 640px).
