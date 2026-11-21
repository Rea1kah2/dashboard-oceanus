import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import type { PaginatedKreatorResponse, Kreator } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(10, parseInt(searchParams.get('limit') || '20', 10)));
    const genre = searchParams.get('genre') || '';
    const bucket = searchParams.get('bucket') || '';
    const peran = searchParams.get('peran') || '';
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || 'total_karya';
    const dir = (searchParams.get('dir') || 'desc').toLowerCase() === 'asc' ? 'ASC' : 'DESC';

    const allowedSortCols: Record<string, string> = {
      nama: 'nama',
      genre_utama: 'genre_utama',
      total_karya: 'total_karya',
      karya_notable: 'karya_notable',
      pengaruh_diterima: 'pengaruh_diterima',
      karya_dirujuk: 'karya_dirujuk',
      thn_pertama: 'thn_pertama',
      n_peran: 'n_peran',
    };

    const sortCol = allowedSortCols[sort] || 'total_karya';

    const conditions: string[] = [];
    const params: (string | number)[] = [];

    if (genre) {
      conditions.push('genre_utama = ?');
      params.push(genre);
    }

    if (bucket) {
      conditions.push('bucket_karya = ?');
      params.push(bucket);
    }

    if (peran) {
      const pNum = parseInt(peran, 10);
      if (!isNaN(pNum)) {
        conditions.push('n_peran = ?');
        params.push(pNum);
      }
    }

    if (search) {
      conditions.push('(nama LIKE ? OR nama_panggung LIKE ?)');
      params.push(`%${search}%`, `%${search}%`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const db = getDb();

    // Hitung total
    const countQuery = `SELECT COUNT(*) as total FROM kreator ${whereClause}`;
    const countRow = db.prepare(countQuery).get(...params) as { total: number };
    const total = countRow.total || 0;
    const pages = Math.ceil(total / limit);

    // Ambil data paginasi
    const offset = (page - 1) * limit;
    const dataQuery = `
      SELECT *
      FROM kreator
      ${whereClause}
      ORDER BY ${sortCol} ${dir}
      LIMIT ? OFFSET ?
    `;

    const data = db.prepare(dataQuery).all(...params, limit, offset) as Kreator[];

    const response: PaginatedKreatorResponse = {
      data,
      total,
      page,
      limit,
      pages,
    };

    return NextResponse.json(response);
  } catch (err: any) {
    console.error('Error in /api/kreator:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
