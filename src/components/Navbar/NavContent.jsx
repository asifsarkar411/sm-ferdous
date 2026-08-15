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
    { label: 'Hobby', href: '#hobby' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav style={{ 
      padding: '1rem 2rem', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      backgroundColor: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      zIndex: 1000,
      borderBottom: '1px solid var(--color-border)',
      color: '#fff'
    }}>
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {logoImage && (
          <motion.img 
            src={logoImage} 
            alt="Logo" 
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            style={{ height: '40px', width: '40px', objectFit: 'cover', borderRadius: '50%' }} 
          />
        )}
        <div style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--color-primary)' }}>
          {logoName || 'SM FERDOUS AHMMED'}
        </div>
      </Link>
      
      {/* Desktop Nav */}
      <div className="hide-on-mobile" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {navLinks.map(link => (
          <Link key={link.label} href={link.href} style={{ transition: 'color 0.2s ease', color: 'inherit' }}>
            {link.label}
          </Link>
        ))}
        
        {mounted && (
          <button 
            type="button" 
            onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')} 
            aria-label="Toggle Theme" 
            style={{ fontSize: '1.2rem', color: 'inherit', marginLeft: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
            style={{ fontSize: '1.4rem', color: 'inherit', marginRight: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {currentTheme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
        )}
        <button type="button" onClick={() => setIsOpen(true)} aria-label="Open Navigation Menu" style={{ fontSize: '1.5rem', color: 'inherit', display: 'flex', alignItems: 'center' }}>
          <FiMenu />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsOpen(false)}
              style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9999 }}
            />
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }} 
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{ position: 'fixed', top: 0, right: 0, width: '260px', height: '100vh', backgroundColor: 'var(--color-bg-secondary)', zIndex: 10000, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', boxShadow: 'var(--shadow-md)' }}
            >
              <button type="button" onClick={() => setIsOpen(false)} aria-label="Close Navigation Menu" style={{ alignSelf: 'flex-end', fontSize: '1.5rem', color: 'var(--color-text-primary)' }}>
                <FiX />
              </button>
              
              {navLinks.map(link => (
                <Link key={link.label} href={link.href} onClick={() => setIsOpen(false)} style={{ fontSize: '1.15rem', color: 'var(--color-text-primary)', padding: '0.4rem 0' }}>
                  {link.label}
                </Link>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .hide-on-mobile { display: none !important; }
          .mobile-only-toggle { display: flex !important; align-items: center; }
        }
      `}} />
    </nav>
  );
}
