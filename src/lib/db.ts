import { createClient, type Client } from '@libsql/client';
import fs from 'node:fs';
import path from 'node:path';
import type { Style } from './content/questions';
import type { AnswerSelection, Scores, Confidence } from './scoring';

// --- Connection --------------------------------------------------------------
//
// Storage uses libSQL (SQLite-compatible). It works two ways with the SAME code:
//   - Locally: a file on disk (no setup).
//   - In production (Vercel / serverless): a hosted Turso database, set via
//     TURSO_DATABASE_URL + TURSO_AUTH_TOKEN.

function resolveConnection(): { url: string; authToken?: string } {
  const remote = process.env.TURSO_DATABASE_URL;
  if (remote && remote.trim()) {
    return { url: remote.trim(), authToken: process.env.TURSO_AUTH_TOKEN };
  }
  // Local file fallback.
  const envPath = process.env.DISC_DB_PATH;
  const p = envPath && envPath.trim().length > 0 ? envPath : path.join(process.cwd(), 'data', 'disc.db');
  const dir = path.dirname(p);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return { url: `file:${p}` };
}

declare global {
  // eslint-disable-next-line no-var
  var __discClient: Client | undefined;
  // eslint-disable-next-line no-var
  var __discReady: Promise<void> | undefined;
}

function client(): Client {
  if (!global.__discClient) {
    global.__discClient = createClient(resolveConnection());
  }
  return global.__discClient;
}

const SCHEMA = `
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
    completed_at    TEXT    NOT NULL,
    method          TEXT    NOT NULL DEFAULT 'questionnaire',
    rationale       TEXT,
    transcript_json TEXT
  );
`;

// Columns added after the initial release; applied to pre-existing databases.
const MIGRATIONS = [
  `ALTER TABLE employees ADD COLUMN method TEXT NOT NULL DEFAULT 'questionnaire'`,
  `ALTER TABLE employees ADD COLUMN rationale TEXT`,
  `ALTER TABLE employees ADD COLUMN transcript_json TEXT`,
];

async function ready(): Promise<Client> {
  const c = client();
  if (!global.__discReady) {
    global.__discReady = (async () => {
      await c.execute(SCHEMA);
      for (const m of MIGRATIONS) {
        try {
          await c.execute(m);
        } catch {
          // column already exists — ignore
        }
      }
    })();
  }
  await global.__discReady;
  return c;
}

// --- Types -------------------------------------------------------------------

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
  method: 'questionnaire' | 'conversation';
  rationale: string | null;
  transcript: { role: 'user' | 'assistant'; content: string }[] | null;
}

type Row = Record<string, unknown>;

function rowToEmployee(r: Row): Employee {
  return {
    id: Number(r.id),
    name: String(r.name),
    department: String(r.department),
    role: String(r.role),
    email: r.email != null ? String(r.email) : null,
    language: r.language === 'vi' ? 'vi' : 'en',
    answers: JSON.parse(String(r.answers_json)) as AnswerSelection[],
    scores: JSON.parse(String(r.scores_json)) as Scores,
    leastCounts: JSON.parse(String(r.least_json || '{}')) as Scores,
    primary: String(r.primary_style) as Style,
    secondary: String(r.secondary_style) as Style,
    blend: String(r.blend),
    confidence: String(r.confidence) as Confidence,
    handoutGenerated: Number(r.handout_generated) !== 0,
    adminNotes: r.admin_notes != null ? String(r.admin_notes) : null,
    completedAt: String(r.completed_at),
    method: r.method === 'conversation' ? 'conversation' : 'questionnaire',
    rationale: r.rationale != null ? String(r.rationale) : null,
    transcript: r.transcript_json != null ? JSON.parse(String(r.transcript_json)) : null,
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
  method?: 'questionnaire' | 'conversation';
  rationale?: string | null;
  transcript?: { role: 'user' | 'assistant'; content: string }[] | null;
}

export async function insertEmployee(e: NewEmployee): Promise<number> {
  const c = await ready();
  const res = await c.execute({
    sql: `INSERT INTO employees
      (name, department, role, email, language, answers_json, scores_json, least_json,
       primary_style, secondary_style, blend, confidence, completed_at, method, rationale, transcript_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      e.name,
      e.department,
      e.role,
      e.email ?? null,
      e.language,
      JSON.stringify(e.answers),
      JSON.stringify(e.scores),
      JSON.stringify(e.leastCounts),
      e.primary,
      e.secondary,
      e.blend,
      e.confidence,
      new Date().toISOString(),
      e.method ?? 'questionnaire',
      e.rationale ?? null,
      e.transcript ? JSON.stringify(e.transcript) : null,
    ],
  });
  return Number(res.lastInsertRowid ?? 0);
}

export async function listEmployees(): Promise<Employee[]> {
  const c = await ready();
  const res = await c.execute('SELECT * FROM employees ORDER BY completed_at DESC');
  return res.rows.map((r) => rowToEmployee(r as Row));
}

export async function getEmployee(id: number): Promise<Employee | null> {
  const c = await ready();
  const res = await c.execute({ sql: 'SELECT * FROM employees WHERE id = ?', args: [id] });
  const row = res.rows[0];
  return row ? rowToEmployee(row as Row) : null;
}

export async function markHandoutGenerated(id: number, value = true): Promise<void> {
  const c = await ready();
  await c.execute({
    sql: 'UPDATE employees SET handout_generated = ? WHERE id = ?',
    args: [value ? 1 : 0, id],
  });
}

export async function updateAdminNotes(id: number, notes: string): Promise<void> {
  const c = await ready();
  await c.execute({ sql: 'UPDATE employees SET admin_notes = ? WHERE id = ?', args: [notes, id] });
}

export async function deleteEmployee(id: number): Promise<void> {
  const c = await ready();
  await c.execute({ sql: 'DELETE FROM employees WHERE id = ?', args: [id] });
}

export async function countEmployees(): Promise<number> {
  const c = await ready();
  const res = await c.execute('SELECT COUNT(*) AS n FROM employees');
  return Number((res.rows[0] as Row).n);
}
