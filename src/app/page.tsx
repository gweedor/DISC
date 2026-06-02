import Link from 'next/link';
import { STRINGS } from '@/lib/content/i18n';
import { aiConfigured } from '@/lib/ai/client';

export const dynamic = 'force-dynamic';

export default function LandingPage() {
  const chat = aiConfigured();

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-5 py-12">
      <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <div className="mb-2 flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#dc2626' }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#f59e0b' }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#16a34a' }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#2563eb' }} />
        </div>

        <h1 className="text-2xl font-semibold text-slate-900">{STRINGS.en.landingTitle}</h1>
        <p className="mt-1 text-lg text-slate-700">{STRINGS.vi.landingTitle}</p>

        <p className="mt-4 text-sm leading-relaxed text-slate-600">{STRINGS.en.landingSubtitle}</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{STRINGS.vi.landingSubtitle}</p>

        {chat ? (
          <div className="mt-7 space-y-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {STRINGS.en.chooseMode} · {STRINGS.vi.chooseMode}
            </p>

            <ModeCard
              title={`${STRINGS.en.modeChat} · ${STRINGS.vi.modeChat}`}
              desc={`${STRINGS.en.modeChatDesc}`}
              hrefEn="/chat?lang=en"
              hrefVi="/chat?lang=vi"
              primary
            />
            <ModeCard
              title={`${STRINGS.en.modeQuestionnaire} · ${STRINGS.vi.modeQuestionnaire}`}
              desc={`${STRINGS.en.modeQuestionnaireDesc}`}
              hrefEn="/assess?lang=en"
              hrefVi="/assess?lang=vi"
            />
          </div>
        ) : (
          <div className="mt-7">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
              {STRINGS.en.chooseLanguage} · {STRINGS.vi.chooseLanguage}
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Link href="/assess?lang=en" className="rounded-xl bg-slate-900 px-5 py-4 text-center font-medium text-white transition hover:bg-slate-700">Start in English</Link>
              <Link href="/assess?lang=vi" className="rounded-xl bg-slate-900 px-5 py-4 text-center font-medium text-white transition hover:bg-slate-700">Bắt đầu bằng Tiếng Việt</Link>
            </div>
          </div>
        )}

        <p className="mt-6 rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-500">
          {STRINGS.en.privacyNote}
        </p>
      </div>

      <p className="mt-6 text-center text-xs text-slate-400">
        <Link href="/admin" className="hover:text-slate-600 hover:underline">Admin login</Link>
      </p>
    </main>
  );
}

function ModeCard({
  title,
  desc,
  hrefEn,
  hrefVi,
  primary,
}: {
  title: string;
  desc: string;
  hrefEn: string;
  hrefVi: string;
  primary?: boolean;
}) {
  return (
    <div className={`rounded-xl p-4 ring-1 ${primary ? 'bg-slate-50 ring-slate-300' : 'ring-slate-200'}`}>
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
        {primary && (
          <span className="rounded bg-slate-900 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">AI</span>
        )}
      </div>
      <p className="mt-0.5 text-xs text-slate-500">{desc}</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Link href={hrefEn} className="rounded-lg bg-slate-900 px-3 py-2 text-center text-sm font-medium text-white transition hover:bg-slate-700">English</Link>
        <Link href={hrefVi} className="rounded-lg bg-slate-900 px-3 py-2 text-center text-sm font-medium text-white transition hover:bg-slate-700">Tiếng Việt</Link>
      </div>
    </div>
  );
}
