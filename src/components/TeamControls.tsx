'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PrintButton from './PrintButton';

export default function TeamControls({ numTeams }: { numTeams: number }) {
  const router = useRouter();
  const [teams, setTeams] = useState(numTeams);

  function apply(seed?: number) {
    const s = seed ?? Math.floor(Math.random() * 1_000_000);
    router.push(`/admin/teams?teams=${teams}&seed=${s}`);
  }

  return (
    <div className="no-print flex flex-wrap items-center gap-3">
      <label className="flex items-center gap-2 text-sm text-slate-600">
        Number of teams
        <input
          type="number"
          min={1}
          max={20}
          value={teams}
          onChange={(e) => setTeams(Math.max(1, Number(e.target.value) || 1))}
          className="w-20 rounded-lg border border-slate-300 px-2 py-1.5 text-sm focus:border-slate-500 focus:outline-none"
        />
      </label>
      <button
        onClick={() => apply()}
        className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
      >
        Generate / Regenerate
      </button>
      <PrintButton label="Print teams" />
    </div>
  );
}
