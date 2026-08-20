import { prisma } from '@/lib/prisma';

export default async function Skills({ skills: propSkills }) {
  const skills = propSkills !== undefined ? propSkills : await prisma.skill.findMany().catch(() => []);
  
  if (!skills || skills.length === 0) return null;

  // Group by category
  const categories = skills.reduce((acc, skill) => {
    const cat = (skill.category && skill.category.trim().length > 0) ? skill.category.trim() : 'Core Skills';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="section container">
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.02em', fontWeight: '700' }}>
          Technical Skills
        </h2>
        <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--color-primary)', margin: '0 auto 1rem auto', borderRadius: '2px' }}></div>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
          A curated toolkit of languages, frameworks, and technologies I specialize in.
        </p>
      </div>

      {/* Small Category Cards Grid - matches Language Cards structure */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', 
        gap: '1.5rem', 
        maxWidth: '1100px', 
        margin: '0 auto' 
      }}>
        {Object.entries(categories).map(([category, items]) => (
          <div 
            key={category} 
            className="skill-category-card"
            style={{ 
              backgroundColor: 'var(--color-surface)', 
              padding: '1.75rem', 
              borderRadius: '16px', 
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1.25rem'
            }}
          >
            {/* Category Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span className="cat-pulse-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', boxShadow: '0 0 8px var(--color-primary)' }}></span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '600', color: 'var(--color-primary)', margin: 0 }}>
                  {category}
                </h3>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)', padding: '0.15rem 0.55rem', borderRadius: '8px', fontWeight: '500' }}>
                {items.length}
              </span>
            </div>

            {/* Small Side-by-Side Animated Skill Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {items.map((skill, index) => (
                <div 
                  key={skill.id} 
                  className="small-skill-pill"
                  style={{ 
                    animationDelay: `${index * 0.05}s`,
                    backgroundColor: 'var(--color-bg)', 
                    padding: '0.5rem 0.85rem', 
                    borderRadius: '10px',
                    border: '1px solid var(--color-border)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'default',
                    transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                >
                  <span style={{ 
                    fontSize: '0.9rem', 
                    fontWeight: '600', 
                    color: 'var(--color-text-primary)',
                    letterSpacing: '-0.01em',
                    whiteSpace: 'nowrap'
                  }}>
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .skill-category-card {
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          will-change: transform;
        }
        .skill-category-card:hover {
          transform: translateY(-4px);
          border-color: var(--color-primary);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }
        .small-skill-pill:hover {
          transform: translateY(-2px) scale(1.05);
          border-color: var(--color-primary);
          background-color: var(--color-surface-hover);
          color: var(--color-primary);
        }
        @media (max-width: 640px) {
          .skill-category-card {
            padding: 1.25rem !important;
          }
        }
      `}} />
    </section>
  );
}
