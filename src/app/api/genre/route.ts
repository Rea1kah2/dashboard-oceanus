import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { STATIC_CACHE_HEADERS } from '@/lib/queries';
import type { GenreDistribution } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = getDb();

    const totalRow = db.prepare('SELECT COUNT(*) as total FROM kreator').get() as { total: number };
    const totalCount = totalRow.total || 1;

    const rows = db
      .prepare(`
        SELECT
          genre_utama as genre,
          COUNT(*) as count
        FROM kreator
        WHERE genre_utama IS NOT NULL AND genre_utama != ''
        GROUP BY genre_utama
        ORDER BY count DESC, genre_utama ASC
      `)
      .all() as { genre: string; count: number }[];

    const result: GenreDistribution[] = rows.map((r) => ({
      genre: r.genre,
      count: r.count,
      percentage: Number(((r.count / totalCount) * 100).toFixed(1)),
    }));

    return NextResponse.json(result, { headers: STATIC_CACHE_HEADERS });
  } catch (err: unknown) {
    console.error('Error in /api/genre:', err);
    return NextResponse.json(
      { error: 'Gagal memuat distribusi genre.' },
      { status: 500 }
    );
  }
}
