import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <aside style={{ width: '250px', backgroundColor: 'var(--color-surface)', borderRight: '1px solid var(--color-border)', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary)' }}>Admin Panel</h2>
          <ThemeToggle />
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
          <Link href="/admin" style={{ color: 'var(--color-text)' }}>Dashboard</Link>
          <Link href="/admin/hero" style={{ color: 'var(--color-text)' }}>Manage Hero</Link>
          <Link href="/admin/about" style={{ color: 'var(--color-text)' }}>Manage About</Link>
          <Link href="/admin/education" style={{ color: 'var(--color-text)' }}>Manage Education</Link>
          <Link href="/admin/journey" style={{ color: 'var(--color-text)' }}>Manage Journey</Link>
          <Link href="/admin/skills" style={{ color: 'var(--color-text)' }}>Manage Skills</Link>
          <Link href="/admin/projects" style={{ color: 'var(--color-text)' }}>Manage Projects</Link>
          <Link href="/admin/messages" style={{ color: 'var(--color-text)' }}>Inbox (Messages)</Link>
          <Link href="/admin/contact" style={{ color: 'var(--color-text)' }}>Manage Contact</Link>
          <Link href="/admin/cvs" style={{ color: 'var(--color-text)' }}>Manage CVs</Link>
          <Link href="/admin/settings" style={{ color: 'var(--color-text)' }}>⚙️ Settings</Link>
          <div style={{ marginTop: 'auto' }}>
            <Link href="/" style={{ color: 'var(--color-text-secondary)', display: 'inline-block', marginTop: '2rem' }}>&larr; Back to Site</Link>
          </div>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '3rem', backgroundColor: 'var(--color-bg)' }}>
        {children}
      </main>
    </div>
  );
}
