import Link from 'next/link';
import { listEmployees } from '@/lib/db';
import { STYLE_COLORS } from '@/lib/content/styles';

export const dynamic = 'force-dynamic';

export default async function HandoutsHubPage() {
  const employees = await listEmployees();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Handouts &amp; Export</h1>
      <p className="mt-1 text-sm text-slate-500">
        Print individual handouts, the full set, or export the raw data. Handouts stay hidden from
        employees — print them and hand them out during the event.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card title="Printable set — English">
          <p className="mb-3 text-sm text-slate-600">All {employees.length} handouts, one per page, in English.</p>
          <Link
            href="/admin/handouts/print?lang=en"
            className="inline-block rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            Open print view (EN)
          </Link>
        </Card>
        <Card title="Printable set — Tiếng Việt">
          <p className="mb-3 text-sm text-slate-600">All {employees.length} handouts, one per page, in Vietnamese.</p>
          <Link
            href="/admin/handouts/print?lang=vi"
            className="inline-block rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            Open print view (VI)
          </Link>
        </Card>
        <Card title="Export data">
          <p className="mb-3 text-sm text-slate-600">Download all results and score breakdowns as CSV.</p>
          <a
            href="/api/admin/export"
            className="inline-block rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-300 hover:bg-slate-100"
          >
            Download CSV
          </a>
        </Card>
      </div>

      <h2 className="mt-8 mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Individual handouts
      </h2>
      <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-2.5 font-medium">Name</th>
              <th className="px-4 py-2.5 font-medium">Style</th>
              <th className="px-4 py-2.5 font-medium">Generated</th>
              <th className="px-4 py-2.5 font-medium">Handout</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {employees.map((e) => (
              <tr key={e.id} className="hover:bg-slate-50">
                <td className="px-4 py-2.5 font-medium text-slate-900">{e.name}</td>
                <td className="px-4 py-2.5">
                  <span
                    className="rounded px-1.5 py-0.5 text-xs font-semibold text-white"
                    style={{ background: STYLE_COLORS[e.primary] }}
                  >
                    {e.blend}
                  </span>
                </td>
                <td className="px-4 py-2.5">
                  {e.handoutGenerated ? (
                    <span className="text-green-600">yes</span>
                  ) : (
                    <span className="text-slate-400">no</span>
                  )}
                </td>
                <td className="px-4 py-2.5">
                  <Link href={`/admin/handout/${e.id}?lang=en`} className="text-slate-700 hover:underline">
                    EN
                  </Link>
                  <span className="px-1 text-slate-300">·</span>
                  <Link href={`/admin/handout/${e.id}?lang=vi`} className="text-slate-700 hover:underline">
                    VI
                  </Link>
                </td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-400">
                  No assessments yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <h2 className="mb-2 text-sm font-semibold text-slate-900">{title}</h2>
      {children}
    </div>
  );
}
