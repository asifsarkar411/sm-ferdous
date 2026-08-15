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

      <div style={{ position: 'relative', maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {/* Continuous Center Glowing Spine */}
        <div className="hide-on-mobile" style={{ 
          position: 'absolute', 
          left: '50%', 
          top: '10px',
          bottom: '10px',
          transform: 'translateX(-50%)', 
          width: '2px', 
          background: 'linear-gradient(to bottom, var(--color-primary), var(--color-border), var(--color-primary))',
          opacity: 0.5,
          zIndex: 0 
        }}></div>

        {journeys.map((journey, index) => {
          const isLeft = index % 2 === 0;
          const pointsList = Array.isArray(journey.points) 
            ? journey.points 
            : (typeof journey.points === 'string' ? [journey.points] : []);

          return (
            <div key={journey.id} className="timeline-item flex-responsive" style={{ 
              display: 'flex', 
              justifyContent: isLeft ? 'flex-start' : 'flex-end',
              position: 'relative',
              width: '100%',
              zIndex: 1
            }}>
              
              {/* Luminous Center Dot */}
              <div className="hide-on-mobile" style={{ 
                position: 'absolute', 
                left: '50%', 
                top: '24px',
                transform: 'translate(-50%, 0)', 
                width: '14px', 
                height: '14px', 
                borderRadius: '50%', 
                backgroundColor: 'var(--color-bg-primary)',
                border: '3px solid var(--color-primary)',
                boxShadow: '0 0 12px var(--color-primary)',
                zIndex: 2
              }}></div>

              {/* Timeline Experience Card */}
              <div className="timeline-card" style={{ 
                width: '46%', 
                backgroundColor: 'var(--color-surface)', 
                padding: '1.75rem', 
                borderRadius: '16px',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform 0.25s ease, border-color 0.25s ease',
                willChange: 'transform'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--color-text-primary)', margin: 0 }}>
                    {journey.title}
                  </h3>
                  <span style={{ 
                    backgroundColor: 'rgba(0, 242, 254, 0.08)', 
                    color: 'var(--color-primary)', 
                    padding: '0.2rem 0.55rem', 
                    borderRadius: '6px', 
                    fontSize: '0.75rem', 
                    fontWeight: '600',
                    border: '1px solid rgba(0, 242, 254, 0.2)'
                  }}>
                    {journey.date}
                  </span>
                </div>

                <p style={{ color: 'var(--color-primary)', fontWeight: '500', fontSize: '0.95rem', marginBottom: '0.75rem' }}>
                  {journey.subtitle}
                </p>

                {journey.location && (
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span>📍</span> {journey.location}
                  </div>
                )}

                {pointsList.length > 0 && (
                  <ul style={{ paddingLeft: '1.15rem', color: 'var(--color-text-secondary)', fontSize: '0.92rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', lineHeight: 1.5 }}>
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
        .timeline-card:hover {
          transform: translateY(-3px);
          border-color: var(--color-primary) !important;
          box-shadow: var(--card-glow) !important;
        }
      `}} />
    </section>
  );
}
