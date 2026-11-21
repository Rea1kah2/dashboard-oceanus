import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import type { TrendDecade } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = getDb();

    const rows = db.prepare(`
      SELECT 
        (thn_pertama / 10) * 10 as dekade,
        COUNT(*) as count
      FROM kreator
      WHERE thn_pertama IS NOT NULL
      GROUP BY dekade
      ORDER BY dekade ASC
    `).all() as { dekade: number; count: number }[];

    const result: TrendDecade[] = rows.map((r) => ({
      dekade: r.dekade,
      label: `${r.dekade}s`,
      count: r.count,
    }));

    return NextResponse.json(result);
  } catch (err: any) {
    console.error('Error in /api/trend:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
