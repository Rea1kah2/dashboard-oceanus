# Tech Steering: Dashboard Oceanus

## Technology Stack
- **Framework**: Next.js 15 (App Router, React 19, TypeScript)
- **Database Engine**: SQLite 3 via `better-sqlite3` (Embedded, zero-latency, file-based at `./data/oceanus.db`)
- **Data Ingestion**: Node.js script dengan library `xlsx` untuk migrasi Excel ke SQLite schema
- **Data Visualization**: Recharts (Custom themed charts: Bar, Area, Donut, Stacked Bar)
- **Table Management**: @tanstack/react-table v8 (Pagination, sorting, multi-column search)
- **Styling Engine**: Tailwind CSS v4 + Vanilla CSS Custom Properties (Design Tokens)
- **Typography**: Google Fonts via `next/font` (`DM Serif Display`, `Inter`, `JetBrains Mono`)
- **Icons**: Lucide React icons

## Strict Rules & Constraints
1. **Zero External DB Dependency**: Database wajib self-contained dalam file `data/oceanus.db` sehingga repositori dapat di-clone dan langsung dijalankan tanpa setup Docker atau PostgreSQL terpisah.
2. **Server-Side Data Operations**: Query filtering, pagination, agregasi KPI, dan leaderboard dieksekusi di backend API via SQLite SQL berindeks, bukan client-side parsing pada 11.000 baris.
3. **No Slop Visual Policy**:
   - Dilarang memakai warna background generik warm cream `#F4F1EA` atau terracotta `#D97757`.
   - Gunakan palet deep ocean `#060E1B` dan `#0A1628`.
   - Card radius tidak boleh seragam membulat besar; gunakan radius presisi 4px–8px.
4. **Mobile Usability**:
   - Seluruh touch target minimal 44x44px.
   - Tabel otomatis beralih menjadi stacked card list di layar mobile (< 640px).
