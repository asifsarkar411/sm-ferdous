import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Welcome to the Admin Dashboard</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Logged in as: <strong>{session?.email}</strong>
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ marginBottom: '1rem' }}>Hero Section</h3>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>Update your main title, subtitle, and profile picture.</p>
          <a href="/admin/hero" className="btn btn-outline" style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}>Manage &rarr;</a>
        </div>
        
        <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ marginBottom: '1rem' }}>About Section</h3>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>Update your bio and experience.</p>
          <a href="/admin/about" className="btn btn-outline" style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}>Manage &rarr;</a>
        </div>
        
        <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ marginBottom: '1rem' }}>Services</h3>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>Add or edit your coaching services.</p>
          <a href="/admin/services" className="btn btn-outline" style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}>Manage &rarr;</a>
        </div>
        
        <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ marginBottom: '1rem' }}>Testimonials</h3>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>Manage your client reviews and success stories.</p>
          <a href="/admin/testimonials" className="btn btn-outline" style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}>Manage &rarr;</a>
        </div>
      </div>
    </div>
  );
}
