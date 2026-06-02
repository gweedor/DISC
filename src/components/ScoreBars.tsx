import type { ScoreBar } from '@/lib/handout';

export default function ScoreBars({ bars, max }: { bars: ScoreBar[]; max: number }) {
  return (
    <div className="space-y-2">
      {bars.map((b) => (
        <div key={b.style} className="flex items-center gap-3">
          <div className="flex w-8 items-center gap-1 text-sm font-semibold" style={{ color: b.color }}>
            {b.style}
          </div>
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full"
              style={{ width: `${b.pct}%`, background: b.color }}
            />
          </div>
          <div className="w-12 text-right text-sm tabular-nums text-slate-500">
            {b.score}/{max}
          </div>
        </div>
      ))}
    </div>
  );
}
