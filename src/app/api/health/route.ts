import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = getDb();
    const row = db.prepare('SELECT COUNT(*) as total FROM kreator').get() as { total: number };

    return NextResponse.json(
      {
        status: 'ok',
        records: row.total,
      },
      {
        status: 200,
        headers: { 'Cache-Control': 'no-store' },
      }
    );
  } catch (err: unknown) {
    console.error('Error in /api/health:', err);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Database tidak dapat diakses.',
      },
      {
        status: 503,
        headers: { 'Cache-Control': 'no-store' },
      }
    );
  }
}
