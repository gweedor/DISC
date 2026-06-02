import { QUESTIONS, STYLE_ORDER, type Style } from './content/questions';

// One employee's raw selections. `most` is required per question, `least`
// is optional. Keyed by question id.
export interface AnswerSelection {
  questionId: number;
  most: Style;
  least?: Style | null;
}

export interface Scores {
  D: number;
  I: number;
  S: number;
  C: number;
}

export type Confidence = 'High' | 'Medium' | 'Balanced';

export interface AssessmentResult {
  scores: Scores; // count of "most like me" picks per style
  leastCounts: Scores; // count of "least like me" picks per style
  ranking: Style[]; // styles sorted strongest -> weakest
  primary: Style;
  secondary: Style;
  blend: string; // e.g. "D/C"
  gap: number; // primary score - secondary score
  confidence: Confidence;
}

const ZERO = (): Scores => ({ D: 0, I: 0, S: 0, C: 0 });

/**
 * Transparent scoring:
 *  - Each "most like me" pick adds 1 point to that style.
 *  - "least like me" picks are counted separately and used only as a
 *    tiebreaker (a style picked as "least" more often ranks lower).
 *  - Primary = highest score, Secondary = second highest.
 *  - Confidence: High if primary beats secondary by 3+, Medium by 1–2,
 *    Balanced if they are tied (two or more styles close together).
 */
export function score(selections: AnswerSelection[]): AssessmentResult {
  const scores = ZERO();
  const leastCounts = ZERO();

  for (const sel of selections) {
    if (sel.most) scores[sel.most] += 1;
    if (sel.least) leastCounts[sel.least] += 1;
  }

  const ranking = [...STYLE_ORDER].sort((a, b) => {
    if (scores[b] !== scores[a]) return scores[b] - scores[a];
    // tiebreak: fewer "least" picks ranks higher
    if (leastCounts[a] !== leastCounts[b]) return leastCounts[a] - leastCounts[b];
    // final stable tiebreak: D, I, S, C order
    return STYLE_ORDER.indexOf(a) - STYLE_ORDER.indexOf(b);
  });

  const primary = ranking[0];
  const secondary = ranking[1];
  const gap = scores[primary] - scores[secondary];

  let confidence: Confidence;
  if (gap >= 3) confidence = 'High';
  else if (gap >= 1) confidence = 'Medium';
  else confidence = 'Balanced';

  return {
    scores,
    leastCounts,
    ranking,
    primary,
    secondary,
    blend: `${primary}/${secondary}`,
    gap,
    confidence,
  };
}

/** Validate that a set of selections covers every question with a valid most pick. */
export function validateSelections(selections: AnswerSelection[]): string | null {
  const byId = new Map<number, AnswerSelection>();
  for (const s of selections) byId.set(s.questionId, s);

  for (const q of QUESTIONS) {
    const sel = byId.get(q.id);
    if (!sel || !sel.most) return `Missing answer for question ${q.id}`;
    if (!STYLE_ORDER.includes(sel.most)) return `Invalid answer for question ${q.id}`;
    if (sel.least && sel.least === sel.most)
      return `"Most" and "least" are the same for question ${q.id}`;
  }
  return null;
}

export const MAX_SCORE = QUESTIONS.length;
