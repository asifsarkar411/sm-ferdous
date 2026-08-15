'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectCard({ project }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={{ 
      backgroundColor: 'var(--color-surface)', 
      borderRadius: '16px',
      border: '1px solid var(--color-border)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s ease',
      willChange: 'transform'
    }}>
      <div style={{ height: '210px', backgroundColor: 'var(--color-surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {project.imageUrl ? (
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} 
          />
        ) : (
          <span style={{ color: 'var(--color-text-secondary)' }}>No Image</span>
        )}
      </div>
      <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <span style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {project.category}
        </span>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{project.title}</h3>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
          {project.description}
        </p>
        
        <AnimatePresence>
          {isExpanded && project.detailsUrl && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ padding: '1rem', backgroundColor: 'var(--color-bg-primary)', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '0.88rem', color: 'var(--color-text-primary)', whiteSpace: 'pre-wrap', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                {project.detailsUrl}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ marginTop: 'auto', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {project.detailsUrl && (
            <button 
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="btn btn-outline" 
              style={{ flex: 1, padding: '0.65rem 1rem', fontSize: '0.9rem' }}
            >
              {isExpanded ? 'Hide Details' : 'Project Details'}
            </button>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ textAlign: 'center', flex: 1, padding: '0.65rem 1rem', fontSize: '0.9rem' }}>
              View Live &rarr;
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
