import type { Employee } from './db';
import { MAX_SCORE } from './scoring';
import type { Style } from './content/questions';
import { STYLE_CONTENT, STYLE_LABELS, STYLE_COLORS, blendDescription, type Lang } from './content/styles';

export interface ScoreBar {
  style: Style;
  label: string;
  color: string;
  score: number;
  pct: number; // 0..100 of MAX_SCORE
}

export interface HandoutData {
  lang: Lang;
  name: string;
  department: string;
  role: string;
  primaryLabel: string;
  secondaryLabel: string;
  blend: string;
  blendText: string;
  summary: string;
  strengths: string[];
  blindSpots: string[];
  whatMayFrustrateYou: string;
  whatOthersMisunderstand: string;
  communicateWithYou: string;
  communicateBetter: string;
  duringGames: string;
  growthChallenge: string;
  bars: ScoreBar[];
  disclaimer: string;
  footer: string;
}

const DISCLAIMER: Record<Lang, string> = {
  en: 'This is not a label. It is a tool to help us understand how we communicate, lead, solve problems, and support each other.',
  vi: 'Đây không phải là một cái nhãn. Đây là một công cụ giúp chúng ta hiểu cách mình giao tiếp, dẫn dắt, giải quyết vấn đề và hỗ trợ lẫn nhau.',
};

const FOOTER: Record<Lang, string> = {
  en: 'This is not a label. It is a tool for better communication.',
  vi: 'Đây không phải là một cái nhãn. Đây là một công cụ để giao tiếp tốt hơn.',
};

export function buildBars(scores: Record<Style, number>, lang: Lang): ScoreBar[] {
  return (['D', 'I', 'S', 'C'] as Style[]).map((style) => ({
    style,
    label: STYLE_LABELS[style][lang],
    color: STYLE_COLORS[style],
    score: scores[style],
    pct: Math.round((scores[style] / MAX_SCORE) * 100),
  }));
}

/** Build the resolved handout content for an employee in the given language. */
export function buildHandout(emp: Employee, lang: Lang): HandoutData {
  const p = STYLE_CONTENT[emp.primary][lang];
  const s = STYLE_CONTENT[emp.secondary][lang];

  return {
    lang,
    name: emp.name,
    department: emp.department,
    role: emp.role,
    primaryLabel: p.label,
    secondaryLabel: s.label,
    blend: emp.blend,
    blendText: blendDescription(emp.primary, emp.secondary, lang),
    summary: p.summary,
    strengths: p.strengths,
    blindSpots: p.blindSpots,
    whatMayFrustrateYou: p.whatMayFrustrateYou,
    whatOthersMisunderstand: p.whatOthersMisunderstand,
    communicateWithYou: p.communicateWithThem,
    communicateBetter: p.communicateBetter,
    duringGames: p.duringGames,
    growthChallenge: p.growthChallenge,
    bars: buildBars(emp.scores, lang),
    disclaimer: DISCLAIMER[lang],
    footer: FOOTER[lang],
  };
}
