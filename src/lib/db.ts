import Database from 'better-sqlite3';
import path from 'path';

let dbInstance: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!dbInstance) {
    const dbPath = path.resolve(process.cwd(), 'data', 'oceanus.db');
    dbInstance = new Database(dbPath, {
      readonly: true,
      fileMustExist: true,
    });
    dbInstance.pragma('journal_mode = WAL');
  }
  return dbInstance;
}
