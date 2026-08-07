import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function Journey() {
  const journeys = await prisma.journey.findMany({ orderBy: { order: 'asc' } });

  if (journeys.length === 0) return null;

  return (
    <section id="journey" className="section container">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>MY JOURNEY & EXPERIENCE</h2>
        <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--color-primary)', margin: '0 auto' }}></div>
      </div>

      <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Vertical line */}
        <div className="hide-on-mobile" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: '2px', height: '100%', backgroundColor: 'var(--color-border)', zIndex: 0 }}></div>

        {journeys.map((journey, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div key={journey.id} className="timeline-item flex-responsive" style={{ 
              display: 'flex', 
              justifyContent: isLeft ? 'flex-start' : 'flex-end',
              position: 'relative',
              width: '100%',
              zIndex: 1
            }}>
              
              {/* Dot */}
              <div className="hide-on-mobile" style={{ 
                position: 'absolute', 
                left: '50%', 
                transform: 'translate(-50%, 20px)', 
                width: '12px', 
                height: '12px', 
                borderRadius: '50%', 
                backgroundColor: 'var(--color-primary)',
                boxShadow: '0 0 10px var(--color-primary)'
              }}></div>

              {/* Content Card */}
              <div className="timeline-card" style={{ 
                width: '45%', 
                backgroundColor: 'var(--color-surface)', 
                padding: '2rem', 
                borderRadius: '12px',
                border: '1px solid var(--color-border)'
              }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{journey.title}</h3>
                <p style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>{journey.subtitle}</p>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                  <span>📅 {journey.date}</span>
                  <span>📍 {journey.location}</span>
                </div>
                <ul style={{ paddingLeft: '1.2rem', color: 'var(--color-text-primary)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {journey.points.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
