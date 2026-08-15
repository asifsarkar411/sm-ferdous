'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: email.trim().toLowerCase(),
        password,
      });

      if (res?.error) {
        setError('Invalid email or password');
        setLoading(false);
      } else if (res?.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        setError('Login failed. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      setError('Connection failed. Please try again in a moment.');
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: 'var(--color-bg-primary)', padding: '1rem' }}>
      <form onSubmit={handleSubmit} style={{ backgroundColor: 'var(--color-surface)', padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ marginBottom: '1.5rem', textAlign: 'center', fontSize: '1.75rem' }}>Admin Login</h1>
        
        {error && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.25rem', fontSize: '0.9rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Email Address</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
            placeholder="admin@example.com"
            required
            disabled={loading}
          />
        </div>
        
        <div style={{ marginBottom: '1.75rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
            placeholder="••••••••"
            required
            disabled={loading}
          />
        </div>
        
        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }} disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
