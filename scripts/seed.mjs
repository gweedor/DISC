// Seeds the database with 25 sample employees for testing/demo.
//   Local:  npm run db:seed
//   Remote: TURSO_DATABASE_URL=... TURSO_AUTH_TOKEN=... npm run db:seed
//
// Scoring here mirrors src/lib/scoring.ts: each "most like me" pick adds 1
// point to that style; "least" picks are a tiebreaker only.
import { createClient } from '@libsql/client';
import path from 'node:path';

const STYLE_ORDER = ['D', 'I', 'S', 'C'];
const NUM_QUESTIONS = 28;

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

// Keep this schema in sync with SCHEMA in src/lib/db.ts
await db.execute(`
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

// Deterministic RNG so the sample set is reproducible.
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rng = mulberry32(42);

function weightedPick(weights) {
  const total = STYLE_ORDER.reduce((a, s) => a + weights[s], 0);
  let r = rng() * total;
  for (const s of STYLE_ORDER) {
    r -= weights[s];
    if (r <= 0) return s;
  }
  return STYLE_ORDER[STYLE_ORDER.length - 1];
}

function buildAnswers(target) {
  const mostW = { D: 1, I: 1, S: 1, C: 1 };
  mostW[target] = 4.5;
  const answers = [];
  const scores = { D: 0, I: 0, S: 0, C: 0 };
  const least = { D: 0, I: 0, S: 0, C: 0 };

  for (let q = 1; q <= NUM_QUESTIONS; q++) {
    const most = weightedPick(mostW);
    let leastStyle = null;
    if (rng() < 0.7) {
      const candidates = STYLE_ORDER.filter((s) => s !== most);
      leastStyle = candidates[Math.floor(rng() * candidates.length)];
    }
    answers.push({ questionId: q, most, least: leastStyle });
    scores[most] += 1;
    if (leastStyle) least[leastStyle] += 1;
  }
  return { answers, scores, least };
}

function rank(scores, least) {
  return [...STYLE_ORDER].sort((a, b) => {
    if (scores[b] !== scores[a]) return scores[b] - scores[a];
    if (least[a] !== least[b]) return least[a] - least[b];
    return STYLE_ORDER.indexOf(a) - STYLE_ORDER.indexOf(b);
  });
}

const PEOPLE = [
  ['Nguyễn Văn An', 'Engineering', 'Software Engineer', 'D'],
  ['Trần Thị Bích', 'Marketing', 'Marketing Executive', 'I'],
  ['Lê Hoàng Long', 'Operations', 'Operations Lead', 'D'],
  ['Phạm Minh Tuấn', 'Engineering', 'Senior Developer', 'C'],
  ['Hoàng Thị Mai', 'Customer Support', 'Support Specialist', 'S'],
  ['Vũ Đức Anh', 'Sales', 'Account Manager', 'I'],
  ['Đặng Thu Hà', 'HR', 'HR Officer', 'S'],
  ['Bùi Quang Huy', 'Engineering', 'QA Engineer', 'C'],
  ['Đỗ Thị Lan', 'Finance', 'Accountant', 'C'],
  ['Ngô Bảo Châu', 'Product', 'Product Manager', 'D'],
  ['Dương Văn Khánh', 'Sales', 'Sales Lead', 'D'],
  ['Lý Thị Hương', 'Marketing', 'Content Lead', 'I'],
  ['Phan Thanh Sơn', 'Operations', 'Logistics Coordinator', 'S'],
  ['Võ Thị Ngọc', 'Customer Support', 'Support Team Lead', 'S'],
  ['Đinh Công Danh', 'Engineering', 'DevOps Engineer', 'C'],
  ['Trịnh Thị Thu', 'Finance', 'Finance Manager', 'C'],
  ['Mai Văn Hậu', 'Sales', 'Sales Executive', 'I'],
  ['Cao Thị Hồng', 'HR', 'Recruiter', 'I'],
  ['Tạ Quốc Bảo', 'Product', 'UX Designer', 'S'],
  ['Lưu Thị Trang', 'Marketing', 'Brand Manager', 'D'],
  ['Hồ Minh Quân', 'Engineering', 'Engineering Manager', 'D'],
  ['Đào Thị Yến', 'Operations', 'Office Manager', 'S'],
  ['Chu Văn Nam', 'Customer Support', 'Support Specialist', 'C'],
  ['Nguyễn Thị Hằng', 'Finance', 'Financial Analyst', 'C'],
  ['Trần Đức Thắng', 'Product', 'Product Owner', 'I'],
];

const baseTime = Date.now() - 1000 * 60 * 60 * 24 * 2; // 2 days ago
const statements = [];

PEOPLE.forEach(([name, department, role, target], i) => {
  const { answers, scores, least } = buildAnswers(target);
  const ranking = rank(scores, least);
  const primary = ranking[0];
  const secondary = ranking[1];
  const gap = scores[primary] - scores[secondary];
  const confidence = gap >= 3 ? 'High' : gap >= 1 ? 'Medium' : 'Balanced';
  const slug = name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .replace(/[^a-z]+/g, '.')
    .replace(/^\.|\.$/g, '');

  statements.push({
    sql: `INSERT INTO employees
      (name, department, role, email, language, answers_json, scores_json, least_json,
       primary_style, secondary_style, blend, confidence, handout_generated, completed_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      name,
      department,
      role,
      `${slug}@example.com`,
      i % 3 === 0 ? 'vi' : 'en',
      JSON.stringify(answers),
      JSON.stringify(scores),
      JSON.stringify(least),
      primary,
      secondary,
      `${primary}/${secondary}`,
      confidence,
      0,
      new Date(baseTime + i * 1000 * 60 * 37).toISOString(),
    ],
  });
});

await db.batch(statements, 'write');

const res = await db.execute('SELECT COUNT(*) AS n FROM employees');
console.log(`Seeded ${PEOPLE.length} sample employees. Total in database: ${Number(res.rows[0].n)}.`);
