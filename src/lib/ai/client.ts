import Anthropic from '@anthropic-ai/sdk';

// Anthropic client + model selection for the conversational assessment.
// Requires ANTHROPIC_API_KEY in the environment (set it in Vercel / .env.local).

let client: Anthropic | null = null;

export function aiConfigured(): boolean {
  return !!process.env.ANTHROPIC_API_KEY;
}

export function getAnthropic(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY is not set');
  }
  if (!client) client = new Anthropic();
  return client;
}

// Defaults to the most capable model; override with DISC_CHAT_MODEL if you want
// to trade some quality for lower cost/latency (e.g. claude-sonnet-4-6).
export function chatModel(): string {
  return process.env.DISC_CHAT_MODEL || 'claude-opus-4-8';
}
