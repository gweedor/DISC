import { listEmployees } from '@/lib/db';
import { computeTeamReport } from '@/lib/teamReport';
import { STYLE_COLORS, STYLE_LABELS } from '@/lib/content/styles';
import type { Style } from '@/lib/content/questions';
import PrintButton from '@/components/PrintButton';

export const dynamic = 'force-dynamic';

export default function TeamReportPage() {
  const employees = listEmployees();
  const report = computeTeamReport(employees);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Team-level report</h1>
          <p className="mt-1 text-sm text-slate-500">
            {report.total} {report.total === 1 ? 'employee' : 'employees'} completed · patterns the team is
            likely to show.
          </p>
        </div>
        <div className="no-print">
          <PrintButton label="Print report" />
        </div>
      </div>

      {report.total === 0 ? (
        <Empty />
      ) : (
        <div className="space-y-6">
          {/* Distribution */}
          <Card title="Style distribution">
            <div className="space-y-2">
              {(['D', 'I', 'S', 'C'] as Style[]).map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <span className="w-44 text-sm text-slate-600">
                    <span className="font-semibold" style={{ color: STYLE_COLORS[s] }}>
                      {s}
                    </span>{' '}
                    {STYLE_LABELS[s].en}
                  </span>
                  <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${report.stylePct[s]}%`, background: STYLE_COLORS[s] }}
                    />
                  </div>
                  <span className="w-24 text-right text-sm tabular-nums text-slate-500">
                    {report.styleCounts[s]} ({report.stylePct[s]}%)
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Style blend distribution">
            <div className="flex flex-wrap gap-2">
              {report.blendCounts.map((b) => (
                <span
                  key={b.blend}
                  className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm text-slate-700"
                >
                  <strong>{b.blend}</strong> × {b.count}
                </span>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card title="Team strengths">
              <Bullets items={report.strengths} />
            </Card>
            <Card title="Team risks">
              <Bullets items={report.risks} />
            </Card>
            <Card title="Likely communication patterns">
              <Bullets items={report.communicationPatterns} />
            </Card>
            <Card title="Likely leadership patterns">
              <Bullets items={report.leadershipPatterns} />
            </Card>
            <Card title="Likely problem-solving patterns">
              <Bullets items={report.problemSolvingPatterns} />
            </Card>
            <Card title="Quality &amp; documentation risks">
              <Bullets items={report.qualityRisks} />
            </Card>
          </div>

          <Card title="Suggested discussion topics for the event">
            <Bullets items={report.discussionTopics} />
          </Card>

          <Card title="Recommended team-building game pairings">
            <Bullets items={report.gamePairings} />
          </Card>

          <Card title="Recommended group assignments">
            <Bullets items={report.groupAssignment} />
          </Card>
        </div>
      )}
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">{title}</h2>
      {children}
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  if (!items.length) return <p className="text-sm text-slate-400">—</p>;
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

function Empty() {
  return (
    <div className="rounded-xl bg-white p-10 text-center text-slate-500 shadow-sm ring-1 ring-slate-200">
      No assessments yet. Once employees complete the assessment, the team report appears here.
    </div>
  );
}
