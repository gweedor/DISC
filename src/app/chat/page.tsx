import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { aiConfigured } from '@/lib/ai/client';
import ChatClient from './ChatClient';

export const dynamic = 'force-dynamic';

export default function ChatPage() {
  // If no API key is configured, fall back to the questionnaire.
  if (!aiConfigured()) redirect('/assess');

  return (
    <Suspense fallback={<div className="p-10 text-center text-slate-400">Loading…</div>}>
      <ChatClient />
    </Suspense>
  );
}
