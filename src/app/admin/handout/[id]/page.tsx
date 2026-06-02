import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { isAdmin } from '@/lib/auth';
import { getEmployee, markHandoutGenerated } from '@/lib/db';
import { buildHandout } from '@/lib/handout';
import type { Lang } from '@/lib/content/styles';
import Handout from '@/components/Handout';
import PrintButton from '@/components/PrintButton';

export const dynamic = 'force-dynamic';

export default function HandoutPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { lang?: string };
}) {
  if (!isAdmin()) redirect('/admin/login');

  const id = Number(params.id);
  const emp = getEmployee(id);
  if (!emp) notFound();

  // Viewing/printing a handout marks it as generated.
  markHandoutGenerated(id, true);

  const lang: Lang = searchParams.lang === 'vi' ? 'vi' : 'en';
  const data = buildHandout(emp, lang);

  return (
    <main className="min-h-screen bg-slate-100 py-6">
      <div className="no-print mx-auto mb-4 flex max-w-[800px] flex-wrap items-center gap-3 px-4">
        <Link href={`/admin/employee/${id}`} className="text-sm text-slate-500 hover:underline">
          ← Back
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <div className="inline-flex overflow-hidden rounded-lg ring-1 ring-slate-300">
            <Link
              href={`/admin/handout/${id}?lang=en`}
              className={`px-3 py-1.5 text-sm ${lang === 'en' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600'}`}
            >
              English
            </Link>
            <Link
              href={`/admin/handout/${id}?lang=vi`}
              className={`px-3 py-1.5 text-sm ${lang === 'vi' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600'}`}
            >
              Tiếng Việt
            </Link>
          </div>
          <PrintButton />
        </div>
      </div>

      <div className="px-4">
        <Handout data={data} />
      </div>
    </main>
  );
}
