import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import type { Style } from './content/questions';
import type { AnswerSelection, Scores, Confidence } from './scoring';

// --- Connection (singleton across hot reloads in dev) ------------------------

function resolveDbPath(): string {
  const envPath = process.env.DISC_DB_PATH;
  const p = envPath && envPath.trim().length > 0 ? envPath : path.join(process.cwd(), 'data', 'disc.db');
  const dir = path.dirname(p);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return p;
}

declare global {
  // eslint-disable-next-line no-var
  var __discDb: Database.Database | undefined;
}

export function getDb(): Database.Database {
  if (global.__discDb) return global.__discDb;
  const db = new Database(resolveDbPath());
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  migrate(db);
  global.__discDb = db;
  return db;
}

function migrate(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS employees (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      name            TEXT    NOT NULL,
      department      TEXT    NOT NULL,
      role            TEXT    NOT NULL,
      email           TEXT,
      language        TEXT    NOT NULL DEFAULT 'en',
      answers_json    TEXT    NOT NULL,
      scores_json     TEXT    NOT NULL,
      least_json      TEXT    NOT NULL DEFAULT '{}',
      primary_style   TEXT    NOT NULL,
      secondary_style TEXT    NOT NULL,
      blend           TEXT    NOT NULL,
      confidence      TEXT    NOT NULL,
      handout_generated INTEGER NOT NULL DEFAULT 0,
      admin_notes     TEXT,
      completed_at    TEXT    NOT NULL
    );
  `);
}

// --- Types -------------------------------------------------------------------

export interface EmployeeRow {
  id: number;
  name: string;
  department: string;
  role: string;
  email: string | null;
  language: 'en' | 'vi';
  answers_json: string;
  scores_json: string;
  least_json: string;
  primary_style: Style;
  secondary_style: Style;
  blend: string;
  confidence: Confidence;
  handout_generated: number;
  admin_notes: string | null;
  completed_at: string;
}

export interface Employee {
  id: number;
  name: string;
  department: string;
  role: string;
  email: string | null;
  language: 'en' | 'vi';
  answers: AnswerSelection[];
  scores: Scores;
  leastCounts: Scores;
  primary: Style;
  secondary: Style;
  blend: string;
  confidence: Confidence;
  handoutGenerated: boolean;
  adminNotes: string | null;
  completedAt: string;
}

function rowToEmployee(r: EmployeeRow): Employee {
  return {
    id: r.id,
    name: r.name,
    department: r.department,
    role: r.role,
    email: r.email,
    language: r.language,
    answers: JSON.parse(r.answers_json) as AnswerSelection[],
    scores: JSON.parse(r.scores_json) as Scores,
    leastCounts: JSON.parse(r.least_json || '{}') as Scores,
    primary: r.primary_style,
    secondary: r.secondary_style,
    blend: r.blend,
    confidence: r.confidence,
    handoutGenerated: !!r.handout_generated,
    adminNotes: r.admin_notes,
    completedAt: r.completed_at,
  };
}

// --- Queries -----------------------------------------------------------------

export interface NewEmployee {
  name: string;
  department: string;
  role: string;
  email?: string | null;
  language: 'en' | 'vi';
  answers: AnswerSelection[];
  scores: Scores;
  leastCounts: Scores;
  primary: Style;
  secondary: Style;
  blend: string;
  confidence: Confidence;
}

export function insertEmployee(e: NewEmployee): number {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO employees
      (name, department, role, email, language, answers_json, scores_json, least_json,
       primary_style, secondary_style, blend, confidence, completed_at)
    VALUES
      (@name, @department, @role, @email, @language, @answers_json, @scores_json, @least_json,
       @primary_style, @secondary_style, @blend, @confidence, @completed_at)
  `);
  const info = stmt.run({
    name: e.name,
    department: e.department,
    role: e.role,
    email: e.email ?? null,
    language: e.language,
    answers_json: JSON.stringify(e.answers),
    scores_json: JSON.stringify(e.scores),
    least_json: JSON.stringify(e.leastCounts),
    primary_style: e.primary,
    secondary_style: e.secondary,
    blend: e.blend,
    confidence: e.confidence,
    completed_at: new Date().toISOString(),
  });
  return Number(info.lastInsertRowid);
}

export function listEmployees(): Employee[] {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM employees ORDER BY completed_at DESC').all() as EmployeeRow[];
  return rows.map(rowToEmployee);
}

export function getEmployee(id: number): Employee | null {
  const db = getDb();
  const row = db.prepare('SELECT * FROM employees WHERE id = ?').get(id) as EmployeeRow | undefined;
  return row ? rowToEmployee(row) : null;
}

export function markHandoutGenerated(id: number, value = true): void {
  const db = getDb();
  db.prepare('UPDATE employees SET handout_generated = ? WHERE id = ?').run(value ? 1 : 0, id);
}

export function updateAdminNotes(id: number, notes: string): void {
  const db = getDb();
  db.prepare('UPDATE employees SET admin_notes = ? WHERE id = ?').run(notes, id);
}

export function deleteEmployee(id: number): void {
  const db = getDb();
  db.prepare('DELETE FROM employees WHERE id = ?').run(id);
}

export function countEmployees(): number {
  const db = getDb();
  const row = db.prepare('SELECT COUNT(*) AS n FROM employees').get() as { n: number };
  return row.n;
}
