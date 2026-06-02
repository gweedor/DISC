import { Suspense } from 'react';
import AssessmentClient from './AssessmentClient';

export default function AssessPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-slate-400">Loading…</div>}>
      <AssessmentClient />
    </Suspense>
  );
}
