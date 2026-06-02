# Team Communication Assessment (DISC-style)

A simple internal web app for our **Vietnam team-building event**. Employees
complete a short, DISC-style behavioural questionnaire before the event. Results
are stored privately for the admin/organiser team, who can review individual and
team-level summaries, generate balanced game teams, print employee handouts, and
follow a facilitator guide for the games (including the **Blind Builder LEGO
Challenge**).

> **This is not an official or licensed DISC assessment.** It is a *“DISC-style
> team communication assessment”* for internal team-building only. The goal is
> better communication and teamwork — not clinical accuracy, performance review,
> or HR evaluation.

---

## Why a questionnaire (and not a chatbot)?

The brief asked us to compare two approaches. We chose **Option 1: a structured,
forced-choice questionnaire** as the official scoring method, because it is:

- **Consistent & fair** — everyone answers the same 28 questions; scoring is
  transparent (1 point per choice) and easy to explain.
- **Comparable** — results line up cleanly across employees and teams, which is
  exactly what we need to build balanced game teams and team reports.
- **Simple to build, translate, and maintain** — no AI model integration, prompt
  engineering, moderation, or scoring variability to manage.
- **Bilingual-friendly** — every question and result is pre-translated into
  English and Vietnamese.

An **AI chatbot (Option 2)** is more engaging but introduces scoring variability,
moderation needs, and translation/reporting complexity that work against the
fairness this event needs. It’s a good *future enhancement* — e.g. an optional
follow-up chat that adds colour after the questionnaire — but the **official
score should always come from the questionnaire**. This app is built so that
enhancement can be added later without changing how scoring works.

---

## Tech stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** for a clean, mobile-friendly UI
- **libSQL** (SQLite-compatible) — a local file in dev, a free **Turso**
  database in production (works on Vercel and other serverless hosts)
- **CSV export** built-in; **handouts/reports print to PDF** via the browser
  (print-friendly HTML — no extra PDF library needed)

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Configure secrets (optional but recommended)
cp .env.example .env.local
#   then edit ADMIN_PASSWORD and ADMIN_SESSION_SECRET

# 3. Load 25 sample employees (optional, great for a demo)
npm run db:seed

# 4. Run the app
npm run dev
#   open http://localhost:3000
```

The SQLite database is created automatically at `./data/disc.db` on first use.

### Environment variables

| Variable                | Default               | Purpose                                  |
| ----------------------- | --------------------- | ---------------------------------------- |
| `ADMIN_PASSWORD`        | `disc-admin-2026`     | Password for the admin dashboard         |
| `ADMIN_SESSION_SECRET`  | `disc-dev-secret-...` | Signs the admin session cookie           |
| `DISC_DB_PATH`          | `./data/disc.db`      | Local SQLite file location (dev)         |
| `TURSO_DATABASE_URL`    | _(unset)_             | Hosted Turso DB URL for production        |
| `TURSO_AUTH_TOKEN`      | _(unset)_             | Turso auth token (with the URL above)     |

> ⚠️ **Change `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` before the event.**

---

## How it’s used

### Employees (mobile-friendly)
1. Open the landing page and pick **English** or **Tiếng Việt**.
2. Read the privacy note & instructions, then enter name / department / role /
   (optional) email.
3. Answer 28 forced-choice questions — pick the option **most like you**, and
   optionally the one **least like you**.
4. Submit → see a **thank-you message**. *Employees do not see their result.*

### Admin / Event organiser (desktop-first)
Go to **`/admin`** and sign in with the admin password.

- **Dashboard** — all completions, searchable/filterable by name, department,
  role, and style; full D/I/S/C score breakdown; CSV export.
- **Employee result** — full DISC-style profile, private admin notes, links to
  print the handout (EN/VI).
- **Team Report** — style distribution, blends, team strengths/risks,
  communication/leadership/problem-solving patterns, quality risks, discussion
  topics, and recommended game pairings.
- **Team Assignments** — auto-generate balanced, mixed-style teams (default
  25 people → 5 teams of 5) with suggested Blind Builder roles. Regenerate or
  change the number of teams.
- **Facilitator Guide** — how to run the event and debrief, plus full details
  for each game including the Blind Builder LEGO Challenge.
- **Handouts & Export** — print one handout, the **full set** (one per page), or
  export CSV.

---

## Scoring (transparent by design)

- Each **“most like me”** pick adds **1 point** to that style (D, I, S, or C).
- **“Least like me”** is optional and used only as a **tiebreaker**.
- **Primary** = highest score, **Secondary** = second highest, **Blend** = e.g.
  `D/C`.
- **Confidence**: *High* if primary beats secondary by 3+, *Medium* by 1–2,
  *Balanced* if they’re tied (two or more styles close together).

The four styles:

| | Style | English | Vietnamese |
|---|---|---|---|
| **D** | Direct / Decisive | Action-oriented | Quyết đoán / Hành động nhanh |
| **I** | Social / Energising | Connecting | Giao tiếp / Tạo năng lượng |
| **S** | Steady / Supportive | Supportive | Ổn định / Hỗ trợ |
| **C** | Careful / Detail-focused | Quality-focused | Cẩn thận / Chú ý chi tiết |

---

## Common tasks

### Reset the database
```bash
npm run db:reset      # delete the local DB
npm run db:seed       # reload the 25 sample employees
# or do both at once:
npm run db:reseed
```

### Export results
- **CSV:** Admin → Dashboard (or Handouts & Export) → **Export CSV**, or hit
  `/api/admin/export` while logged in. Includes a UTF-8 BOM so Vietnamese names
  open correctly in Excel.

### Print handouts (give them out at the event)
- **One handout:** Employee result page → **Handout (EN)** / **Handout (VI)** →
  **Print / Save as PDF**.
- **All handouts:** Handouts & Export → **Open print view** (EN or VI) →
  **Print all / Save as PDF**. Each handout prints on its own page.
- Use the browser’s “Save as PDF” option to produce a PDF file.

### Generate game teams
- Admin → **Team Assignments**. Set the number of teams and click
  **Generate / Regenerate**. Teams are balanced to mix D/I/S/C and avoid
  stacking all-D or all-C together. Suggested Blind Builder roles are filled in
  automatically; adjust manually as you like.

---

## Editing the content

Everything is plain, editable data:

- **Questions:** `src/lib/content/questions.ts` (28 questions, EN + VI, each with
  four answers mapped to D/I/S/C). Keep exactly four answers — one per style.
- **Result/handout copy:** `src/lib/content/styles.ts` (per-style summaries,
  strengths, blind spots, handout sections — EN + VI).
- **UI text:** `src/lib/content/i18n.ts`.
- **Facilitator guide & games:** `src/lib/content/facilitator.ts`.

---

## Production build

```bash
npm run build
npm run start        # serves on http://localhost:3000
```

To put it online, see **[DEPLOY.md](./DEPLOY.md)**. The quickest path is
**Vercel + Turso** (both free) — the same code uses a local file in dev and a
hosted Turso database in production, with no code changes.

---

## Privacy & tone

A privacy note is shown to every employee **before** they start:

> *Your answers will be used only for the team-building event and internal team
> communication development. This is not a performance review, HR evaluation, or
> psychological test.*

Handouts carry the footer: *“This is not a label. It is a tool for better
communication.”* We deliberately store no sensitive personal data — just name,
department, role, optional email, language, answers, and scores.

---

## Assumptions & limitations

- **Not a validated instrument.** Questions and copy were written for this event;
  they are not clinically validated. Always present results as a communication
  tool, not a verdict.
- **Single shared admin password.** Appropriate for one organiser/team running an
  internal event; not a multi-user auth system.
- **Results release = Option A (print).** Employees never see results in-app; the
  admin prints handouts and gives them out during the event. (Emailing a release
  link was deliberately left out to keep things simple, per the brief.)
- **Storage is libSQL/SQLite.** A local file in dev; a hosted Turso database in
  production (see DEPLOY.md). Fine for an internal event; for very high write
  volume you'd move to a larger managed database.
- **PDF = browser print.** We use print-friendly HTML + the browser’s “Save as
  PDF” rather than bundling a PDF engine, to keep the app lightweight.
- **Manual team editing** is not built into the first version (you can regenerate
  and change team counts); fine-grained drag-and-drop editing is a future
  enhancement.
```
