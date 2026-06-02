import { NextRequest, NextResponse } from 'next/server';
import { aiConfigured } from '@/lib/ai/client';
import { scoreConversation } from '@/lib/ai/score';
import type { ChatMessage } from '@/lib/ai/interview';
import { resultFromScores } from '@/lib/scoring';
import { insertEmployee } from '@/lib/db';
import { STYLE_LABELS } from '@/lib/content/styles';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

interface Body {
  lang?: string;
  name?: string;
  department?: string;
  role?: string;
  email?: string | null;
  messages?: { role?: string; content?: string }[];
}

export async function POST(req: NextRequest) {
  if (!aiConfigured()) {
    return NextResponse.json({ error: 'AI assessment is not configured.' }, { status: 503 });
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const name = (body.name ?? '').trim();
  const department = (body.department ?? '').trim();
  const role = (body.role ?? '').trim();
  const email = body.email ? String(body.email).trim() : null;
  const lang = body.lang === 'vi' ? 'vi' : 'en';

  if (!name || !department || !role) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const transcript: ChatMessage[] = (body.messages ?? [])
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role as 'user' | 'assistant', content: String(m.content).slice(0, 4000) }));

  if (transcript.filter((m) => m.role === 'user').length < 3) {
    return NextResponse.json({ error: 'Conversation too short to assess.' }, { status: 400 });
  }

  try {
    const { scores, evidence, rationale } = await scoreConversation(transcript, lang);
    const result = resultFromScores(scores);

    const rationaleText = [
      rationale,
      '',
      ...(['D', 'I', 'S', 'C'] as const).map((s) => `${STYLE_LABELS[s].en} (${s}): ${evidence[s]}`),
    ].join('\n');

    const id = await insertEmployee({
      name,
      department,
      role,
      email,
      language: lang,
      answers: [], // conversational method has no questionnaire selections
      scores: result.scores,
      leastCounts: { D: 0, I: 0, S: 0, C: 0 },
      primary: result.primary,
      secondary: result.secondary,
      blend: result.blend,
      confidence: result.confidence,
      method: 'conversation',
      rationale: rationaleText,
      transcript,
    });

    return NextResponse.json({ ok: true, id });
  } catch (err) {
    console.error('scoring failed', err);
    return NextResponse.json({ error: 'Could not complete the assessment. Please try again.' }, { status: 502 });
  }
}
