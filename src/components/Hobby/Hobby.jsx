import { prisma } from '@/lib/prisma';

export default async function Hobby({ hobbies: propHobbies }) {
  const hobbies = propHobbies !== undefined ? propHobbies : await prisma.hobby.findMany().catch(() => []);

  if (!hobbies || hobbies.length === 0) return null;

  return (
    <section id="hobby" className="section container">
      <div className="section-header">
        <h2 className="section-title">My Hobbies & Interests</h2>
        <div className="section-divider"></div>
        <p className="section-subtitle">Activities and creative passions I pursue beyond code.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {hobbies.map((hobby) => {
          const hasImage = Boolean(hobby.imageUrl && hobby.imageUrl.trim().length > 0);
          const hasDescription = Boolean(hobby.description && hobby.description.trim().length > 0);

          return (
            <div 
              key={hobby.id} 
              className="hobby-card" 
              style={{ 
                backgroundColor: 'var(--color-surface)', 
                borderRadius: '18px', 
                overflow: 'hidden', 
                border: '1px solid var(--color-border)', 
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {hasImage && (
                <div style={{ height: '190px', overflow: 'hidden', backgroundColor: 'var(--color-bg)' }}>
                  <img 
                    src={hobby.imageUrl} 
                    alt={hobby.title || 'Hobby'} 
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} 
                    className="hobby-img"
                  />
                </div>
              )}
              <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: hasDescription ? '0.6rem' : '0', color: 'var(--color-primary)' }}>
                  {hobby.title}
                </h3>
                {hasDescription && (
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    {hobby.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .hobby-card:hover .hobby-img {
          transform: scale(1.06);
        }
      `}} />
    </section>
  );
}
