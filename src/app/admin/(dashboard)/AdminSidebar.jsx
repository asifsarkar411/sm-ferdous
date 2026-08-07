'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on route change on mobile
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Header & Hamburger */}
      <div className="admin-mobile-header" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <h2 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', margin: 0 }}>Admin Panel</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <ThemeToggle />
          <button onClick={toggleSidebar} style={{ fontSize: '1.5rem', background: 'transparent', border: 'none', color: 'var(--color-text)', cursor: 'pointer' }}>
            ☰
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="admin-sidebar-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 99
          }}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`admin-sidebar ${isOpen ? 'open' : ''}`}
        style={{
          width: '250px',
          backgroundColor: 'var(--color-surface)',
          borderRight: '1px solid var(--color-border)',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          left: isOpen ? 0 : '-250px',
          height: '100vh',
          zIndex: 100,
          transition: 'left 0.3s ease',
          overflowY: 'auto'
        }}
      >
        <div className="admin-sidebar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-primary)' }}>Admin Panel</h2>
          <div className="desktop-theme-toggle">
            <ThemeToggle />
          </div>
          <button className="mobile-close-btn" onClick={() => setIsOpen(false)} style={{ fontSize: '1.5rem', background: 'transparent', border: 'none', color: 'var(--color-text)', cursor: 'pointer' }}>
            ✕
          </button>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
          <Link href="/admin" style={{ color: 'var(--color-text)', padding: '0.5rem', borderRadius: '8px', backgroundColor: pathname === '/admin' ? 'var(--color-surface-hover)' : 'transparent' }}>Dashboard</Link>
          <Link href="/admin/hero" style={{ color: 'var(--color-text)', padding: '0.5rem', borderRadius: '8px', backgroundColor: pathname === '/admin/hero' ? 'var(--color-surface-hover)' : 'transparent' }}>Manage Hero</Link>
          <Link href="/admin/about" style={{ color: 'var(--color-text)', padding: '0.5rem', borderRadius: '8px', backgroundColor: pathname === '/admin/about' ? 'var(--color-surface-hover)' : 'transparent' }}>Manage About</Link>
          <Link href="/admin/education" style={{ color: 'var(--color-text)', padding: '0.5rem', borderRadius: '8px', backgroundColor: pathname === '/admin/education' ? 'var(--color-surface-hover)' : 'transparent' }}>Manage Education</Link>
          <Link href="/admin/journey" style={{ color: 'var(--color-text)', padding: '0.5rem', borderRadius: '8px', backgroundColor: pathname === '/admin/journey' ? 'var(--color-surface-hover)' : 'transparent' }}>Manage Journey</Link>
          <Link href="/admin/skills" style={{ color: 'var(--color-text)', padding: '0.5rem', borderRadius: '8px', backgroundColor: pathname === '/admin/skills' ? 'var(--color-surface-hover)' : 'transparent' }}>Manage Skills</Link>
          <Link href="/admin/projects" style={{ color: 'var(--color-text)', padding: '0.5rem', borderRadius: '8px', backgroundColor: pathname === '/admin/projects' ? 'var(--color-surface-hover)' : 'transparent' }}>Manage Projects</Link>
          <Link href="/admin/messages" style={{ color: 'var(--color-text)', padding: '0.5rem', borderRadius: '8px', backgroundColor: pathname === '/admin/messages' ? 'var(--color-surface-hover)' : 'transparent' }}>Inbox (Messages)</Link>
          <Link href="/admin/contact" style={{ color: 'var(--color-text)', padding: '0.5rem', borderRadius: '8px', backgroundColor: pathname === '/admin/contact' ? 'var(--color-surface-hover)' : 'transparent' }}>Manage Contact</Link>
          <Link href="/admin/cvs" style={{ color: 'var(--color-text)', padding: '0.5rem', borderRadius: '8px', backgroundColor: pathname === '/admin/cvs' ? 'var(--color-surface-hover)' : 'transparent' }}>Manage CVs</Link>
          <Link href="/admin/settings" style={{ color: 'var(--color-text)', padding: '0.5rem', borderRadius: '8px', backgroundColor: pathname === '/admin/settings' ? 'var(--color-surface-hover)' : 'transparent' }}>⚙️ Settings</Link>
          
          <div style={{ marginTop: 'auto' }}>
            <Link href="/" style={{ color: 'var(--color-text-secondary)', display: 'inline-block', marginTop: '2rem', padding: '0.5rem' }}>&larr; Back to Site</Link>
          </div>
        </nav>
      </aside>
    </>
  );
}
