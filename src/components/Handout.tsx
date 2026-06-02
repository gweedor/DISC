import type { HandoutData } from '@/lib/handout';
import { MAX_SCORE } from '@/lib/scoring';

// One-page printable handout. Used both standalone and in the all-handouts set.
export default function Handout({ data }: { data: HandoutData }) {
  const vi = data.lang === 'vi';
  const L = vi
    ? {
        primary: 'Phong cách chính',
        secondary: 'Phong cách phụ',
        blend: 'Kết hợp phong cách',
        whatMeans: 'Điều này có nghĩa là gì',
        strengths: 'Điểm mạnh của bạn',
        blindSpots: 'Điểm có thể bị bỏ qua',
        frustrate: 'Điều có thể khiến bạn khó chịu',
        misunderstand: 'Điều người khác có thể hiểu nhầm về bạn',
        workWithYou: 'Cách đồng đội giao tiếp với bạn',
        communicateBetter: 'Cách bạn giao tiếp tốt hơn với người khác',
        games: 'Trong các trò chơi hôm nay, bạn có thể tự nhiên…',
        challenge: 'Thử thách phát triển trong sự kiện hôm nay',
      }
    : {
        primary: 'Your primary style',
        secondary: 'Your secondary style',
        blend: 'Your style blend',
        whatMeans: 'What this means',
        strengths: 'Your strengths',
        blindSpots: 'Possible blind spots',
        frustrate: 'What may frustrate you',
        misunderstand: 'What others may misunderstand about you',
        workWithYou: 'How teammates can communicate with you',
        communicateBetter: 'How you can communicate better with others',
        games: 'During team games, you may naturally…',
        challenge: 'One growth challenge for today’s event',
      };

  return (
    <article className="handout mx-auto max-w-[800px] rounded-xl bg-white p-8 text-slate-800 shadow-sm ring-1 ring-slate-200 print:max-w-none print:rounded-none print:shadow-none print:ring-0">
      {/* Header */}
      <header className="border-b border-slate-200 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{data.name}</h1>
            <p className="text-sm text-slate-500">
              {data.role} · {data.department}
            </p>
          </div>
          <div className="flex gap-1 pt-1">
            {data.bars.map((b) => (
              <span key={b.style} className="h-3 w-3 rounded-full" style={{ background: b.color }} />
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          <Pill label={L.primary} value={data.primaryLabel} color={data.bars.find((b) => b.style === data.blend[0])?.color} />
          <Pill label={L.secondary} value={data.secondaryLabel} />
          <Pill label={L.blend} value={data.blend} />
        </div>

        {/* score bars */}
        <div className="mt-4 space-y-1.5">
          {data.bars.map((b) => (
            <div key={b.style} className="flex items-center gap-2">
              <span className="w-5 text-xs font-semibold" style={{ color: b.color }}>
                {b.style}
              </span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full" style={{ width: `${b.pct}%`, background: b.color }} />
              </div>
              <span className="w-10 text-right text-xs tabular-nums text-slate-400">
                {b.score}/{MAX_SCORE}
              </span>
            </div>
          ))}
        </div>
      </header>

      {/* Body */}
      <Section title={L.whatMeans}>
        <p className="text-sm leading-relaxed">{data.summary}</p>
        <p className="mt-1 text-sm leading-relaxed text-slate-500">{data.blendText}</p>
      </Section>

      <div className="grid grid-cols-2 gap-x-6">
        <Section title={L.strengths}>
          <Bullets items={data.strengths} />
        </Section>
        <Section title={L.blindSpots}>
          <Bullets items={data.blindSpots} />
        </Section>
      </div>

      <div className="grid grid-cols-2 gap-x-6">
        <Section title={L.frustrate}>
          <p className="text-sm leading-relaxed">{data.whatMayFrustrateYou}</p>
        </Section>
        <Section title={L.misunderstand}>
          <p className="text-sm leading-relaxed">{data.whatOthersMisunderstand}</p>
        </Section>
      </div>

      <div className="grid grid-cols-2 gap-x-6">
        <Section title={L.workWithYou}>
          <p className="text-sm leading-relaxed">{data.communicateWithYou}</p>
        </Section>
        <Section title={L.communicateBetter}>
          <p className="text-sm leading-relaxed">{data.communicateBetter}</p>
        </Section>
      </div>

      <Section title={L.games}>
        <p className="text-sm leading-relaxed">{data.duringGames}</p>
      </Section>

      <Section title={L.challenge}>
        <p className="rounded-lg bg-slate-50 p-3 text-sm font-medium leading-relaxed text-slate-800">
          {data.growthChallenge}
        </p>
      </Section>

      {/* Footer */}
      <footer className="mt-5 border-t border-slate-200 pt-3 text-center text-xs italic text-slate-400">
        {data.footer}
      </footer>
    </article>
  );
}

function Pill({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="rounded-lg bg-slate-50 px-2 py-2">
      <div className="text-[10px] uppercase tracking-wide text-slate-400">{label}</div>
      <div className="text-sm font-semibold" style={{ color: color ?? '#0f172a' }}>
        {value}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-4">
      <h2 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</h2>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1 text-sm">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2">
          <span className="text-slate-300">•</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
