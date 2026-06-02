import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';
import { listEmployees } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function csvCell(v: unknown): string {
  const s = v === null || v === undefined ? '' : String(v);
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export async function GET() {
  if (!isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const employees = await listEmployees();
  const header = [
    'ID',
    'Name',
    'Department',
    'Role',
    'Email',
    'Language',
    'Primary Style',
    'Secondary Style',
    'Style Blend',
    'Confidence',
    'D',
    'I',
    'S',
    'C',
    'Completed At',
    'Handout Generated',
    'Method',
  ];

  const rows = employees.map((e) =>
    [
      e.id,
      e.name,
      e.department,
      e.role,
      e.email ?? '',
      e.language,
      e.primary,
      e.secondary,
      e.blend,
      e.confidence,
      e.scores.D,
      e.scores.I,
      e.scores.S,
      e.scores.C,
      e.completedAt,
      e.handoutGenerated ? 'yes' : 'no',
      e.method,
    ]
      .map(csvCell)
      .join(',')
  );

  const csv = [header.map(csvCell).join(','), ...rows].join('\n');
  // BOM so Excel reads UTF-8 (Vietnamese names) correctly.
  const body = '﻿' + csv;

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="disc-assessment-results.csv"`,
    },
  });
}
