import crypto from 'node:crypto';
import { cookies } from 'next/headers';

// Lightweight admin session: a single shared password (from env) unlocks the
// dashboard and sets a signed, httpOnly cookie. This is an internal event tool,
// not a multi-user product, so a shared password is intentional and sufficient.

export const ADMIN_COOKIE = 'disc_admin';

function secret(): string {
  return process.env.ADMIN_SESSION_SECRET || 'disc-dev-secret-change-me';
}

export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || 'disc-admin-2026';
}

export function makeToken(): string {
  return crypto.createHmac('sha256', secret()).update('admin-session-v1').digest('hex');
}

export function verifyToken(token?: string | null): boolean {
  if (!token) return false;
  const expected = makeToken();
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/** Read the current request cookies and decide whether the caller is an admin. */
export function isAdmin(): boolean {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  return verifyToken(token);
}

export function checkPassword(input: string): boolean {
  const expected = adminPassword();
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
