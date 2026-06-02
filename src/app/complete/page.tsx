import Link from 'next/link';
import { STRINGS } from '@/lib/content/i18n';
import type { Lang } from '@/lib/content/styles';

export default function CompletePage({
  searchParams,
}: {
  searchParams: { lang?: string };
}) {
  const lang: Lang = searchParams.lang === 'vi' ? 'vi' : 'en';
  const s = STRINGS[lang];

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-5 py-12">
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600">
          ✓
        </div>
        <h1 className="text-2xl font-semibold text-slate-900">{s.completeTitle}</h1>
        <p className="mt-3 text-base leading-relaxed text-slate-700">{s.completeMessage}</p>
        <p className="mt-2 text-sm text-slate-500">{s.completeSub}</p>

        <p className="mt-6 rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-400">
          {s.notLabelNote}
        </p>

        <Link href="/" className="mt-6 inline-block text-sm text-slate-400 hover:underline">
          ← {s.appName}
        </Link>
      </div>
    </main>
  );
}
