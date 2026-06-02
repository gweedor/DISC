import { NextRequest, NextResponse } from 'next/server';
import { score, validateSelections, type AnswerSelection } from '@/lib/scoring';
import { insertEmployee } from '@/lib/db';
import { STYLE_ORDER } from '@/lib/content/questions';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface SubmitBody {
  name?: string;
  department?: string;
  role?: string;
  email?: string | null;
  language?: string;
  answers?: { questionId: number; most?: string; least?: string | null }[];
}

export async function POST(req: NextRequest) {
  let body: SubmitBody;
  try {
    body = (await req.json()) as SubmitBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const name = (body.name ?? '').trim();
  const department = (body.department ?? '').trim();
  const role = (body.role ?? '').trim();
  const email = body.email ? String(body.email).trim() : null;
  const language = body.language === 'vi' ? 'vi' : 'en';

  if (!name || !department || !role) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const selections: AnswerSelection[] = (body.answers ?? [])
    .filter((a) => a && typeof a.questionId === 'number')
    .map((a) => ({
      questionId: a.questionId,
      most: STYLE_ORDER.includes(a.most as never) ? (a.most as AnswerSelection['most']) : ('D' as AnswerSelection['most']),
      least: a.least && STYLE_ORDER.includes(a.least as never) ? (a.least as AnswerSelection['least']) : null,
    }));

  const validationError = validateSelections(selections);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const result = score(selections);

  const id = insertEmployee({
    name,
    department,
    role,
    email,
    language,
    answers: selections,
    scores: result.scores,
    leastCounts: result.leastCounts,
    primary: result.primary,
    secondary: result.secondary,
    blend: result.blend,
    confidence: result.confidence,
  });

  return NextResponse.json({ ok: true, id });
}
