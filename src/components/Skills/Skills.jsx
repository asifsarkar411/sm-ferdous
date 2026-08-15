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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {Object.entries(categories).map(([category, items]) => (
          <div 
            key={category} 
            style={{ 
              backgroundColor: 'var(--color-surface)', 
              padding: '1.75rem', 
              borderRadius: '16px', 
              border: '1px solid var(--color-border)',
              backdropFilter: 'blur(8px)'
            }}
          >
            {/* Category Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.6rem' }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', boxShadow: '0 0 8px var(--color-primary)' }}></span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '600', color: 'var(--color-text-primary)', letterSpacing: '0.01em' }}>
                {category}
              </h3>
              <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--color-text-secondary)', backgroundColor: 'var(--color-surface-hover)', padding: '0.15rem 0.5rem', borderRadius: '10px' }}>
                {items.length} {items.length === 1 ? 'skill' : 'skills'}
              </span>
            </div>

            {/* Small Side-by-Side Animated Skill Cards */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
              {items.map((skill, index) => (
                <div 
                  key={skill.id} 
                  className="small-skill-card"
                  style={{ 
                    animationDelay: `${index * 0.05}s`,
                    backgroundColor: 'var(--color-bg)', 
                    padding: '0.75rem 1.15rem', 
                    borderRadius: '12px',
                    border: '1px solid var(--color-border)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    cursor: 'default',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Glowing Indicator Dot */}
                  <span className="skill-dot" style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary)',
                    flexShrink: 0,
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}></span>

                  {/* Skill Name Highlighted */}
                  <span style={{ 
                    fontSize: '0.95rem', 
                    fontWeight: '600', 
                    color: 'var(--color-text-primary)',
                    letterSpacing: '-0.01em',
                    whiteSpace: 'nowrap'
                  }}>
                    {skill.name}
                  </span>

                  {/* Subtle Skill Type Tag */}
                  <span style={{ 
                    fontSize: '0.7rem', 
                    fontWeight: '500', 
                    color: 'var(--color-text-secondary)', 
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    padding: '0.15rem 0.45rem',
                    borderRadius: '6px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    whiteSpace: 'nowrap'
                  }}>
                    {category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .small-skill-card {
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.2s ease, box-shadow 0.25s ease, background-color 0.2s ease;
          will-change: transform;
        }
        .small-skill-card:hover {
          transform: translateY(-4px) scale(1.04);
          border-color: var(--color-primary) !important;
          background-color: var(--color-surface-hover) !important;
          box-shadow: 0 8px 18px rgba(0, 242, 254, 0.18) !important;
        }
        .small-skill-card:hover .skill-dot {
          transform: scale(1.5);
          box-shadow: 0 0 10px var(--color-primary);
        }
      `}} />
    </section>
  );
}
