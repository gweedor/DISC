/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Produce a self-contained server build for Docker / Render / Railway / Fly.
  // (Vercel ignores this and uses its own build pipeline.)
  output: 'standalone',
  experimental: {
    // libSQL has a native client; keep it out of the server bundle so the
    // bundler doesn't try to inline it.
    serverComponentsExternalPackages: ['@libsql/client', 'libsql'],
  },
};

export default nextConfig;
