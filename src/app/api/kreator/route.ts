import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import {
  buildKreatorWhereClause,
  parseSafeInt,
  resolveSort,
  STATIC_CACHE_HEADERS,
} from '@/lib/queries';
import type { Kreator, PaginatedKreatorResponse } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseSafeInt(searchParams.get('page'), 1, 1, 10000);
    const limit = parseSafeInt(searchParams.get('limit'), 20, 10, 100);
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

    const countQuery = `SELECT COUNT(*) as total FROM kreator ${whereClause}`;
    const countRow = db.prepare(countQuery).get(...sqlParams) as { total: number };
    const total = countRow.total || 0;
    const pages = total > 0 ? Math.ceil(total / limit) : 0;
    const safePage = pages > 0 ? Math.min(page, pages) : 1;

    const offset = (safePage - 1) * limit;
    const dataQuery = `
      SELECT *
      FROM kreator
      ${whereClause}
      ORDER BY ${sortCol} ${sortDir}, id_kreator ASC
      LIMIT ? OFFSET ?
    `;

    const data = db.prepare(dataQuery).all(...sqlParams, limit, offset) as Kreator[];

    const response: PaginatedKreatorResponse = {
      data,
      total,
      page: safePage,
      limit,
      pages,
    };

    return NextResponse.json(response, { headers: STATIC_CACHE_HEADERS });
  } catch (err: unknown) {
    console.error('Error in /api/kreator:', err);
    return NextResponse.json(
      { error: 'Gagal memuat daftar kreator.' },
      { status: 500 }
    );
  }
}
