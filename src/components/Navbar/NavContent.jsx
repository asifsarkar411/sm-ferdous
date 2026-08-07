'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

export default function NavContent({ logoName, logoImage }) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

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
      backgroundColor: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
      borderBottom: '1px solid var(--color-border)',
      color: '#fff' // keep nav dark or adapt to theme, let's let theme dictate a bit but navbar is usually distinct.
    }}>
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {logoImage && <img src={logoImage} alt="Logo" style={{ height: '40px', width: 'auto', borderRadius: '4px' }} />}
        <div style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--color-primary)' }}>
          {logoName || 'Logo'}
        </div>
      </Link>
      
      {/* Desktop Nav */}
      <div className="hide-on-mobile" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {navLinks.map(link => (
          <Link key={link.label} href={link.href}>{link.label}</Link>
        ))}
        
        {mounted && (
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} style={{ fontSize: '1.2rem', color: 'inherit', marginLeft: '1rem' }}>
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
        )}
        
        <Link href="/admin" className="btn btn-outline" style={{ borderColor: 'currentColor', color: 'currentColor', padding: '0.4rem 1rem' }}>
          Admin
        </Link>
      </div>

      {/* Mobile Nav Toggle */}
      <div style={{ display: 'none' }} className="mobile-only-toggle">
        {mounted && (
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} style={{ fontSize: '1.5rem', color: 'inherit', marginRight: '1rem' }}>
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
        )}
        <button onClick={() => setIsOpen(true)} style={{ fontSize: '1.5rem', color: 'inherit' }}>
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
              style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999 }}
            />
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }} 
              transition={{ type: 'spring', damping: 20 }}
              style={{ position: 'fixed', top: 0, right: 0, width: '250px', height: '100vh', backgroundColor: 'var(--color-bg-secondary)', zIndex: 10000, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              <button onClick={() => setIsOpen(false)} style={{ alignSelf: 'flex-end', fontSize: '1.5rem', color: 'var(--color-text-primary)' }}>
                <FiX />
              </button>
              
              {navLinks.map(link => (
                <Link key={link.label} href={link.href} onClick={() => setIsOpen(false)} style={{ fontSize: '1.2rem', color: 'var(--color-text-primary)' }}>
                  {link.label}
                </Link>
              ))}
              
              <Link href="/admin" onClick={() => setIsOpen(false)} className="btn btn-outline" style={{ marginTop: 'auto', borderColor: 'var(--color-text-primary)', color: 'var(--color-text-primary)' }}>
                Admin Dashboard
              </Link>
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
