import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { STATIC_CACHE_HEADERS } from '@/lib/queries';
import type { RoleDistribution } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = getDb();

    const topGenres = db
      .prepare(`
        SELECT genre_utama, COUNT(*) as count
        FROM kreator
        WHERE genre_utama IS NOT NULL AND genre_utama != ''
        GROUP BY genre_utama
        ORDER BY count DESC
        LIMIT 7
      `)
      .all() as { genre_utama: string; count: number }[];

    if (topGenres.length === 0) {
      return NextResponse.json([], { headers: STATIC_CACHE_HEADERS });
    }

    const genreList = topGenres.map((g) => g.genre_utama);
    const placeholders = genreList.map(() => '?').join(',');

    const rows = db
      .prepare(`
        SELECT
          genre_utama as genre,
          ROUND(AVG(n_performer), 2) as avg_performer,
          ROUND(AVG(n_komposer), 2) as avg_komposer,
          ROUND(AVG(n_lirik), 2) as avg_lirik,
          ROUND(AVG(n_produser), 2) as avg_produser,
          COUNT(*) as total_kreator
        FROM kreator
        WHERE genre_utama IN (${placeholders})
        GROUP BY genre_utama
        ORDER BY total_kreator DESC
      `)
      .all(...genreList) as RoleDistribution[];

    return NextResponse.json(rows, { headers: STATIC_CACHE_HEADERS });
  } catch (err: unknown) {
    console.error('Error in /api/peran:', err);
    return NextResponse.json(
      { error: 'Gagal memuat distribusi peran.' },
      { status: 500 }
    );
  }
}
