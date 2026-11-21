import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import type { LeaderboardKreator } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const by = searchParams.get('by') || 'notable'; // 'notable' | 'pengaruh' | 'karya'

    let orderBy = 'karya_notable DESC, total_karya DESC';
    if (by === 'pengaruh') {
      orderBy = 'pengaruh_diterima DESC, karya_dirujuk DESC';
    } else if (by === 'karya') {
      orderBy = 'total_karya DESC, karya_notable DESC';
    }

    const db = getDb();
    const rows = db.prepare(`
      SELECT 
        id_kreator,
        nama,
        nama_panggung,
        genre_utama,
        total_karya,
        karya_notable,
        pengaruh_diterima,
        karya_dirujuk,
        thn_pertama,
        thn_terakhir
      FROM kreator
      ORDER BY ${orderBy}
      LIMIT 10
    `).all() as LeaderboardKreator[];

    return NextResponse.json(rows);
  } catch (err: any) {
    console.error('Error in /api/leaderboard:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
