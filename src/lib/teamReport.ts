import type { Employee } from './db';
import type { Style } from './content/questions';
import { STYLE_LABELS } from './content/styles';

export interface TeamReport {
  total: number;
  styleCounts: Record<Style, number>;
  stylePct: Record<Style, number>;
  blendCounts: { blend: string; count: number }[];
  prominent: Style[];
  underrepresented: Style[];
  strengths: string[];
  risks: string[];
  communicationPatterns: string[];
  leadershipPatterns: string[];
  problemSolvingPatterns: string[];
  qualityRisks: string[];
  discussionTopics: string[];
  gamePairings: string[];
  groupAssignment: string[];
}

const L = (s: Style) => STYLE_LABELS[s].en;

interface StyleInsight {
  strength: string;
  risk: string;
  communication: string;
  leadership: string;
  problemSolving: string;
  quality: string;
}

const INSIGHTS: Record<Style, StyleInsight> = {
  D: {
    strength: 'Strong drive, initiative, and speed — the team takes action and pushes for results.',
    risk: 'The team may move fast and take initiative, but may need to slow down for documentation and alignment.',
    communication: 'Communication is direct and to the point; make sure quieter voices are still heard.',
    leadership: 'Plenty of people willing to take charge — watch for competition over who leads.',
    problemSolving: 'Quick to decide and act; may commit before fully analysing the problem.',
    quality: 'Speed can come at the cost of detail — build in a deliberate quality check.',
  },
  I: {
    strength: 'High energy, collaboration, and communication — good morale and lots of ideas.',
    risk: 'The team may have strong energy and collaboration, but may need structure and follow-through.',
    communication: 'Open and lively communication; make sure decisions get written down, not just discussed.',
    leadership: 'Inspiring, people-first leadership; watch for over-promising or losing focus on delivery.',
    problemSolving: 'Great at brainstorming; may need help converging on one option and finishing it.',
    quality: 'Enthusiasm is high but details and deadlines can slip — assign a clear owner for follow-up.',
  },
  S: {
    strength: 'Loyal, supportive, and stable — strong trust and a real willingness to help each other.',
    risk: 'The team may be loyal and supportive, but may avoid difficult conversations or conflict.',
    communication: 'Calm and considerate; encourage people to surface concerns early rather than holding back.',
    leadership: 'Steady, trust-building leadership; may be slow to make hard or unpopular calls.',
    problemSolving: 'Patient and collaborative; may avoid the difficult decision that resolves the issue.',
    quality: 'Reliable delivery, but disagreements about quality may go unspoken — make it safe to challenge.',
  },
  C: {
    strength: 'Careful, accurate, and quality-focused — strong on process, documentation, and risk awareness.',
    risk: 'The team may care about accuracy and quality, but may need to avoid overthinking or slow execution.',
    communication: 'Precise and fact-based; remember to keep messages simple and decisions visible.',
    leadership: 'Standards-driven leadership; may delay decisions waiting for more certainty.',
    problemSolving: 'Thorough root-cause analysis; may over-analyse and lose momentum.',
    quality: 'Strong quality instincts — the bigger risk here is perfectionism slowing delivery.',
  },
};

export function computeTeamReport(employees: Employee[]): TeamReport {
  const total = employees.length;
  const styleCounts: Record<Style, number> = { D: 0, I: 0, S: 0, C: 0 };
  const blendMap = new Map<string, number>();

  for (const e of employees) {
    styleCounts[e.primary]++;
    blendMap.set(e.blend, (blendMap.get(e.blend) ?? 0) + 1);
  }

  const stylePct: Record<Style, number> = { D: 0, I: 0, S: 0, C: 0 };
  (['D', 'I', 'S', 'C'] as Style[]).forEach((s) => {
    stylePct[s] = total ? Math.round((styleCounts[s] / total) * 100) : 0;
  });

  const blendCounts = [...blendMap.entries()]
    .map(([blend, count]) => ({ blend, count }))
    .sort((a, b) => b.count - a.count);

  // A style is "prominent" if it is at least 30% of the team, or clearly the
  // single largest group. Underrepresented if 10% or less (and not zero-team).
  const prominent = (['D', 'I', 'S', 'C'] as Style[]).filter(
    (s) => total > 0 && stylePct[s] >= 30
  );
  const maxCount = Math.max(...Object.values(styleCounts));
  (['D', 'I', 'S', 'C'] as Style[]).forEach((s) => {
    if (styleCounts[s] === maxCount && maxCount > 0 && !prominent.includes(s)) prominent.push(s);
  });
  const underrepresented = (['D', 'I', 'S', 'C'] as Style[]).filter(
    (s) => total > 0 && stylePct[s] <= 10
  );

  const strengths: string[] = [];
  const risks: string[] = [];
  const communicationPatterns: string[] = [];
  const leadershipPatterns: string[] = [];
  const problemSolvingPatterns: string[] = [];
  const qualityRisks: string[] = [];

  for (const s of prominent) {
    const ins = INSIGHTS[s];
    strengths.push(`Many ${L(s)} (${s}): ${ins.strength}`);
    risks.push(`Many ${L(s)} (${s}): ${ins.risk}`);
    communicationPatterns.push(ins.communication);
    leadershipPatterns.push(ins.leadership);
    problemSolvingPatterns.push(ins.problemSolving);
    qualityRisks.push(ins.quality);
  }

  for (const s of underrepresented) {
    risks.push(
      `Few ${L(s)} (${s}): the team may have a blind spot here. Be deliberate about covering ${gapNote(s)}.`
    );
  }

  const discussionTopics = [
    'How do we make decisions together — fast vs. thorough — and when does each fit?',
    'How do we make sure quieter teammates are heard before a decision is made?',
    'Where do our handoffs and instructions tend to break down?',
    'How do we give and receive feedback in a way that works for different styles?',
    'What does "good enough to ship" mean for us, and who decides?',
  ];
  if (underrepresented.length) {
    discussionTopics.push(
      `We have fewer ${underrepresented.map(L).join(' and ')} styles — how do we cover that gap as a team?`
    );
  }

  const gamePairings = [
    'Blind Builder LEGO Challenge — best with mixed-style teams; pairs a Communicator (I/D) with a Quality Checker (C/S).',
    'Survival Scenario — pair decisive (D) and analytical (C) members so speed and accuracy balance out.',
    'Pipeline / Marble Run — rewards careful planning (C/S) plus energetic coordination (I/D).',
    'Beach Minefield — leans on trust and clear communication; great for S and I to shine.',
    'Sandcastle With Constraints — pairs creative energy (I) with detail and constraint-tracking (C).',
    'Gumdrop / LEGO Tower Challenge — fast iteration (D/I) balanced by structural care (C/S).',
  ];

  const groupAssignment = [
    'Use the Team Assignment Generator to build balanced, mixed-style teams automatically.',
    'Aim for each team to include one driver (D), one communicator (I), one supporter (S), and one detail-checker (C).',
    'Avoid putting all D styles or all C styles on the same team.',
    'Where styles are uneven, balance as closely as possible and let the admin adjust manually.',
  ];

  return {
    total,
    styleCounts,
    stylePct,
    blendCounts,
    prominent,
    underrepresented,
    strengths,
    risks,
    communicationPatterns,
    leadershipPatterns,
    problemSolvingPatterns,
    qualityRisks,
    discussionTopics,
    gamePairings,
    groupAssignment,
  };
}

function gapNote(s: Style): string {
  switch (s) {
    case 'D':
      return 'fast decisions and someone willing to push for results';
    case 'I':
      return 'energy, morale, and open communication';
    case 'S':
      return 'support, stability, and care for the quieter members';
    case 'C':
      return 'detail-checking, documentation, and quality control';
  }
}
