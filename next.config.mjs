/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Produce a self-contained server build for Docker / Render / Railway / Fly.
  output: 'standalone',
  experimental: {
    // better-sqlite3 is a native module; keep it out of the server bundle...
    serverComponentsExternalPackages: ['better-sqlite3'],
    // ...and make sure its prebuilt native binary is copied into the
    // standalone output so it works inside a minimal container.
    outputFileTracingIncludes: {
      '*': ['./node_modules/better-sqlite3/build/Release/*.node'],
    },
  },
};

export default nextConfig;
