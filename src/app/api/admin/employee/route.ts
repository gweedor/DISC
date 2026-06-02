import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';
import { deleteEmployee, markHandoutGenerated, updateAdminNotes } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Handles small admin mutations: save notes, mark handout generated, delete.
export async function POST(req: NextRequest) {
  if (!isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { action?: string; id?: number; notes?: string; value?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const id = Number(body.id);
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  switch (body.action) {
    case 'notes':
      await updateAdminNotes(id, String(body.notes ?? ''));
      return NextResponse.json({ ok: true });
    case 'handout':
      await markHandoutGenerated(id, body.value !== false);
      return NextResponse.json({ ok: true });
    case 'delete':
      await deleteEmployee(id);
      return NextResponse.json({ ok: true });
    default:
      return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  }
}
