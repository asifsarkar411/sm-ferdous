'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

const emptySubscribe = () => () => {};

export default function ThemeToggle() {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  if (!mounted) return <div style={{ width: '24px', height: '24px' }} />;

  const currentTheme = resolvedTheme || theme || 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
      style={{
        background: 'none',
        border: 'none',
        color: 'var(--color-text)',
        cursor: 'pointer',
        fontSize: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.5rem',
        borderRadius: '50%',
        transition: 'background-color 0.2s',
      }}
      aria-label="Toggle Theme"
    >
      {currentTheme === 'dark' ? <FiSun /> : <FiMoon />}
    </button>
  );
}
