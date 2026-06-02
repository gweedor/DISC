'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { STRINGS, t } from '@/lib/content/i18n';
import type { Lang } from '@/lib/content/styles';

type Msg = { role: 'user' | 'assistant'; content: string };

export default function ChatClient() {
  const router = useRouter();
  const search = useSearchParams();
  const initialLang: Lang = search.get('lang') === 'vi' ? 'vi' : 'en';

  const [lang, setLang] = useState<Lang>(initialLang);
  const [step, setStep] = useState<'intro' | 'chat'>('intro');

  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');

  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const startedRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, busy, finishing]);

  async function turn(history: Msg[]) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lang, messages: history }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.detail ? `${t(lang, 'chatError')} (${data.detail})` : t(lang, 'chatError'));
        return;
      }
      const next = [...history, { role: 'assistant' as const, content: data.reply }];
      setMessages(next);
      if (data.done) await complete(next);
    } catch {
      setError(t(lang, 'chatError'));
    } finally {
      setBusy(false);
    }
  }

  async function complete(history: Msg[]) {
    setFinishing(true);
    try {
      const res = await fetch('/api/chat/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lang, name, department, role, email: email || null, messages: history }),
      });
      if (!res.ok) throw new Error('complete failed');
      router.push(`/complete?lang=${lang}`);
    } catch {
      setFinishing(false);
      setError(t(lang, 'chatError'));
    }
  }

  function begin() {
    setError(null);
    if (!name.trim()) return setError(t(lang, 'errNameRequired'));
    if (!department.trim()) return setError(t(lang, 'errDeptRequired'));
    if (!role.trim()) return setError(t(lang, 'errRoleRequired'));
    setStep('chat');
  }

  // Fetch the assistant's opening message once the chat starts.
  useEffect(() => {
    if (step === 'chat' && !startedRef.current) {
      startedRef.current = true;
      turn([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  function send() {
    const text = input.trim();
    if (!text || busy || finishing) return;
    const next = [...messages, { role: 'user' as const, content: text }];
    setMessages(next);
    setInput('');
    turn(next);
  }

  const LangToggle = (
    <div className="inline-flex overflow-hidden rounded-lg ring-1 ring-slate-300">
      <button type="button" onClick={() => setLang('en')} className={`px-3 py-1.5 text-sm ${lang === 'en' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600'}`}>English</button>
      <button type="button" onClick={() => setLang('vi')} className={`px-3 py-1.5 text-sm ${lang === 'vi' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600'}`}>Tiếng Việt</button>
    </div>
  );

  if (step === 'intro') {
    return (
      <main className="mx-auto max-w-2xl px-5 py-10">
        <div className="mb-5 flex items-center justify-between">
          <Link href="/" className="text-sm text-slate-500 hover:underline">← {STRINGS[lang].appName}</Link>
          {LangToggle}
        </div>
        <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
          <h1 className="text-xl font-semibold text-slate-900">{t(lang, 'chatHeading')}</h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{t(lang, 'chatBlurb')}</p>

          <div className="mt-4 rounded-lg bg-amber-50 p-4 text-sm leading-relaxed text-amber-900 ring-1 ring-amber-200">
            {t(lang, 'privacyNote')}
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4">
            <Field label={`${t(lang, 'fullName')} *`}>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none" />
            </Field>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label={`${t(lang, 'department')} *`}>
                <input value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none" />
              </Field>
              <Field label={`${t(lang, 'role')} *`}>
                <input value={role} onChange={(e) => setRole(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none" />
              </Field>
            </div>
            <Field label={t(lang, 'email')}>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none" />
            </Field>
          </div>

          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

          <button onClick={begin} className="mt-6 w-full rounded-xl bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-700">
            {t(lang, 'chatBegin')}
          </button>
          <p className="mt-3 text-xs leading-relaxed text-slate-400">{t(lang, 'disclaimerOfficial')}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex h-screen max-w-2xl flex-col px-4 py-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">{STRINGS[lang].appName}</span>
        <span className="text-xs text-slate-400">{t(lang, 'notLabelNote').slice(0, 0)}</span>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        {messages.length === 0 && busy && <Typing label={t(lang, 'chatTyping')} />}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
              m.role === 'user' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-800'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {busy && messages.length > 0 && <Typing label={t(lang, 'chatTyping')} />}
        {finishing && (
          <div className="pt-2 text-center text-sm text-slate-500">{t(lang, 'chatFinishing')}</div>
        )}
      </div>

      {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}

      <div className="mt-3 flex items-end gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          rows={1}
          disabled={finishing}
          placeholder={t(lang, 'chatPlaceholder')}
          className="max-h-32 flex-1 resize-none rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-slate-500 focus:outline-none disabled:opacity-60"
        />
        <button
          onClick={send}
          disabled={busy || finishing || !input.trim()}
          className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 disabled:opacity-50"
        >
          {t(lang, 'chatSend')}
        </button>
      </div>
    </main>
  );
}

function Typing({ label }: { label: string }) {
  return (
    <div className="flex justify-start">
      <div className="rounded-2xl bg-slate-100 px-3.5 py-2 text-sm text-slate-400">{label}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      {children}
    </label>
  );
}
