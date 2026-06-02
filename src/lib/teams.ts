import type { Employee } from './db';
import type { Style } from './content/questions';

export interface TeamMember {
  id: number;
  name: string;
  department: string;
  style: Style;
  role: string;
}

export interface Team {
  name: string;
  members: TeamMember[];
  styleCounts: Record<Style, number>;
}

// Suggested Blind Builder LEGO Challenge roles, in priority order of which
// style they suit. Roles are suggestions only — the admin can edit manually.
const BLIND_BUILDER_ROLES = [
  'Architect',
  'Communicator',
  'Observer / Quality Checker',
  'Builder 1',
  'Builder 2',
];

// Seeded RNG so "regenerate" produces a different (but still balanced) layout.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Build balanced, mixed-style teams.
 *
 * Strategy: bucket people by primary style, shuffle each bucket, then deal them
 * out in interleaved style order using a snake pattern. This naturally spreads
 * D / I / S / C across teams and avoids stacking all of one style together.
 */
export function generateTeams(employees: Employee[], numTeams: number, seed = 1): Team[] {
  numTeams = Math.max(1, Math.min(numTeams, Math.max(1, employees.length)));
  const rng = mulberry32(seed);

  const buckets: Record<Style, Employee[]> = { D: [], I: [], S: [], C: [] };
  for (const e of employees) buckets[e.primary].push(e);
  (['D', 'I', 'S', 'C'] as Style[]).forEach((s) => {
    buckets[s] = shuffle(buckets[s], rng);
  });

  // Interleave: D, I, S, C, D, I, S, C ...
  const ordered: Employee[] = [];
  const styleSeq: Style[] = ['D', 'I', 'S', 'C'];
  let remaining = employees.length;
  while (remaining > 0) {
    for (const s of styleSeq) {
      const next = buckets[s].pop();
      if (next) {
        ordered.push(next);
        remaining--;
      }
    }
  }

  const teams: Team[] = Array.from({ length: numTeams }, (_, i) => ({
    name: `Team ${i + 1}`,
    members: [],
    styleCounts: { D: 0, I: 0, S: 0, C: 0 },
  }));

  // Snake deal.
  let idx = 0;
  let forward = true;
  for (const emp of ordered) {
    const team = teams[idx];
    team.members.push({
      id: emp.id,
      name: emp.name,
      department: emp.department,
      style: emp.primary,
      role: '',
    });
    team.styleCounts[emp.primary]++;

    if (forward) {
      idx++;
      if (idx === numTeams) {
        idx = numTeams - 1;
        forward = false;
      }
    } else {
      idx--;
      if (idx < 0) {
        idx = 0;
        forward = true;
      }
    }
  }

  for (const team of teams) assignRoles(team);
  return teams;
}

// Assign Blind Builder roles within a team based on style fit.
function assignRoles(team: Team) {
  const pool = [...team.members];
  const taken = new Set<number>();

  const pick = (prefs: Style[]): TeamMember | undefined => {
    for (const style of prefs) {
      const m = pool.find((x) => !taken.has(x.id) && x.style === style);
      if (m) {
        taken.add(m.id);
        return m;
      }
    }
    const any = pool.find((x) => !taken.has(x.id));
    if (any) taken.add(any.id);
    return any;
  };

  const rolePrefs: Record<string, Style[]> = {
    Architect: ['C', 'S'],
    Communicator: ['I', 'D'],
    'Observer / Quality Checker': ['C', 'S'],
    'Builder 1': ['D', 'I'],
    'Builder 2': ['S', 'C'],
  };

  for (const role of BLIND_BUILDER_ROLES) {
    const m = pick(rolePrefs[role] ?? []);
    if (m) {
      const tm = team.members.find((x) => x.id === m.id)!;
      tm.role = role;
    }
  }
  // Any leftover members (teams larger than 5) become extra Builders.
  let extra = 3;
  for (const m of team.members) {
    if (!m.role) m.role = `Builder ${extra++}`;
  }
}
