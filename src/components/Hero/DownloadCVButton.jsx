'use client';
import { useState } from 'react';

export default function DownloadCVButton({ cvs = [], fallbackUrl }) {
  const [isOpen, setIsOpen] = useState(false);
  const activeCVs = Array.isArray(cvs) ? cvs.filter(cv => cv && !cv.isHidden) : [];

  if (activeCVs.length === 0) {
    return (
      <a href={fallbackUrl || '#contact'} download className="btn btn-outline" style={{ padding: '0.75rem 1.5rem', cursor: 'pointer' }}>
        Download CV &darr;
      </a>
    );
  }

  if (activeCVs.length === 1) {
    const title = activeCVs[0]?.title ? activeCVs[0].title.replace(/\s+/g, '_') : 'CV';
    return (
      <a href={activeCVs[0]?.fileUrl || '#'} download={title} className="btn btn-outline" style={{ padding: '0.75rem 1.5rem', cursor: 'pointer' }}>
        Download CV &darr;
      </a>
    );
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)} 
        className="btn btn-outline" 
        style={{ padding: '0.75rem 1.5rem', cursor: 'pointer', background: 'transparent', color: 'var(--color-primary)', border: '1px solid var(--color-primary)' }}
      >
        Download CV &darr;
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '0',
          marginTop: '0.5rem',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          boxShadow: 'var(--shadow-md)',
          zIndex: 50,
          minWidth: '200px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {activeCVs.map(cv => {
            const title = cv?.title ? cv.title.replace(/\s+/g, '_') : 'CV';
            return (
              <a 
                key={cv.id}
                href={cv.fileUrl || '#'}
                download={title}
                style={{
                  padding: '0.75rem 1rem',
                  color: 'var(--color-text)',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--color-border)',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                onClick={() => setIsOpen(false)}
              >
                {cv.title || 'Download CV'}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
