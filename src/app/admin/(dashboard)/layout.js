import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminSidebar from './AdminSidebar';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="admin-container" style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', flexDirection: 'column' }}>
      <AdminSidebar />
      <main className="admin-main-content" style={{ flex: 1, padding: '3rem', backgroundColor: 'var(--color-bg)', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
