import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { STATIC_CACHE_HEADERS } from '@/lib/queries';
import type { LeaderboardKreator } from '@/lib/types';

export const dynamic = 'force-dynamic';

const ORDER_BY_MAP: Record<string, string> = {
  notable: 'karya_notable DESC, total_karya DESC, id_kreator ASC',
  pengaruh: 'pengaruh_diterima DESC, karya_dirujuk DESC, id_kreator ASC',
  karya: 'total_karya DESC, karya_notable DESC, id_kreator ASC',
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const by = searchParams.get('by') || 'notable';
    const orderBy = ORDER_BY_MAP[by] || ORDER_BY_MAP.notable;

    const db = getDb();
    const rows = db
      .prepare(`
        SELECT *
        FROM kreator
        ORDER BY ${orderBy}
        LIMIT 10
      `)
      .all() as LeaderboardKreator[];

    return NextResponse.json(rows, { headers: STATIC_CACHE_HEADERS });
  } catch (err: unknown) {
    console.error('Error in /api/leaderboard:', err);
    return NextResponse.json(
      { error: 'Gagal memuat leaderboard kreator.' },
      { status: 500 }
    );
  }
}
