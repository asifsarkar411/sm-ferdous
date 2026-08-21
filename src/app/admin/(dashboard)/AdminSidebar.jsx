'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(prev => !prev);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const navLinks = [
    { href: '/admin', label: '📊 Dashboard' },
    { href: '/admin/hero', label: '🦸 Manage Hero' },
    { href: '/admin/about', label: '👤 Manage About' },
    { href: '/admin/education', label: '🎓 Manage Education' },
    { href: '/admin/journey', label: '🚀 Manage Journey' },
    { href: '/admin/skills', label: '⚡ Manage Skills' },
    { href: '/admin/languages', label: '🌐 Manage Languages' },
    { href: '/admin/projects', label: '💼 Manage Projects' },
    { href: '/admin/services', label: '🛠️ Manage Services' },
    { href: '/admin/testimonials', label: '💬 Testimonials' },
    { href: '/admin/hobbies', label: '🎨 Manage Hobbies' },
    { href: '/admin/cvs', label: '📄 Manage CVs' },
    { href: '/admin/messages', label: '✉️ Inbox (Messages)' },
    { href: '/admin/contact', label: '📞 Manage Contact' },
    { href: '/admin/settings', label: '⚙️ Settings' },
  ];

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
          <button type="button" onClick={toggleSidebar} aria-label="Toggle Navigation" style={{ fontSize: '1.5rem', background: 'transparent', border: 'none', color: 'var(--color-text)', cursor: 'pointer' }}>
            ☰
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          onClick={closeSidebar}
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
          backgroundColor: 'var(--color-bg-secondary)',
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
          <button type="button" className="mobile-close-btn" onClick={closeSidebar} aria-label="Close Navigation" style={{ fontSize: '1.5rem', background: 'transparent', border: 'none', color: 'var(--color-text)', cursor: 'pointer' }}>
            ✕
          </button>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeSidebar}
              style={{
                color: 'var(--color-text)',
                padding: '0.5rem 0.75rem',
                borderRadius: '8px',
                backgroundColor: pathname === item.href ? 'var(--color-surface-hover)' : 'transparent',
                fontWeight: pathname === item.href ? '600' : 'normal',
                textDecoration: 'none'
              }}
            >
              {item.label}
            </Link>
          ))}
          
          <div style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
            <Link href="/" style={{ color: 'var(--color-text-secondary)', display: 'inline-block', padding: '0.5rem', textDecoration: 'none' }}>
              &larr; Back to Site
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}
