// Deletes the local SQLite database so it can be recreated fresh.
// Usage: npm run db:reset   (then npm run db:seed to reload sample data)
import fs from 'node:fs';
import path from 'node:path';

const dbPath =
  process.env.DISC_DB_PATH && process.env.DISC_DB_PATH.trim()
    ? process.env.DISC_DB_PATH
    : path.join(process.cwd(), 'data', 'disc.db');

const suffixes = ['', '-journal', '-wal', '-shm'];
let removed = 0;
for (const s of suffixes) {
  const f = dbPath + s;
  if (fs.existsSync(f)) {
    fs.rmSync(f);
    removed++;
  }
}

console.log(removed ? `Removed database files at ${dbPath}` : `No database found at ${dbPath} (nothing to reset).`);
