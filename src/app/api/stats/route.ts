import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import type { StatsResponse } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = getDb();

    const totalRow = db.prepare('SELECT COUNT(*) as total, SUM(total_karya) as total_karya FROM kreator').get() as { total: number; total_karya: number };
    const avgRow = db.prepare('SELECT ROUND(AVG(total_karya), 2) as avg_karya FROM kreator').get() as { avg_karya: number };
    const topGenreRow = db.prepare(`
      SELECT genre_utama, COUNT(*) as count 
      FROM kreator 
      GROUP BY genre_utama 
      ORDER BY count DESC 
      LIMIT 1
    `).get() as { genre_utama: string; count: number };
    
    const eliteRow = db.prepare(`
      SELECT COUNT(*) as count 
      FROM kreator 
      WHERE bucket_karya = '10+'
    `).get() as { count: number };

    const yearRow = db.prepare(`
      SELECT MIN(thn_pertama) as min_thn, MAX(thn_terakhir) as max_thn 
      FROM kreator
    `).get() as { min_thn: number; max_thn: number };

    const decadeRow = db.prepare(`
      SELECT (thn_pertama / 10) * 10 as decade, COUNT(*) as count
      FROM kreator
      WHERE thn_pertama IS NOT NULL
      GROUP BY decade
      ORDER BY count DESC
      LIMIT 1
    `).get() as { decade: number; count: number };

    const stats: StatsResponse = {
      total_kreator: totalRow.total || 0,
      total_karya_all: totalRow.total_karya || 0,
      avg_total_karya: avgRow.avg_karya || 0,
      genre_terbanyak: topGenreRow?.genre_utama || 'N/A',
      genre_terbanyak_count: topGenreRow?.count || 0,
      kreator_elite: eliteRow.count || 0,
      thn_pertama_min: yearRow.min_thn || 1975,
      thn_terakhir_max: yearRow.max_thn || 2040,
      dekade_puncak: decadeRow ? `${decadeRow.decade}s` : '2020s',
    };

    return NextResponse.json(stats);
  } catch (err: any) {
    console.error('Error in /api/stats:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
