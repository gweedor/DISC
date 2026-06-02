# Production image for the Team Communication Assessment app.
# Works on Render, Railway, Fly.io, Google Cloud Run, or any Docker host.
# Build:  docker build -t disc-assessment .
# Run:    docker run -p 3000:3000 -v disc_data:/data \
#           -e ADMIN_PASSWORD=change-me -e ADMIN_SESSION_SECRET=long-random \
#           disc-assessment

# ---- deps ----
FROM node:20-slim AS deps
WORKDIR /app
# native deps ship prebuilt binaries; build tools are a fallback if needed.
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json ./
RUN npm ci

# ---- builder ----
FROM node:20-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- runner ----
FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
# SQLite database lives on a mounted volume so data survives restarts/redeploys.
ENV DISC_DB_PATH=/data/disc.db
RUN mkdir -p /data

# Standalone server + static assets + the seed/reset scripts.
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/scripts ./scripts

EXPOSE 3000
CMD ["node", "server.js"]
