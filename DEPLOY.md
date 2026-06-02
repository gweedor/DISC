# Putting the app online

The app is a normal Node/Next.js server that stores data in a **SQLite file**,
so it needs a host with a **persistent disk** (not a purely serverless one).
Everything below is already wired up — pick one path.

> Before going live, set a real **`ADMIN_PASSWORD`** and a long random
> **`ADMIN_SESSION_SECRET`**. The defaults are only for local testing.

---

## Option A — Render (closest to one-click)

1. Push this repo to GitHub (already done on your branch).
2. Go to <https://render.com> → **New** → **Blueprint** → connect this repo.
3. Render reads [`render.yaml`](./render.yaml): it builds the Docker image and
   attaches a 1 GB persistent disk at `/data` for the database.
4. When prompted, set **`ADMIN_PASSWORD`** (Render auto-generates the session
   secret). Click **Apply**.
5. In ~5 minutes you get a public URL like `https://disc-assessment.onrender.com`.
   - Employees: share the base URL.
   - Admin: `<url>/admin`.

> A persistent disk requires Render's paid **Starter** plan (~$7/mo). That's the
> only reliable way to keep SQLite data safe across restarts on Render.

---

## Option B — Railway (usage-based, has free credit)

1. <https://railway.app> → **New Project** → **Deploy from GitHub repo**.
2. Railway auto-detects the [`Dockerfile`](./Dockerfile).
3. Add a **Volume** mounted at `/data`.
4. Add variables: `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`,
   and `DISC_DB_PATH=/data/disc.db`.
5. Deploy → click **Generate Domain** for a public URL.

---

## Option C — Fly.io (good free-ish tier)

```bash
# one-time
curl -L https://fly.io/install.sh | sh
fly auth login

# from this repo
fly launch --no-deploy           # detects the Dockerfile; pick a name/region
fly volumes create disc_data --size 1
# add a [mounts] entry to fly.toml:  source = "disc_data", destination = "/data"
fly secrets set ADMIN_PASSWORD=your-password ADMIN_SESSION_SECRET=$(openssl rand -hex 24)
fly deploy
```

---

## Option D — Instant public URL for event day (zero hosting account)

If you just need people to reach it for a day or two and can leave a computer
running, expose your local server with a free tunnel:

```bash
npm install
npm run build && npm run start        # serves on http://localhost:3000

# in another terminal — no account needed:
npx cloudflared tunnel --url http://localhost:3000
# → prints a public https://<random>.trycloudflare.com URL
```

Anyone with that URL can use it while your machine + the tunnel stay running.
(`ngrok http 3000` works the same way if you prefer ngrok.)

---

## Any Docker host (Cloud Run, a VPS, etc.)

```bash
docker build -t disc-assessment .
docker run -p 3000:3000 -v disc_data:/data \
  -e ADMIN_PASSWORD=your-password \
  -e ADMIN_SESSION_SECRET=$(openssl rand -hex 24) \
  disc-assessment
```

---

## After deploying

- Visit `<url>/admin` and sign in with your `ADMIN_PASSWORD`.
- (Optional) load demo data: run `npm run db:seed` against the same
  `DISC_DB_PATH`, or just let real employees complete the assessment.
- Share the base URL with employees. They will **not** see their results — you
  print handouts from the admin dashboard during the event.

## Note on serverless hosts (Vercel / Cloudflare)

Vercel and Cloudflare Workers don't keep a writable local disk, so the current
SQLite setup won't persist there. To use them, swap the data layer in
`src/lib/db.ts` for a hosted database (e.g. Postgres/Neon/Supabase, or
Cloudflare D1). The rest of the app is storage-agnostic and wouldn't need to
change. Ask and this can be done.
