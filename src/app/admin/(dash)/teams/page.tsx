import { listEmployees } from '@/lib/db';
import { generateTeams } from '@/lib/teams';
import { STYLE_COLORS } from '@/lib/content/styles';
import type { Style } from '@/lib/content/questions';
import TeamControls from '@/components/TeamControls';

export const dynamic = 'force-dynamic';

export default function TeamsPage({
  searchParams,
}: {
  searchParams: { teams?: string; seed?: string };
}) {
  const employees = listEmployees();
  const numTeams = Math.max(1, Number(searchParams.teams) || 5);
  const seed = Number(searchParams.seed) || 1;
  const teams = employees.length ? generateTeams(employees, numTeams, seed) : [];

  return (
    <div>
      <div className="mb-2 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Team assignment generator</h1>
          <p className="mt-1 text-sm text-slate-500">
            Balanced, mixed-style teams for the games. Default: 25 people → 5 teams of 5. Roles are
            suggestions for the Blind Builder challenge — adjust manually as needed.
          </p>
        </div>
      </div>

      <div className="mb-6 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <TeamControls numTeams={numTeams} />
      </div>

      {employees.length === 0 ? (
        <div className="rounded-xl bg-white p-10 text-center text-slate-500 shadow-sm ring-1 ring-slate-200">
          No assessments yet. Teams will appear here once employees complete the assessment.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {teams.map((team) => (
            <div key={team.name} className="break-inside-avoid rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-semibold text-slate-900">{team.name}</h2>
                <div className="flex gap-1">
                  {(['D', 'I', 'S', 'C'] as Style[]).map((s) =>
                    team.styleCounts[s] ? (
                      <span
                        key={s}
                        className="rounded px-1.5 py-0.5 text-[10px] font-semibold text-white"
                        style={{ background: STYLE_COLORS[s] }}
                      >
                        {s}×{team.styleCounts[s]}
                      </span>
                    ) : null
                  )}
                </div>
              </div>
              <ul className="space-y-2">
                {team.members.map((m) => (
                  <li key={m.id} className="flex items-center gap-2 text-sm">
                    <span
                      className="w-6 shrink-0 rounded text-center text-xs font-semibold text-white"
                      style={{ background: STYLE_COLORS[m.style] }}
                    >
                      {m.style}
                    </span>
                    <span className="font-medium text-slate-800">{m.name}</span>
                    <span className="ml-auto text-xs text-slate-500">{m.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
