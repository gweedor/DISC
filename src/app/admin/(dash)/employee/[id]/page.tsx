import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEmployee } from '@/lib/db';
import { buildBars } from '@/lib/handout';
import { MAX_SCORE } from '@/lib/scoring';
import { STYLE_CONTENT, STYLE_COLORS, STYLE_LABELS } from '@/lib/content/styles';
import ScoreBars from '@/components/ScoreBars';
import NotesEditor from '@/components/NotesEditor';
import DeleteEmployeeButton from '@/components/DeleteEmployeeButton';

export const dynamic = 'force-dynamic';

export default function EmployeeResultPage({ params }: { params: { id: string } }) {
  const emp = getEmployee(Number(params.id));
  if (!emp) notFound();

  const p = STYLE_CONTENT[emp.primary].en;
  const bars = buildBars(emp.scores, 'en');

  return (
    <div>
      <Link href="/admin" className="text-sm text-slate-500 hover:underline">
        ← Back to dashboard
      </Link>

      <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">{emp.name}</h1>
          <p className="mt-1 text-sm text-slate-500">
            {emp.role} · {emp.department}
            {emp.email ? ` · ${emp.email}` : ''} · completed {new Date(emp.completedAt).toLocaleString()}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/admin/handout/${emp.id}?lang=en`}
            className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700"
          >
            Handout (EN)
          </Link>
          <Link
            href={`/admin/handout/${emp.id}?lang=vi`}
            className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700"
          >
            Handout (VI)
          </Link>
          <DeleteEmployeeButton id={emp.id} name={emp.name} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Left: scores + headline */}
        <div className="space-y-5">
          <Card>
            <div className="flex items-center gap-2">
              <span
                className="rounded px-2 py-0.5 text-sm font-semibold text-white"
                style={{ background: STYLE_COLORS[emp.primary] }}
              >
                {emp.primary}
              </span>
              <span className="text-sm text-slate-500">primary · {STYLE_LABELS[emp.primary].en}</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span
                className="rounded px-2 py-0.5 text-sm font-semibold text-white"
                style={{ background: STYLE_COLORS[emp.secondary] }}
              >
                {emp.secondary}
              </span>
              <span className="text-sm text-slate-500">secondary · {STYLE_LABELS[emp.secondary].en}</span>
            </div>
            <div className="mt-3 text-sm text-slate-600">
              Blend <strong className="text-slate-900">{emp.blend}</strong> · confidence{' '}
              <strong className="text-slate-900">{emp.confidence}</strong>
            </div>
            <div className="mt-4">
              <ScoreBars bars={bars} max={MAX_SCORE} />
            </div>
          </Card>

          <Card title="Private admin notes">
            <NotesEditor id={emp.id} initial={emp.adminNotes ?? ''} />
          </Card>
        </div>

        {/* Right: full DISC-style profile */}
        <div className="space-y-5 lg:col-span-2">
          <Card title="Summary">
            <p className="text-sm leading-relaxed text-slate-700">{p.summary}</p>
          </Card>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Card title="Communication strengths">
              <Bullets items={p.strengths} />
            </Card>
            <Card title="Possible blind spots">
              <Bullets items={p.blindSpots} />
            </Card>
            <Card title="Under pressure">
              <Text>{p.underPressure}</Text>
            </Card>
            <Card title="What they need from teammates">
              <Text>{p.needsFromTeammates}</Text>
            </Card>
            <Card title="How teammates should communicate with them">
              <Text>{p.communicateWithThem}</Text>
            </Card>
            <Card title="Leadership tendency">
              <Text>{p.leadership}</Text>
            </Card>
            <Card title="Problem-solving tendency">
              <Text>{p.problemSolving}</Text>
            </Card>
            <Card title="Best role during team-building games">
              <Text>{p.gamesBestRole}</Text>
            </Card>
            <Card title="Watch-out during team-building games">
              <Text>{p.gamesWatchOut}</Text>
            </Card>
            <Card title="Growth challenge for the event">
              <Text>{p.growthChallenge}</Text>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      {title && <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</h2>}
      {children}
    </div>
  );
}

function Text({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-relaxed text-slate-700">{children}</p>;
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5 text-sm text-slate-700">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2">
          <span className="text-slate-300">•</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
