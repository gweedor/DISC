# Deploying the app

The app stores data in **libSQL** (SQLite-compatible). Locally it uses a file;
in production it uses a free **Turso** database. The recommended hosted setup is
**Vercel + Turso** — both have free tiers and it's the fastest path to a public
URL.

> Before going live, set a real **`ADMIN_PASSWORD`** and a long random
> **`ADMIN_SESSION_SECRET`**.

---

## ⭐ Vercel + Turso (recommended, ~10 minutes)

### 1. Create the database (Turso)
- Sign up at <https://turso.tech> (free).
- Easiest: in the Turso dashboard, **Create Database** → open it → **Connect/CLI**
  to get its **URL** (`libsql://...`) and create a **token**.
- Or with the CLI:
  ```bash
  curl -sSfL https://get.tur.so/install.sh | bash
  turso auth login
  turso db create disc-assessment
  turso db show disc-assessment --url         # -> TURSO_DATABASE_URL
  turso db tokens create disc-assessment      # -> TURSO_AUTH_TOKEN
  ```

### 2. Deploy the app (Vercel)
- Go to <https://vercel.com> → **Add New… → Project** → import this GitHub repo.
- Framework preset auto-detects **Next.js**. Leave build settings as default.
- Under **Environment Variables**, add:
  | Name | Value |
  |---|---|
  | `TURSO_DATABASE_URL` | `libsql://...` from step 1 |
  | `TURSO_AUTH_TOKEN` | the token from step 1 |
  | `ADMIN_PASSWORD` | a password you choose |
  | `ADMIN_SESSION_SECRET` | any long random string |
- Click **Deploy**. In ~2 minutes you get a URL like
  `https://disc-assessment.vercel.app`.

### 3. Use it
- Employees: share the base URL.
- Admin: `<url>/admin` (sign in with `ADMIN_PASSWORD`).
- The database tables are created automatically on first use.
- (Optional) load 25 demo employees from your laptop:
  ```bash
  TURSO_DATABASE_URL=libsql://... TURSO_AUTH_TOKEN=... npm run db:seed
  ```

That's it — always-on, free, and data persists. ✅

---

## Cloudflare Pages + Turso (alternative)

Cloudflare Pages can host Next.js via the official adapter:
1. Create the Turso database (same as above).
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Build command: `npx @cloudflare/next-on-pages@1`; output dir: `.vercel/output/static`.
4. Add the same four environment variables, then deploy.

(Vercel is simpler; use this only if you specifically want Cloudflare.)

---

## Railway / Render / Fly.io / any Docker host (keeps it all in one place)

A `Dockerfile` is included. These hosts run the Node server directly. You can
either use Turso (set the two `TURSO_*` vars) or a local SQLite file on a
persistent volume (set `DISC_DB_PATH=/data/disc.db` and mount a volume at
`/data`).

- **Railway:** New Project → Deploy from GitHub → it detects the Dockerfile →
  add env vars → **Generate Domain**.
- **Render:** New → Blueprint (uses `render.yaml`) → set `ADMIN_PASSWORD`.
- **Any Docker host:**
  ```bash
  docker build -t disc-assessment .
  docker run -p 3000:3000 \
    -e TURSO_DATABASE_URL=libsql://... -e TURSO_AUTH_TOKEN=... \
    -e ADMIN_PASSWORD=your-password \
    -e ADMIN_SESSION_SECRET=$(openssl rand -hex 24) \
    disc-assessment
  ```

---

## Instant public URL for event day (no hosting account)

If you can leave a computer running, expose a local server with a free tunnel:

```bash
npm install
npm run build && npm run start            # http://localhost:3000 (uses a local file DB)

# in another terminal — no account needed:
npx cloudflared tunnel --url http://localhost:3000
# -> prints a public https://<random>.trycloudflare.com URL
```

---

## After deploying (any option)
- Visit `<url>/admin`, sign in, and confirm the dashboard loads.
- Share the **base URL** with employees. They will **not** see results — you
  print handouts from the admin dashboard during the event.
