'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Style } from '@/lib/content/questions';
import { STYLE_COLORS } from '@/lib/content/styles';

export interface TableRow {
  id: number;
  name: string;
  department: string;
  role: string;
  primary: Style;
  secondary: Style;
  blend: string;
  D: number;
  I: number;
  S: number;
  C: number;
  completedAt: string;
  handoutGenerated: boolean;
}

function StyleBadge({ style }: { style: Style }) {
  return (
    <span
      className="inline-block rounded px-1.5 py-0.5 text-xs font-semibold text-white"
      style={{ background: STYLE_COLORS[style] }}
    >
      {style}
    </span>
  );
}

export default function EmployeeTable({ rows }: { rows: TableRow[] }) {
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState<'all' | Style>('all');

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (filter !== 'all' && r.primary !== filter) return false;
      if (!term) return true;
      return (
        r.name.toLowerCase().includes(term) ||
        r.department.toLowerCase().includes(term) ||
        r.role.toLowerCase().includes(term) ||
        r.blend.toLowerCase().includes(term)
      );
    });
  }, [rows, q, filter]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, department, role, blend…"
          className="w-72 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        />
        <div className="flex items-center gap-1 text-sm">
          <span className="text-slate-500">Style:</span>
          {(['all', 'D', 'I', 'S', 'C'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-lg px-2.5 py-1 ${
                filter === s ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100'
              }`}
            >
              {s === 'all' ? 'All' : s}
            </button>
          ))}
        </div>
        <span className="ml-auto text-sm text-slate-500">
          {filtered.length} of {rows.length}
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-3 py-2.5 font-medium">Name</th>
              <th className="px-3 py-2.5 font-medium">Department</th>
              <th className="px-3 py-2.5 font-medium">Role</th>
              <th className="px-3 py-2.5 font-medium">Primary</th>
              <th className="px-3 py-2.5 font-medium">Secondary</th>
              <th className="px-3 py-2.5 font-medium">Blend</th>
              <th className="px-3 py-2.5 text-center font-medium">D</th>
              <th className="px-3 py-2.5 text-center font-medium">I</th>
              <th className="px-3 py-2.5 text-center font-medium">S</th>
              <th className="px-3 py-2.5 text-center font-medium">C</th>
              <th className="px-3 py-2.5 font-medium">Completed</th>
              <th className="px-3 py-2.5 font-medium">Handout</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50">
                <td className="px-3 py-2.5">
                  <Link href={`/admin/employee/${r.id}`} className="font-medium text-slate-900 hover:underline">
                    {r.name}
                  </Link>
                </td>
                <td className="px-3 py-2.5 text-slate-600">{r.department}</td>
                <td className="px-3 py-2.5 text-slate-600">{r.role}</td>
                <td className="px-3 py-2.5">
                  <StyleBadge style={r.primary} />
                </td>
                <td className="px-3 py-2.5">
                  <StyleBadge style={r.secondary} />
                </td>
                <td className="px-3 py-2.5 text-slate-600">{r.blend}</td>
                <td className="px-3 py-2.5 text-center text-slate-600">{r.D}</td>
                <td className="px-3 py-2.5 text-center text-slate-600">{r.I}</td>
                <td className="px-3 py-2.5 text-center text-slate-600">{r.S}</td>
                <td className="px-3 py-2.5 text-center text-slate-600">{r.C}</td>
                <td className="px-3 py-2.5 text-slate-500">
                  {new Date(r.completedAt).toLocaleString()}
                </td>
                <td className="px-3 py-2.5">
                  {r.handoutGenerated ? (
                    <span className="text-green-600">yes</span>
                  ) : (
                    <span className="text-slate-400">no</span>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={12} className="px-3 py-8 text-center text-slate-400">
                  No matching employees.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
