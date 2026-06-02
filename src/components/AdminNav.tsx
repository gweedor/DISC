'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const LINKS = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/team-report', label: 'Team Report' },
  { href: '/admin/teams', label: 'Team Assignments' },
  { href: '/admin/facilitator', label: 'Facilitator Guide' },
  { href: '/admin/handouts', label: 'Handouts & Export' },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <header className="no-print sticky top-0 z-10 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3">
        <Link href="/admin" className="mr-2 flex items-center gap-2 font-semibold text-slate-900">
          <span className="flex gap-0.5">
            <span className="h-2 w-2 rounded-full bg-disc-d" />
            <span className="h-2 w-2 rounded-full bg-disc-i" />
            <span className="h-2 w-2 rounded-full bg-disc-s" />
            <span className="h-2 w-2 rounded-full bg-disc-c" />
          </span>
          Admin
        </Link>
        <nav className="flex flex-wrap items-center gap-1 text-sm">
          {LINKS.map((l) => {
            const active = pathname === l.href || (l.href !== '/admin' && pathname.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-lg px-3 py-1.5 ${
                  active ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={logout}
          className="ml-auto rounded-lg px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-100"
        >
          Log out
        </button>
      </div>
    </header>
  );
}
