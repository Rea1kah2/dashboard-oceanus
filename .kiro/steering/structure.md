# Structure Steering: Dashboard Oceanus

## Direktori Proyek

```
dashboard-oceanus/
├── .kiro/
│   ├── steering/
│   │   ├── product.md
│   │   ├── tech.md
│   │   └── structure.md
│   └── specs/
│       └── dashboard/
│           ├── requirements.md
│           ├── design.md
│           └── tasks.md
├── data/
│   ├── Analisis Kreator Musik Oceanus.xlsx
│   └── oceanus.db
├── scripts/
│   └── import.mjs
├── public/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── api/
│   │       ├── stats/route.ts
│   │       ├── kreator/route.ts
│   │       ├── genre/route.ts
│   │       ├── trend/route.ts
│   │       ├── peran/route.ts
│   │       └── leaderboard/route.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── FilterBar.tsx
│   │   ├── sections/
│   │   │   ├── KpiSection.tsx
│   │   │   ├── ChartsSection.tsx
│   │   │   ├── LeaderboardSection.tsx
│   │   │   └── TableSection.tsx
│   │   ├── charts/
│   │   │   ├── GenreBarChart.tsx
│   │   │   ├── TrendAreaChart.tsx
│   │   │   ├── RoleStackedBar.tsx
│   │   │   └── BucketDonut.tsx
│   │   ├── table/
│   │   │   ├── KreatorTable.tsx
│   │   │   └── KreatorCard.tsx
│   │   ├── modal/
│   │   │   └── KreatorModal.tsx
│   │   └── ui/
│   │       ├── StatCard.tsx
│   │       ├── Badge.tsx
│   │       └── Spinner.tsx
│   ├── hooks/
│   │   ├── useFilters.ts
│   │   └── useDebounce.ts
│   └── lib/
│       ├── db.ts
│       └── types.ts
├── package.json
├── tsconfig.json
├── next.config.ts
├── README.md
└── .gitignore
```

## Konvensi Kode
- **Komponen**: PascalCase (`StatCard.tsx`, `GenreBarChart.tsx`)
- **API Routes**: Next.js App router kebab/standard naming (`/api/stats/route.ts`)
- **Klien vs Server**: Tambahkan `'use client';` secara eksplisit pada komponen interaktif (charts, modal, table).
