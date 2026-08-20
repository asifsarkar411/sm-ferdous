'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectCard({ project }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="project-card-container"
      style={{ 
        backgroundColor: 'var(--color-surface)', 
        borderRadius: '18px',
        border: '1px solid var(--color-border)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-sm)',
        transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.2s ease, box-shadow 0.25s ease',
        willChange: 'transform'
      }}
    >
      {/* Project Cover Image */}
      <div className="project-img-wrapper" style={{ height: '210px', backgroundColor: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
        {project.imageUrl ? (
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            loading="lazy"
            decoding="async"
            className="project-img-zoom"
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} 
          />
        ) : (
          <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>
            Featured Project
          </div>
        )}

        {/* Category Pill Tag floating on image */}
        <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 2 }}>
          <span style={{ 
            fontSize: '0.72rem', 
            fontWeight: '600', 
            color: 'var(--color-primary)', 
            backgroundColor: 'var(--nav-bg)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--color-border)',
            padding: '0.25rem 0.6rem',
            borderRadius: 'var(--border-radius-pill)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {project.category || 'Development'}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="project-card-body" style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.75rem', color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}>
          {project.title}
        </h3>
        
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>
          {project.description}
        </p>
        
        {/* Expandable Project Details */}
        <AnimatePresence>
          {isExpanded && project.detailsUrl && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ padding: '1rem', backgroundColor: 'var(--color-bg)', borderRadius: '10px', border: '1px solid var(--color-border)', fontSize: '0.88rem', color: 'var(--color-text-primary)', whiteSpace: 'pre-wrap', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                {project.detailsUrl}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div style={{ marginTop: 'auto', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {project.detailsUrl && (
            <button 
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="btn btn-outline" 
              style={{ flex: 1, padding: '0.6rem 1rem', fontSize: '0.88rem', minWidth: '120px' }}
            >
              {isExpanded ? 'Hide Details' : 'Overview'}
            </button>
          )}
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary" 
              style={{ textAlign: 'center', flex: 1, padding: '0.6rem 1rem', fontSize: '0.88rem', minWidth: '120px' }}
            >
              Live Demo &rarr;
            </a>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .project-card-container:hover {
          transform: translateY(-4px);
          border-color: var(--color-primary);
          box-shadow: var(--card-glow);
        }
        .project-card-container:hover .project-img-zoom {
          transform: scale(1.05);
        }
        @media (max-width: 640px) {
          .project-img-wrapper {
            height: 180px !important;
          }
          .project-card-body {
            padding: 1.25rem 1.1rem !important;
          }
        }
      `}} />
    </div>
  );
}
