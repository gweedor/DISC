import Link from 'next/link';
import { listEmployees } from '@/lib/db';
import EmployeeTable, { type TableRow } from '@/components/EmployeeTable';
import { STYLE_COLORS, STYLE_LABELS } from '@/lib/content/styles';
import type { Style } from '@/lib/content/questions';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const employees = await listEmployees();

  const counts: Record<Style, number> = { D: 0, I: 0, S: 0, C: 0 };
  for (const e of employees) counts[e.primary]++;

  const rows: TableRow[] = employees.map((e) => ({
    id: e.id,
    name: e.name,
    department: e.department,
    role: e.role,
    primary: e.primary,
    secondary: e.secondary,
    blend: e.blend,
    D: e.scores.D,
    I: e.scores.I,
    S: e.scores.S,
    C: e.scores.C,
    completedAt: e.completedAt,
    handoutGenerated: e.handoutGenerated,
  }));

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">
            {employees.length} {employees.length === 1 ? 'employee has' : 'employees have'} completed the assessment.
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href="/api/admin/export"
            className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100"
          >
            Export CSV
          </a>
          <Link
            href="/admin/handouts"
            className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            Handouts &amp; Print
          </Link>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(['D', 'I', 'S', 'C'] as Style[]).map((s) => (
          <div key={s} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ background: STYLE_COLORS[s] }} />
              <span className="text-2xl font-semibold text-slate-900">{counts[s]}</span>
            </div>
            <p className="mt-1 text-xs text-slate-500">{STYLE_LABELS[s].en}</p>
          </div>
        ))}
      </div>

      {employees.length === 0 ? (
        <div className="rounded-xl bg-white p-10 text-center text-slate-500 shadow-sm ring-1 ring-slate-200">
          No assessments yet. Share the{' '}
          <Link href="/" className="text-slate-900 underline">
            employee link
          </Link>{' '}
          or run <code className="rounded bg-slate-100 px-1">npm run db:seed</code> to load sample data.
        </div>
      ) : (
        <EmployeeTable rows={rows} />
      )}
    </div>
  );
}
