import { prisma } from '@/lib/prisma';

export default async function Journey({ journeys: propJourneys }) {
  const journeys = propJourneys !== undefined ? propJourneys : await prisma.journey.findMany({ orderBy: { order: 'asc' } }).catch(() => []);

  if (!journeys || journeys.length === 0) return null;

  return (
    <section id="journey" className="section container">
      <div className="section-header">
        <h2 className="section-title">My Journey & Experience</h2>
        <div className="section-divider"></div>
        <p className="section-subtitle">A chronological record of professional roles, projects, and achievements.</p>
      </div>

      <div className="timeline-container">
        {/* Continuous Glowing Spine (desktop center, mobile left) */}
        <div className="timeline-spine"></div>

        {journeys.map((journey, index) => {
          const isLeft = index % 2 === 0;
          const pointsList = Array.isArray(journey.points) 
            ? journey.points 
            : (typeof journey.points === 'string' ? [journey.points] : []);

          return (
            <div key={journey.id} className={`timeline-item ${isLeft ? 'timeline-item-left' : 'timeline-item-right'}`}>
              
              {/* Luminous Node / Dot */}
              <div className="timeline-dot"></div>

              {/* Timeline Experience Card */}
              <div className="timeline-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.2rem)', fontWeight: '700', color: 'var(--color-text-primary)', margin: 0 }}>
                    {journey.title}
                  </h3>
                  <span style={{ 
                    backgroundColor: 'var(--color-badge-bg)', 
                    color: 'var(--color-badge-text)', 
                    padding: '0.25rem 0.65rem', 
                    borderRadius: '6px', 
                    fontSize: '0.75rem', 
                    fontWeight: '600',
                    border: '1px solid var(--color-border)',
                    whiteSpace: 'nowrap'
                  }}>
                    {journey.date}
                  </span>
                </div>

                <p style={{ color: 'var(--color-primary)', fontWeight: '500', fontSize: '0.92rem', marginBottom: '0.65rem' }}>
                  {journey.subtitle}
                </p>

                {journey.location && (
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span>📍</span> {journey.location}
                  </div>
                )}

                {pointsList.length > 0 && (
                  <ul style={{ paddingLeft: '1.15rem', color: 'var(--color-text-secondary)', fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', lineHeight: 1.55 }}>
                    {pointsList.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                )}
              </div>

            </div>
          );
        })}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .timeline-container {
          position: relative;
          max-width: 860px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }
        .timeline-spine {
          position: absolute;
          left: 50%;
          top: 10px;
          bottom: 10px;
          transform: translateX(-50%);
          width: 2px;
          background: linear-gradient(to bottom, var(--color-primary), var(--color-border), var(--color-primary));
          opacity: 0.5;
          z-index: 0;
        }
        .timeline-item {
          display: flex;
          position: relative;
          width: 100%;
          z-index: 1;
        }
        .timeline-item-left {
          justify-content: flex-start;
        }
        .timeline-item-right {
          justify-content: flex-end;
        }
        .timeline-dot {
          position: absolute;
          left: 50%;
          top: 24px;
          transform: translate(-50%, 0);
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background-color: var(--color-bg-primary);
          border: 3px solid var(--color-primary);
          box-shadow: 0 0 12px var(--color-primary);
          z-index: 2;
        }
        .timeline-card {
          width: 46%;
          background-color: var(--color-surface);
          padding: 1.75rem;
          border-radius: 16px;
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-sm);
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          will-change: transform;
          text-align: left;
        }
        .timeline-card:hover {
          transform: translateY(-3px);
          border-color: var(--color-primary) !important;
          box-shadow: var(--card-glow) !important;
        }
        @media (max-width: 768px) {
          .timeline-container {
            gap: 1.75rem;
            padding-left: 0.5rem;
          }
          .timeline-spine {
            left: 12px;
            transform: none;
          }
          .timeline-item {
            justify-content: flex-start !important;
            padding-left: 32px;
            box-sizing: border-box;
          }
          .timeline-dot {
            left: 12px;
            top: 20px;
            width: 12px;
            height: 12px;
          }
          .timeline-card {
            width: 100% !important;
            padding: 1.35rem 1.15rem;
            border-radius: 14px;
          }
        }
        @media (max-width: 480px) {
          .timeline-container {
            gap: 1.5rem;
            padding-left: 0;
          }
          .timeline-spine {
            left: 8px;
          }
          .timeline-item {
            padding-left: 24px;
          }
          .timeline-dot {
            left: 8px;
            top: 18px;
            width: 10px;
            height: 10px;
          }
          .timeline-card {
            padding: 1.15rem 0.9rem;
            border-radius: 12px;
          }
        }
      `}} />
    </section>
  );
}
