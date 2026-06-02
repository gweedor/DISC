import { FACILITATOR_INTRO, GAMES } from '@/lib/content/facilitator';
import PrintButton from '@/components/PrintButton';

export const dynamic = 'force-dynamic';

export default function FacilitatorPage() {
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Facilitator guide</h1>
          <p className="mt-1 text-sm text-slate-500">
            How to run the event, explain the assessment, hand out results respectfully, and debrief each
            game.
          </p>
        </div>
        <div className="no-print">
          <PrintButton label="Print guide" />
        </div>
      </div>

      <div className="space-y-6">
        <Card title="How to explain the assessment">
          <Bullets items={FACILITATOR_INTRO.howToExplain} />
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card title="What to say before giving handouts">
            <Bullets items={FACILITATOR_INTRO.beforeGivingHandouts} />
          </Card>
          <Card title="What NOT to say" tone="warn">
            <Bullets items={FACILITATOR_INTRO.whatNotToSay} />
          </Card>
          <Card title="How to avoid people feeling labeled">
            <Bullets items={FACILITATOR_INTRO.avoidLabeling} />
          </Card>
          <Card title="Connecting results to communication & teamwork">
            <Bullets items={FACILITATOR_INTRO.connectToTeamwork} />
          </Card>
        </div>

        <Card title="General debrief questions (use after any activity)">
          <Bullets items={FACILITATOR_INTRO.generalDebrief} />
        </Card>

        <h2 className="pt-2 text-xl font-semibold text-slate-900">The games</h2>

        {GAMES.map((g) => (
          <div
            key={g.id}
            className={`break-inside-avoid rounded-xl bg-white p-6 shadow-sm ring-1 ${
              g.id === 'blind-builder' ? 'ring-slate-900/20' : 'ring-slate-200'
            }`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold text-slate-900">{g.name}</h3>
              <span className="text-xs text-slate-500">
                {g.time} · {g.teamSize}
              </span>
            </div>
            {g.id === 'blind-builder' && (
              <span className="mt-1 inline-block rounded bg-slate-900 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                Headline activity
              </span>
            )}

            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              <strong>Purpose:</strong> {g.purpose}
            </p>

            {g.roles && (
              <Field label="Roles">
                <span className="text-sm text-slate-700">{g.roles.join(' · ')}</span>
              </Field>
            )}

            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2">
              <Field label="Materials">
                <Mini items={g.materials} />
              </Field>
              <Field label="Setup">
                <Mini items={g.setup} ordered />
              </Field>
              <Field label="Rules">
                <Mini items={g.rules} />
              </Field>
              <Field label="Debrief questions">
                <Mini items={g.debriefQuestions} />
              </Field>
            </div>

            <Field label="Scoring">
              <span className="text-sm leading-relaxed text-slate-700">{g.scoring}</span>
            </Field>

            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  DISC-style connection
                </div>
                <p className="mt-1 text-sm leading-relaxed text-slate-700">{g.discConnection}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Work connection
                </div>
                <p className="mt-1 text-sm leading-relaxed text-slate-700">{g.workConnection}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Card({
  title,
  children,
  tone,
}: {
  title: string;
  children: React.ReactNode;
  tone?: 'warn';
}) {
  return (
    <div
      className={`rounded-xl bg-white p-5 shadow-sm ring-1 ${
        tone === 'warn' ? 'ring-amber-200' : 'ring-slate-200'
      }`}
    >
      <h2
        className={`mb-3 text-sm font-semibold uppercase tracking-wide ${
          tone === 'warn' ? 'text-amber-700' : 'text-slate-500'
        }`}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-3">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1">{children}</div>
    </div>
  );
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

function Mini({ items, ordered }: { items: string[]; ordered?: boolean }) {
  return (
    <ul className="space-y-1 text-sm text-slate-700">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2">
          <span className="text-slate-400">{ordered ? `${i + 1}.` : '•'}</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
