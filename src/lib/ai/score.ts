import { getAnthropic, chatModel } from './client';
import type { Lang } from '../content/styles';
import type { Style } from '../content/questions';
import type { Scores } from '../scoring';
import { MAX_SCORE } from '../scoring';
import type { ChatMessage } from './interview';

export interface ConversationScore {
  scores: Scores; // integers summing to MAX_SCORE (same scale as the questionnaire)
  evidence: Record<Style, string>;
  rationale: string;
}

const SUBMIT_TOOL = {
  name: 'submit_assessment',
  description:
    'Submit the DISC-style read of the conversation. Provide a relative weight (0-100) for each of the four tendencies based on the behavioural evidence, brief evidence per tendency citing what the person actually said or did, and a short overall rationale.',
  input_schema: {
    type: 'object' as const,
    properties: {
      d_weight: { type: 'number', description: 'Direct/Decisive weight, 0-100' },
      i_weight: { type: 'number', description: 'Social/Energising weight, 0-100' },
      s_weight: { type: 'number', description: 'Steady/Supportive weight, 0-100' },
      c_weight: { type: 'number', description: 'Careful/Detail weight, 0-100' },
      d_evidence: { type: 'string', description: 'Brief evidence for Direct/Decisive (1-2 sentences).' },
      i_evidence: { type: 'string', description: 'Brief evidence for Social/Energising (1-2 sentences).' },
      s_evidence: { type: 'string', description: 'Brief evidence for Steady/Supportive (1-2 sentences).' },
      c_evidence: { type: 'string', description: 'Brief evidence for Careful/Detail (1-2 sentences).' },
      rationale: { type: 'string', description: 'Overall 2-3 sentence rationale for the read.' },
    },
    required: [
      'd_weight', 'i_weight', 's_weight', 'c_weight',
      'd_evidence', 'i_evidence', 's_evidence', 'c_evidence', 'rationale',
    ],
    additionalProperties: false,
  },
};

const SYSTEM = `You are an expert at reading communication and behavioural tendencies from a casual conversation, for an internal team-building exercise (not clinical, not an official DISC test).

You will receive a transcript of a relaxed chat about everyday, non-work situations. Infer the person's relative emphasis across four tendencies:
- D (Direct/Decisive): fast pace, taking charge, deciding quickly, bluntness, drive for results.
- I (Social/Energising): sociability, expressiveness, optimism, talking things out, enjoying people.
- S (Steady/Supportive): patience, calm, avoiding conflict/sudden change, caring for others, loyalty.
- C (Careful/Detail): planning, precision, structure, caution, wanting things correct.

Judge actual behaviour described (what they say they DO in concrete situations), not flattering self-description — discount answers that just sound good. Weigh the whole conversation and note where the evidence is thin. Everyone is a blend; reflect genuine differences in emphasis across the four weights rather than making them all equal. Then call submit_assessment exactly once.`;

function transcriptText(history: ChatMessage[], lang: Lang): string {
  const facilitator = lang === 'vi' ? 'Người dẫn dắt' : 'Facilitator';
  const person = lang === 'vi' ? 'Người tham gia' : 'Person';
  return history
    .map((m) => `${m.role === 'assistant' ? facilitator : person}: ${m.content}`)
    .join('\n\n');
}

// Turn four 0-100 weights into integer scores that sum to MAX_SCORE, so the
// result lines up with the questionnaire's scale (bars, confidence, CSV).
function weightsToScores(w: Record<Style, number>): Scores {
  const styles: Style[] = ['D', 'I', 'S', 'C'];
  const clamped = styles.map((s) => Math.max(0, Number(w[s]) || 0));
  const total = clamped.reduce((a, b) => a + b, 0) || 1;
  const raw = styles.map((_, i) => (clamped[i] / total) * MAX_SCORE);
  const floored = raw.map((x) => Math.floor(x));
  let remainder = MAX_SCORE - floored.reduce((a, b) => a + b, 0);
  // distribute the remainder to the largest fractional parts
  const order = raw
    .map((x, i) => ({ i, frac: x - Math.floor(x) }))
    .sort((a, b) => b.frac - a.frac);
  for (let k = 0; k < order.length && remainder > 0; k++) {
    floored[order[k].i]++;
    remainder--;
  }
  return { D: floored[0], I: floored[1], S: floored[2], C: floored[3] };
}

export async function scoreConversation(history: ChatMessage[], lang: Lang): Promise<ConversationScore> {
  const client = getAnthropic();

  const res = await client.messages.create({
    model: chatModel(),
    max_tokens: 1500,
    output_config: { effort: 'high' },
    system: SYSTEM,
    tools: [SUBMIT_TOOL],
    tool_choice: { type: 'tool', name: 'submit_assessment' },
    messages: [
      {
        role: 'user',
        content: `Here is the conversation transcript. Read it and submit your assessment.\n\n${transcriptText(history, lang)}`,
      },
    ],
  });

  const toolUse = res.content.find((b) => b.type === 'tool_use');
  if (!toolUse || toolUse.type !== 'tool_use') {
    throw new Error('Scorer did not return a structured assessment');
  }
  const input = toolUse.input as Record<string, unknown>;

  const scores = weightsToScores({
    D: Number(input.d_weight),
    I: Number(input.i_weight),
    S: Number(input.s_weight),
    C: Number(input.c_weight),
  });

  return {
    scores,
    evidence: {
      D: String(input.d_evidence ?? ''),
      I: String(input.i_evidence ?? ''),
      S: String(input.s_evidence ?? ''),
      C: String(input.c_evidence ?? ''),
    },
    rationale: String(input.rationale ?? ''),
  };
}
