import Database from 'better-sqlite3';
import path from 'path';

const globalForDb = globalThis as unknown as {
  __oceanusDb?: Database.Database;
};

export function getDb(): Database.Database {
  if (!globalForDb.__oceanusDb || !globalForDb.__oceanusDb.open) {
    const dbPath = path.resolve(process.cwd(), 'data', 'oceanus.db');
    globalForDb.__oceanusDb = new Database(dbPath, {
      readonly: true,
      fileMustExist: true,
    });
  }
  return globalForDb.__oceanusDb;
}
