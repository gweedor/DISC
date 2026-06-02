// Facilitator guide content for the event. English-facing (organiser tool).

export interface GameGuide {
  id: string;
  name: string;
  purpose: string;
  time: string;
  materials: string[];
  teamSize: string;
  setup: string[];
  rules: string[];
  scoring: string;
  roles?: string[];
  debriefQuestions: string[];
  discConnection: string;
  workConnection: string;
}

export const FACILITATOR_INTRO = {
  howToExplain: [
    'Introduce this as a "team communication assessment", not a personality test or HR tool.',
    'Explain the four styles simply: D = direct/decisive, I = social/energising, S = steady/supportive, C = careful/detail-focused.',
    'Stress that everyone is a blend of all four — the result just shows where someone naturally leans.',
    'Keep it light. The goal is better teamwork and communication, not labels.',
  ],
  beforeGivingHandouts: [
    'Remind everyone there are no good or bad styles — every team needs all four.',
    'Say clearly: "This is a snapshot of how you tend to work, not a box you live in forever."',
    'Invite people to read their handout, then talk about whether it feels accurate.',
    'Frame the handout as a conversation starter for the games, not a verdict.',
  ],
  whatNotToSay: [
    'Do not say "you are a D" / "you are a C" as if it defines the person.',
    'Do not rank styles or imply one is better than another.',
    'Do not connect results to performance, promotion, pay, or HR records.',
    'Do not use the results to judge or tease anyone.',
    'Do not present this as a scientific or clinical assessment.',
  ],
  avoidLabeling: [
    'Use "you may tend to…" language rather than "you are…".',
    'Encourage people to notice their secondary style and their blend, not just one letter.',
    'Remind the group that styles can shift with context, mood, and role.',
    'Celebrate the mix in the room — point out how different styles complement each other.',
  ],
  connectToTeamwork: [
    'Tie each style back to a real teamwork moment: who pushes, who connects, who steadies, who checks.',
    'Use the games to show — not tell — how communication breaks down and gets fixed.',
    'After each game, link what happened back to everyday work: handoffs, instructions, assumptions.',
    'End on what the team will do differently next week, not on the labels themselves.',
  ],
  generalDebrief: [
    'What happened in your team — who led, who communicated, who checked details?',
    'Where did communication break down, and why?',
    'What assumptions did people make that turned out to be wrong?',
    'What would you do differently if you ran it again?',
    'How does this connect to how we actually work together?',
  ],
};

export const GAMES: GameGuide[] = [
  {
    id: 'blind-builder',
    name: 'Blind Builder LEGO Challenge',
    purpose:
      'Communication, listening, documentation, assumptions, leadership, and handoffs. The headline activity for the event.',
    time: '30–40 minutes (incl. 10-minute debrief)',
    teamSize: '5 teams of 5 people (around 25 people)',
    roles: ['Architect', 'Communicator', 'Builder 1', 'Builder 2', 'Observer / Quality Checker'],
    materials: [
      'LEGO pieces for 5 teams — each team gets the SAME set of pieces',
      '40 to 60 pieces per team',
      '5 trays, bags, or boxes (one per team)',
      '1 completed sample LEGO structure, OR 5 printed photos of it',
      'Barriers or a table layout so Builders cannot see the original',
      'Timer',
      'Score sheets and pens',
      'Labels (for roles)',
      'Optional prizes',
    ],
    setup: [
      'Build (or photograph) one sample structure using 40–60 pieces. Keep it hidden from the Builders.',
      'Give each team the identical set of pieces in a tray.',
      'Assign the five roles per team (use the suggested DISC-style roles, but let people swap if they want).',
      'Place barriers so only the Architect can see the original; Builders cannot.',
      'Explain the rules, then start the timer (about 12–15 minutes to build).',
    ],
    rules: [
      'The Builders cannot see the original structure.',
      'The Architect CAN see the original but cannot touch the LEGO.',
      'The Communicator can talk but cannot touch the LEGO.',
      'The Builders can ask questions.',
      'The Observer takes notes and watches for communication issues (does not build).',
      'Goal: recreate the original structure as closely as possible.',
    ],
    scoring:
      'Score on accuracy vs. the original: count correct pieces, correct positions, and correct colours. Award bonus points for the closest overall match. Keep scoring light — the lesson matters more than the winner.',
    debriefQuestions: [
      'Where did instructions get lost between the Architect and the Builders?',
      'What did the Communicator assume the Builders already understood?',
      'When did asking a clarifying question save time?',
      'What did the Observer notice that the builders missed in the moment?',
      'How is this like a real handoff at work?',
    ],
    discConnection:
      'D may move fast but miss detail. I may create energy but skip precision. S may keep the group calm and ask clarifying questions. C may focus on accuracy but over-explain or slow down. A great team uses all four.',
    workConnection:
      'Most work issues are not because people are lazy. They happen because instructions were unclear, context was missing, people assumed they understood, or handoffs were weak. This game makes those gaps visible and safe to talk about.',
  },
  {
    id: 'gumdrop-tower',
    name: 'Gumdrop / LEGO Tower Challenge',
    purpose: 'Planning vs. doing, rapid iteration, and balancing speed with structural care.',
    time: '20–25 minutes',
    teamSize: '4–5 people per team',
    materials: ['Gumdrops + toothpicks (or LEGO)', 'Ruler/tape measure', 'Timer', 'Score sheet'],
    setup: [
      'Give each team an identical kit.',
      'Set a fixed build time (e.g. 10 minutes).',
      'Explain that the tallest free-standing tower that survives 10 seconds wins.',
    ],
    rules: [
      'Tower must stand on its own for 10 seconds with no hands.',
      'Only the provided materials may be used.',
      'No leaning against walls or other supports.',
    ],
    scoring: 'Measure the height of each free-standing tower. Tallest stable tower wins.',
    debriefQuestions: [
      'Did your team plan first or start building immediately?',
      'Who pushed for speed and who pushed for stability?',
      'What failed, and what did you learn from the failure?',
    ],
    discConnection:
      'D and I tend to start fast; C and S tend to plan and stabilise. The best towers usually balance both.',
    workConnection:
      'Reflects the trade-off between moving fast and building something that lasts — and why teams need both instincts.',
  },
  {
    id: 'beach-minefield',
    name: 'Beach Minefield',
    purpose: 'Trust, listening, and giving clear verbal directions.',
    time: '20 minutes',
    teamSize: 'Pairs or small groups',
    materials: ['Soft "mine" objects (cups, cones, balls)', 'Blindfolds', 'Open space', 'Timer'],
    setup: [
      'Lay out a field of soft obstacles ("mines").',
      'One person is blindfolded; their partner guides them across by voice only.',
      'No touching the blindfolded person.',
    ],
    rules: [
      'The guide cannot touch the walker — voice directions only.',
      'Touching a "mine" resets the walker to the start (or adds a time penalty).',
      'Switch roles after one crossing.',
    ],
    scoring: 'Fewest mines hit and/or fastest clean crossing.',
    debriefQuestions: [
      'How did you build trust with your partner?',
      'What made directions clear or confusing?',
      'How did it feel to depend entirely on someone else’s words?',
    ],
    discConnection:
      'S styles often shine at calm, reassuring guidance; D and I may need to slow their instructions down for clarity.',
    workConnection:
      'Shows how much outcomes depend on clear communication and trust, especially when one person can’t see the full picture.',
  },
  {
    id: 'sandcastle-constraints',
    name: 'Sandcastle With Constraints',
    purpose: 'Creativity under constraints, role division, and working to a spec.',
    time: '30 minutes',
    teamSize: '4–5 people per team',
    materials: ['Beach sand / sandbox', 'Buckets and tools', 'Constraint cards', 'Timer'],
    setup: [
      'Give each team a set of surprise constraints (e.g. "must have a bridge", "max height 30cm", "only 3 tools").',
      'Set the build time.',
      'Judge against the constraints, not just looks.',
    ],
    rules: [
      'All listed constraints must be met to score full points.',
      'Only provided tools may be used.',
      'Teams cannot add constraints to other teams.',
    ],
    scoring: 'Points for meeting each constraint, plus a creativity bonus.',
    debriefQuestions: [
      'How did your team divide the work?',
      'Who tracked the constraints, and how did you avoid missing one?',
      'How did constraints change your creativity?',
    ],
    discConnection:
      'I brings creative energy; C tracks the constraints; D keeps momentum; S keeps the team coordinated.',
    workConnection:
      'Mirrors real projects where requirements and limits matter as much as the idea itself.',
  },
  {
    id: 'pipeline-marble-run',
    name: 'Pipeline / Marble Run',
    purpose: 'Handoffs, shared planning, and synchronised execution.',
    time: '25–30 minutes',
    teamSize: '5–6 people per team',
    materials: ['Half-pipes / pipe segments / pool noodles', 'Marble or small ball', 'Target container', 'Timer'],
    setup: [
      'Each team member holds one pipe segment.',
      'They must move a marble from start to a target container using only their segments.',
      'Each person can only move while the marble is in their segment.',
    ],
    rules: [
      'The marble cannot be touched by hand.',
      'The marble cannot stop or roll backward.',
      'Everyone must participate in moving it.',
    ],
    scoring: 'Fastest successful delivery, or most deliveries in a set time.',
    debriefQuestions: [
      'How did you plan the handoff between segments?',
      'What happened the first time the marble dropped, and how did you recover?',
      'Who coordinated timing, and how?',
    ],
    discConnection:
      'D and I coordinate and energise; C and S keep the handoffs precise and steady. Every handoff needs both.',
    workConnection:
      'A direct metaphor for handoffs between people and teams — where most real work slows down or breaks.',
  },
  {
    id: 'survival-scenario',
    name: 'Survival Scenario',
    purpose: 'Group decision-making, persuasion, and balancing speed with analysis.',
    time: '25–30 minutes',
    teamSize: '4–6 people per team',
    materials: ['Scenario sheet', 'Item ranking list', 'Pens', 'Timer'],
    setup: [
      'Present a survival scenario (e.g. stranded after a boat sinks) with a list of items to rank by importance.',
      'Each person ranks individually first, then the team must agree on a single ranking.',
      'Optionally compare to an "expert" ranking at the end.',
    ],
    rules: [
      'The team must reach consensus on the final ranking — no majority votes.',
      'Everyone must contribute at least one argument.',
      'Fixed time limit for the group decision.',
    ],
    scoring: 'Compare the team ranking to the expert ranking; lower total difference is better.',
    debriefQuestions: [
      'How did your team reach consensus — or did a few voices dominate?',
      'Whose ideas almost got missed, and why?',
      'How did you balance deciding quickly with deciding well?',
    ],
    discConnection:
      'D pushes for a decision; C wants the analysis; I keeps people talking; S makes sure everyone is heard. Consensus needs all four.',
    workConnection:
      'Reflects how teams actually make decisions under pressure, and how easily good ideas get lost without deliberate listening.',
  },
];
