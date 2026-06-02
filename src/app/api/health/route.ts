import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Diagnostic endpoint. Reports ONLY whether each integration is detected —
// never the secret values themselves. Visit <your-url>/api/health.
export async function GET() {
  return NextResponse.json({
    ok: true,
    aiConfigured: !!process.env.ANTHROPIC_API_KEY,
    chatModel: process.env.DISC_CHAT_MODEL || 'claude-opus-4-8 (default)',
    dbConfigured: !!process.env.TURSO_DATABASE_URL || 'local file',
    adminPasswordSet: !!process.env.ADMIN_PASSWORD,
    time: new Date().toISOString(),
  });
}
