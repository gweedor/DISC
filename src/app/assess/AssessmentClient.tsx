'use client';

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { QUESTIONS, type Style } from '@/lib/content/questions';
import { STRINGS, t } from '@/lib/content/i18n';
import type { Lang } from '@/lib/content/styles';

type Selection = { most?: Style; least?: Style };

export default function AssessmentClient() {
  const router = useRouter();
  const search = useSearchParams();
  const initialLang: Lang = search.get('lang') === 'vi' ? 'vi' : 'en';

  const [lang, setLang] = useState<Lang>(initialLang);
  const [step, setStep] = useState<'intro' | 'form'>('intro');

  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [answers, setAnswers] = useState<Record<number, Selection>>({});
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const answeredCount = useMemo(
    () => Object.values(answers).filter((a) => a.most).length,
    [answers]
  );

  function setMost(qid: number, style: Style) {
    setAnswers((prev) => {
      const cur = prev[qid] ?? {};
      const next: Selection = { ...cur, most: style };
      if (next.least === style) next.least = undefined;
      return { ...prev, [qid]: next };
    });
  }

  function setLeast(qid: number, style: Style) {
    setAnswers((prev) => {
      const cur = prev[qid] ?? {};
      // toggle off if clicking the same least again
      const newLeast = cur.least === style ? undefined : style;
      const next: Selection = { ...cur, least: newLeast };
      if (next.most === style) next.most = undefined;
      return { ...prev, [qid]: next };
    });
  }

  async function handleSubmit() {
    setError(null);
    if (!name.trim()) return setError(t(lang, 'errNameRequired'));
    if (!department.trim()) return setError(t(lang, 'errDeptRequired'));
    if (!role.trim()) return setError(t(lang, 'errRoleRequired'));
    if (answeredCount < QUESTIONS.length) return setError(t(lang, 'errAnswersIncomplete'));

    const payload = {
      name: name.trim(),
      department: department.trim(),
      role: role.trim(),
      email: email.trim() || null,
      language: lang,
      answers: QUESTIONS.map((q) => ({
        questionId: q.id,
        most: answers[q.id]?.most,
        least: answers[q.id]?.least ?? null,
      })),
    };

    setSubmitting(true);
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('submit failed');
      router.push(`/complete?lang=${lang}`);
    } catch {
      setSubmitting(false);
      setError(t(lang, 'errSubmit'));
    }
  }

  const LangToggle = (
    <div className="inline-flex overflow-hidden rounded-lg ring-1 ring-slate-300">
      <button
        type="button"
        onClick={() => setLang('en')}
        className={`px-3 py-1.5 text-sm ${lang === 'en' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600'}`}
      >
        English
      </button>
      <button
        type="button"
        onClick={() => setLang('vi')}
        className={`px-3 py-1.5 text-sm ${lang === 'vi' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600'}`}
      >
        Tiếng Việt
      </button>
    </div>
  );

  if (step === 'intro') {
    return (
      <main className="mx-auto max-w-2xl px-5 py-10">
        <div className="mb-5 flex items-center justify-between">
          <Link href="/" className="text-sm text-slate-500 hover:underline">
            ← {STRINGS[lang].appName}
          </Link>
          {LangToggle}
        </div>

        <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
          <h1 className="text-xl font-semibold text-slate-900">{t(lang, 'privacyTitle')}</h1>

          <div className="mt-4 rounded-lg bg-amber-50 p-4 text-sm leading-relaxed text-amber-900 ring-1 ring-amber-200">
            {t(lang, 'privacyNote')}
          </div>

          <div className="mt-4 rounded-lg bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
            {t(lang, 'notLabelNote')}
          </div>

          <h2 className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500">
            {t(lang, 'howItWorksTitle')}
          </h2>
          <ul className="mt-2 space-y-2 text-sm text-slate-700">
            {(['howItWorks1', 'howItWorks2', 'howItWorks3', 'howItWorks4'] as const).map((k) => (
              <li key={k} className="flex gap-2">
                <span className="text-slate-400">•</span>
                <span>{t(lang, k)}</span>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-xs leading-relaxed text-slate-400">{t(lang, 'disclaimerOfficial')}</p>

          <button
            onClick={() => setStep('form')}
            className="mt-6 w-full rounded-xl bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-700"
          >
            {t(lang, 'iUnderstand')}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-5 py-8">
      <div className="mb-5 flex items-center justify-between">
        <button onClick={() => setStep('intro')} className="text-sm text-slate-500 hover:underline">
          ← {t(lang, 'back')}
        </button>
        {LangToggle}
      </div>

      {/* Details */}
      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-lg font-semibold text-slate-900">{t(lang, 'yourDetails')}</h2>
        <div className="mt-4 grid grid-cols-1 gap-4">
          <Field label={`${t(lang, 'fullName')} *`}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
            />
          </Field>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label={`${t(lang, 'department')} *`}>
              <input
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
              />
            </Field>
            <Field label={`${t(lang, 'role')} *`}>
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
              />
            </Field>
          </div>
          <Field label={`${t(lang, 'email')}`}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
            />
          </Field>
        </div>
      </section>

      {/* Questions */}
      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">{t(lang, 'questionsTitle')}</h2>
          <span className="text-sm text-slate-500">
            {answeredCount}/{QUESTIONS.length}
          </span>
        </div>
        <p className="mb-4 text-sm text-slate-500">{t(lang, 'pickMost')}</p>

        <div className="space-y-5">
          {QUESTIONS.map((q, i) => {
            const sel = answers[q.id] ?? {};
            const done = !!sel.most;
            return (
              <div
                key={q.id}
                className={`rounded-2xl bg-white p-5 shadow-sm ring-1 ${
                  done ? 'ring-slate-200' : 'ring-slate-200'
                }`}
              >
                <div className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                  {t(lang, 'questionProgress', { n: i + 1, total: QUESTIONS.length })}
                </div>
                <p className="mb-3 font-medium text-slate-900">
                  {lang === 'vi' ? q.question_vi : q.question_en}
                </p>

                <div className="grid grid-cols-[auto,1fr] items-center gap-x-3 text-xs font-medium text-slate-400">
                  <div className="flex gap-1">
                    <span className="w-12 text-center">{lang === 'vi' ? 'Giống' : 'Most'}</span>
                    <span className="w-12 text-center">{lang === 'vi' ? 'Ít' : 'Least'}</span>
                  </div>
                  <div />
                </div>

                <div className="mt-1 space-y-2">
                  {q.answers.map((a, ai) => {
                    const isMost = sel.most === a.style;
                    const isLeast = sel.least === a.style;
                    return (
                      <div
                        key={ai}
                        className={`flex items-center gap-3 rounded-lg border px-2 py-1.5 ${
                          isMost
                            ? 'border-slate-900 bg-slate-50'
                            : isLeast
                            ? 'border-slate-300 bg-slate-50/50'
                            : 'border-slate-200'
                        }`}
                      >
                        <div className="flex gap-1">
                          <button
                            type="button"
                            aria-label="most like me"
                            onClick={() => setMost(q.id, a.style)}
                            className={`h-7 w-12 rounded-md text-xs font-semibold ${
                              isMost
                                ? 'bg-slate-900 text-white'
                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                            }`}
                          >
                            {isMost ? '✓' : '+'}
                          </button>
                          <button
                            type="button"
                            aria-label="least like me"
                            onClick={() => setLeast(q.id, a.style)}
                            className={`h-7 w-12 rounded-md text-xs font-semibold ${
                              isLeast
                                ? 'bg-slate-500 text-white'
                                : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                            }`}
                          >
                            {isLeast ? '−' : '·'}
                          </button>
                        </div>
                        <span className="text-sm text-slate-700">
                          {lang === 'vi' ? a.text_vi : a.text_en}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {error && (
        <div className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700 ring-1 ring-red-200">
          {error}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="mt-6 w-full rounded-xl bg-slate-900 px-5 py-3.5 font-medium text-white transition hover:bg-slate-700 disabled:opacity-60"
      >
        {submitting ? t(lang, 'submitting') : t(lang, 'submit')}
      </button>
      <p className="mt-3 text-center text-xs text-slate-400">{t(lang, 'pickLeastOptional')}</p>
    </main>
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
