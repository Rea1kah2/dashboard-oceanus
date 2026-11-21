# Technical Design: Dashboard Oceanus

## 1. Arsitektur Sistem

```mermaid
graph TB
    subgraph DataLayer ["Data Layer (Embedded SQLite)"]
        XLSX["Analisis Kreator Musik Oceanus.xlsx"] -->|scripts/import.mjs| DB[("oceanus.db (11,361 Rows)")]
        DB --> Client["src/lib/db.ts (better-sqlite3 Singleton)"]
    end

    subgraph APILayer ["Next.js API Route Handlers"]
        Client --> API_STATS["/api/stats"]
        Client --> API_GENRE["/api/genre"]
        Client --> API_TREND["/api/trend"]
        Client --> API_PERAN["/api/peran"]
        Client --> API_LEAD["/api/leaderboard"]
        Client --> API_KREATOR["/api/kreator (Filtered & Paginated)"]
    end

    subgraph UILayer ["Responsive Presentation Layer"]
        API_STATS --> KPI["KpiSection (StatCards)"]
        API_GENRE & API_TREND & API_PERAN --> CHARTS["ChartsSection (Recharts Responsive)"]
        API_LEAD --> LEADER["LeaderboardSection (Top 10)"]
        API_KREATOR --> TABLE["TableSection (TanStack Table / Mobile Cards)"]
        TABLE & LEADER --> MODAL["KreatorModal (Desktop Dialog / Mobile Bottom Sheet)"]
    end
```

## 2. Skema Database SQLite (DDL)

```sql
CREATE TABLE IF NOT EXISTS kreator (
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

-- Indeks performa untuk filter & query analitik
CREATE INDEX IF NOT EXISTS idx_kreator_genre   ON kreator(genre_utama);
CREATE INDEX IF NOT EXISTS idx_kreator_bucket  ON kreator(bucket_karya);
CREATE INDEX IF NOT EXISTS idx_kreator_thn     ON kreator(thn_pertama);
CREATE INDEX IF NOT EXISTS idx_kreator_notable ON kreator(karya_notable DESC);
CREATE INDEX IF NOT EXISTS idx_kreator_karya   ON kreator(total_karya DESC);
CREATE INDEX IF NOT EXISTS idx_kreator_nama    ON kreator(nama COLLATE NOCASE);
```

## 3. Sequence Diagram Interaksi Filter & Detail Modal

```mermaid
sequenceDiagram
    autonumber
    actor User as Pengguna / Presenter
    participant Chart as GenreBarChart
    participant State as useFilters Store
    participant API as /api/kreator
    participant Table as KreatorTable
    participant Modal as KreatorModal

    User->>Chart: Klik bar 'Dream Pop'
    Chart->>State: setSelectedGenre('Dream Pop')
    State->>API: GET /api/kreator?genre=Dream+Pop&page=1
    API-->>Table: Response JSON (Data, Total, Pages)
    Table-->>User: Tampilkan baris tersaring + Badge aktif
    User->>Table: Klik baris kreator 'Jay Walters'
    Table->>Modal: Open modal with kreator data
    Modal-->>User: Tampilkan dialog/bottom-sheet profil mendalam
```

## 4. Format Kontrak API
- `/api/stats`: `{ total_kreator, avg_total_karya, genre_terbanyak, genre_terbanyak_count, kreator_elite, thn_range, dekade_puncak }`
- `/api/genre`: Array of `{ genre: string, count: number }` (27 items)
- `/api/trend`: Array of `{ dekade: number, label: string, count: number }`
- `/api/peran`: Array of `{ genre: string, performer: number, komposer: number, lirik: number, produser: number }` (Top 7)
- `/api/leaderboard?by=notable|pengaruh|karya`: Array of top 10 `{ id_kreator, nama, nama_panggung, genre_utama, total_karya, karya_notable, pengaruh_diterima, thn_pertama, thn_terakhir }`
- `/api/kreator`: `{ data: Kreator[], total: number, page: number, limit: number, pages: number }`
