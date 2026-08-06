import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <aside style={{ width: '250px', backgroundColor: '#fff', borderRight: '1px solid #eaeaea', padding: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--color-hero-bg)' }}>Admin Panel</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/hero">Manage Hero</Link>
          <Link href="/admin/about">Manage About</Link>
          <Link href="/admin/services">Manage Services</Link>
          <Link href="/admin/testimonials">Manage Testimonials</Link>
          <Link href="/" style={{ marginTop: '2rem', color: 'var(--color-text-secondary)' }}>&larr; Back to Site</Link>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '3rem' }}>
        {children}
      </main>
    </div>
  );
}
