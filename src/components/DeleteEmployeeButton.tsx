'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteEmployeeButton({ id, name }: { id: number; name: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function del() {
    if (!confirm(`Delete ${name}'s assessment? This cannot be undone.`)) return;
    setBusy(true);
    await fetch('/api/admin/employee', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', id }),
    });
    router.push('/admin');
    router.refresh();
  }

  return (
    <button
      onClick={del}
      disabled={busy}
      className="rounded-lg px-3 py-1.5 text-sm text-red-600 ring-1 ring-red-200 hover:bg-red-50 disabled:opacity-60"
    >
      {busy ? 'Deleting…' : 'Delete'}
    </button>
  );
}
