import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/auth';
import AdminNav from '@/components/AdminNav';

export const dynamic = 'force-dynamic';

export default function AdminDashLayout({ children }: { children: React.ReactNode }) {
  if (!isAdmin()) redirect('/admin/login');

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNav />
      <div className="mx-auto max-w-6xl px-5 py-8">{children}</div>
    </div>
  );
}
