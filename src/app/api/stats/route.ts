import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { STATIC_CACHE_HEADERS } from '@/lib/queries';
import type { BucketDistribution, StatsResponse } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = getDb();

    const totalRow = db
      .prepare('SELECT COUNT(*) as total, SUM(total_karya) as total_karya FROM kreator')
      .get() as { total: number; total_karya: number | null };
    const totalCount = totalRow.total || 0;
    const denominator = totalCount || 1;

    const avgRow = db
      .prepare('SELECT ROUND(AVG(total_karya), 2) as avg_karya FROM kreator')
      .get() as { avg_karya: number | null };

    const topGenreRow = db
      .prepare(`
        SELECT genre_utama, COUNT(*) as count
        FROM kreator
        WHERE genre_utama IS NOT NULL AND genre_utama != ''
        GROUP BY genre_utama
        ORDER BY count DESC
        LIMIT 1
      `)
      .get() as { genre_utama: string; count: number } | undefined;

    const eliteRow = db
      .prepare(`
        SELECT COUNT(*) as count
        FROM kreator
        WHERE bucket_karya = '10+'
      `)
      .get() as { count: number };

    const yearRow = db
      .prepare(`
        SELECT MIN(thn_pertama) as min_thn, MAX(thn_terakhir) as max_thn
        FROM kreator
      `)
      .get() as { min_thn: number | null; max_thn: number | null };

    const decadeRow = db
      .prepare(`
        SELECT (thn_pertama / 10) * 10 as decade, COUNT(*) as count
        FROM kreator
        WHERE thn_pertama IS NOT NULL
        GROUP BY decade
        ORDER BY count DESC
        LIMIT 1
      `)
      .get() as { decade: number; count: number } | undefined;

    const bucketRows = db
      .prepare(`
        SELECT bucket_karya as bucket, COUNT(*) as count
        FROM kreator
        GROUP BY bucket_karya
        ORDER BY CASE bucket_karya
          WHEN '1' THEN 1
          WHEN '2-3' THEN 2
          WHEN '4-9' THEN 3
          WHEN '10+' THEN 4
          WHEN '0' THEN 5
          ELSE 6
        END
      `)
      .all() as { bucket: string; count: number }[];

    const buckets: BucketDistribution[] = bucketRows.map((b) => {
      const ratio = (b.count / denominator) * 100;
      return {
        bucket: b.bucket,
        count: b.count,
        percentage: Number(ratio.toFixed(ratio < 0.1 ? 2 : 1)),
      };
    });

    const stats: StatsResponse = {
      total_kreator: totalCount,
      total_karya_all: totalRow.total_karya || 0,
      avg_total_karya: avgRow.avg_karya || 0,
      genre_terbanyak: topGenreRow?.genre_utama || 'N/A',
      genre_terbanyak_count: topGenreRow?.count || 0,
      kreator_elite: eliteRow.count || 0,
      thn_pertama_min: yearRow.min_thn || 1975,
      thn_terakhir_max: yearRow.max_thn || 2040,
      dekade_puncak: decadeRow ? `${decadeRow.decade}s` : '2020s',
      dekade_puncak_count: decadeRow?.count || 0,
      buckets,
    };

    return NextResponse.json(stats, { headers: STATIC_CACHE_HEADERS });
  } catch (err: unknown) {
    console.error('Error in /api/stats:', err);
    return NextResponse.json(
      { error: 'Gagal memuat ringkasan statistik.' },
      { status: 500 }
    );
  }
}
