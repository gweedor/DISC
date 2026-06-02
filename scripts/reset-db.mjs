// Clears the database so it can be recreated fresh.
// Works for both local files and a remote Turso database.
//   Local:  npm run db:reset
//   Remote: TURSO_DATABASE_URL=... TURSO_AUTH_TOKEN=... npm run db:reset
import { createClient } from '@libsql/client';
import path from 'node:path';

function connection() {
  const remote = process.env.TURSO_DATABASE_URL;
  if (remote && remote.trim()) {
    return { url: remote.trim(), authToken: process.env.TURSO_AUTH_TOKEN };
  }
  const p =
    process.env.DISC_DB_PATH && process.env.DISC_DB_PATH.trim()
      ? process.env.DISC_DB_PATH
      : path.join(process.cwd(), 'data', 'disc.db');
  return { url: `file:${p}` };
}

const db = createClient(connection());
await db.execute('DROP TABLE IF EXISTS employees');
console.log('Database cleared (employees table dropped). Run db:seed to reload sample data.');
