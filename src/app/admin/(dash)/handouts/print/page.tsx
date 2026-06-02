import Link from 'next/link';
import { listEmployees, markHandoutGenerated } from '@/lib/db';
import { buildHandout } from '@/lib/handout';
import type { Lang } from '@/lib/content/styles';
import Handout from '@/components/Handout';
import PrintButton from '@/components/PrintButton';

export const dynamic = 'force-dynamic';

export default async function PrintAllHandoutsPage({
  searchParams,
}: {
  searchParams: { lang?: string };
}) {
  const lang: Lang = searchParams.lang === 'vi' ? 'vi' : 'en';
  const employees = await listEmployees();

  // Opening the full set marks every handout as generated.
  await Promise.all(employees.map((e) => markHandoutGenerated(e.id, true)));

  return (
    <div>
      <div className="no-print mb-6 flex flex-wrap items-center gap-3">
        <Link href="/admin/handouts" className="text-sm text-slate-500 hover:underline">
          ← Back
        </Link>
        <span className="text-sm text-slate-500">
          {employees.length} handouts · {lang === 'vi' ? 'Tiếng Việt' : 'English'}
        </span>
        <div className="ml-auto flex items-center gap-2">
          <div className="inline-flex overflow-hidden rounded-lg ring-1 ring-slate-300">
            <Link
              href="/admin/handouts/print?lang=en"
              className={`px-3 py-1.5 text-sm ${lang === 'en' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600'}`}
            >
              English
            </Link>
            <Link
              href="/admin/handouts/print?lang=vi"
              className={`px-3 py-1.5 text-sm ${lang === 'vi' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600'}`}
            >
              Tiếng Việt
            </Link>
          </div>
          <PrintButton label="Print all / Save as PDF" />
        </div>
      </div>

      <div className="space-y-6">
        {employees.map((e) => (
          <div key={e.id} className="print-page">
            <Handout data={buildHandout(e, lang)} />
          </div>
        ))}
        {employees.length === 0 && (
          <p className="text-center text-slate-400">No assessments yet.</p>
        )}
      </div>
    </div>
  );
}
