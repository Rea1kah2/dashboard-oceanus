import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import {
  buildKreatorWhereClause,
  resolveSort,
  toKreatorCsv,
} from '@/lib/queries';
import type { Kreator } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const { sortCol, sortDir } = resolveSort(
      searchParams.get('sort'),
      searchParams.get('dir')
    );

    const { whereClause, sqlParams } = buildKreatorWhereClause({
      genre: searchParams.get('genre') || '',
      bucket: searchParams.get('bucket') || '',
      peran: searchParams.get('peran') || '',
      search: searchParams.get('search') || '',
    });

    const db = getDb();
    const rows = db
      .prepare(`
        SELECT *
        FROM kreator
        ${whereClause}
        ORDER BY ${sortCol} ${sortDir}, id_kreator ASC
      `)
      .all(...sqlParams) as Kreator[];

    const csv = toKreatorCsv(rows);

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="kreator-oceanus.csv"',
        'Cache-Control': 'no-store',
        'X-Export-Count': String(rows.length),
      },
    });
  } catch (err: unknown) {
    console.error('Error in /api/kreator/export:', err);
    return NextResponse.json(
      { error: 'Gagal mengekspor data kreator.' },
      { status: 500 }
    );
  }
}
