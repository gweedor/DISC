import { NextRequest, NextResponse } from 'next/server';
import { aiConfigured } from '@/lib/ai/client';
import { runInterviewTurn, type ChatMessage } from '@/lib/ai/interview';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

interface Body {
  lang?: string;
  messages?: { role?: string; content?: string }[];
}

function sanitize(messages: { role?: string; content?: string }[]): ChatMessage[] {
  return messages
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-60)
    .map((m) => ({ role: m.role as 'user' | 'assistant', content: String(m.content).slice(0, 4000) }));
}

export async function POST(req: NextRequest) {
  if (!aiConfigured()) {
    return NextResponse.json({ error: 'AI assessment is not configured (ANTHROPIC_API_KEY missing).' }, { status: 503 });
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const lang = body.lang === 'vi' ? 'vi' : 'en';
  const history = sanitize(body.messages ?? []);

  try {
    const { reply, done } = await runInterviewTurn(history, lang);
    return NextResponse.json({ reply, done });
  } catch (err) {
    const e = err as { status?: number; message?: string; error?: { error?: { message?: string } } };
    const detail = e?.error?.error?.message || e?.message || String(err);
    console.error('chat turn failed', e?.status, detail);
    return NextResponse.json(
      { error: 'The assistant is unavailable right now.', detail, status: e?.status ?? null },
      { status: 502 }
    );
  }
}
