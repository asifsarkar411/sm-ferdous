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
      flexDirection: 'column'
    }}>
      <div style={{ height: '200px', backgroundColor: 'var(--color-surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {project.imageUrl ? (
          <img src={project.imageUrl} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span style={{ color: 'var(--color-text-secondary)' }}>No Image</span>
        )}
      </div>
      <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <span style={{ color: 'var(--color-primary)', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{project.category}</span>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{project.title}</h3>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{project.description}</p>
        
        <AnimatePresence>
          {isExpanded && project.detailsUrl && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 'auto', opacity: 1, marginTop: '1rem' }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ padding: '1rem', backgroundColor: 'var(--color-bg-primary)', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '0.9rem', color: 'var(--color-text-primary)', whiteSpace: 'pre-wrap', marginBottom: '1.5rem' }}>
                {project.detailsUrl}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {project.detailsUrl && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="btn btn-outline" 
              style={{ flex: 1, padding: '0.75rem 1rem' }}
            >
              {isExpanded ? 'Hide Details' : 'Project Details'}
            </button>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ textAlign: 'center', flex: 1, padding: '0.75rem 1rem' }}>
              View Project
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
