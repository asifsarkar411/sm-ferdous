'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const emptySubscribe = () => () => {};

export default function NavContent({ logoName, logoImage }) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const currentTheme = resolvedTheme || theme || 'dark';

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Journey', href: '#journey' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Hobbies', href: '#hobby' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header style={{
      position: 'fixed',
      top: '1rem',
      left: 0,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '0 1rem',
      pointerEvents: 'none'
    }}>
      <nav style={{ 
        pointerEvents: 'auto',
        maxWidth: '1100px',
        width: '100%',
        padding: '0.75rem 1.5rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        backgroundColor: 'var(--nav-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: 'var(--border-radius-pill)',
        border: '1px solid var(--color-border)',
        boxShadow: '0 8px 32px var(--color-shadow)',
        color: 'var(--color-text-primary)'
      }}>
        {/* Brand Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {logoImage ? (
            <motion.img 
              src={logoImage} 
              alt="Logo" 
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              style={{ height: '34px', width: '34px', objectFit: 'cover', borderRadius: '50%', border: '1px solid var(--color-border)' }} 
            />
          ) : (
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: '#050811', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem' }}>
              {(logoName || 'SF').slice(0, 2).toUpperCase()}
            </div>
          )}
          <span style={{ fontWeight: '700', fontSize: '1.05rem', color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}>
            {logoName || 'SM FERDOUS AHMMED'}
          </span>
        </Link>
        
        {/* Desktop Nav Links */}
        <div className="hide-on-mobile" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {navLinks.map(link => (
            <Link 
              key={link.label} 
              href={link.href} 
              className="nav-link-item"
              style={{ 
                fontSize: '0.9rem',
                fontWeight: '500',
                color: 'var(--color-text-secondary)', 
                transition: 'color 0.2s ease',
                padding: '0.35rem 0.6rem',
                borderRadius: '6px'
              }}
            >
              {link.label}
            </Link>
          ))}
          
          {mounted && (
            <button 
              type="button" 
              onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')} 
              aria-label="Toggle Theme" 
              style={{ 
                fontSize: '1.1rem', 
                color: 'var(--color-text-primary)', 
                marginLeft: '0.5rem', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                padding: '0.45rem',
                borderRadius: '50%',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                transition: 'all 0.2s ease'
              }}
              className="theme-btn-hover"
            >
              {currentTheme === 'dark' ? <FiSun /> : <FiMoon />}
            </button>
          )}
        </div>

        {/* Mobile Nav Toggle */}
        <div style={{ display: 'none' }} className="mobile-only-toggle">
          {mounted && (
            <button 
              type="button" 
              onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')} 
              aria-label="Toggle Theme" 
              style={{ fontSize: '1.2rem', color: 'var(--color-text-primary)', marginRight: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.4rem', borderRadius: '50%', backgroundColor: 'var(--color-surface)' }}
            >
              {currentTheme === 'dark' ? <FiSun /> : <FiMoon />}
            </button>
          )}
          <button type="button" onClick={() => setIsOpen(true)} aria-label="Open Navigation Menu" style={{ fontSize: '1.4rem', color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center' }}>
            <FiMenu />
          </button>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={() => setIsOpen(false)}
                style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 9999 }}
              />
              <motion.div 
                initial={{ x: '100%' }} 
                animate={{ x: 0 }} 
                exit={{ x: '100%' }} 
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                style={{ position: 'fixed', top: 0, right: 0, width: '270px', height: '100vh', backgroundColor: 'var(--color-bg-secondary)', zIndex: 10000, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', borderLeft: '1px solid var(--color-border)', boxShadow: 'var(--card-glow)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
                  <span style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--color-text-primary)' }}>Menu</span>
                  <button type="button" onClick={() => setIsOpen(false)} aria-label="Close Navigation Menu" style={{ fontSize: '1.4rem', color: 'var(--color-text-primary)' }}>
                    <FiX />
                  </button>
                </div>
                
                {navLinks.map(link => (
                  <Link 
                    key={link.label} 
                    href={link.href} 
                    onClick={() => setIsOpen(false)} 
                    style={{ fontSize: '1.05rem', fontWeight: '500', color: 'var(--color-text-primary)', padding: '0.4rem 0', transition: 'color 0.2s' }}
                  >
                    {link.label}
                  </Link>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <style dangerouslySetInnerHTML={{__html: `
          .nav-link-item:hover {
            color: var(--color-primary) !important;
          }
          .theme-btn-hover:hover {
            border-color: var(--color-primary);
            color: var(--color-primary);
          }
          @media (max-width: 768px) {
            .hide-on-mobile { display: none !important; }
            .mobile-only-toggle { display: flex !important; align-items: center; }
          }
        `}} />
      </nav>
    </header>
  );
}
