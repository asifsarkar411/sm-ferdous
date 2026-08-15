import { prisma } from '@/lib/prisma';

export default async function Skills({ skills: propSkills }) {
  const skills = propSkills !== undefined ? propSkills : await prisma.skill.findMany().catch(() => []);
  
  if (!skills || skills.length === 0) return null;

  // Group by category if available
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {Object.entries(categories).map(([category, items]) => (
          <div key={category} style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-primary)' }}></div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--color-text-primary)', letterSpacing: '0.01em' }}>
                {category}
              </h3>
              <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--color-text-secondary)', backgroundColor: 'var(--color-surface-hover)', padding: '0.2rem 0.6rem', borderRadius: '12px' }}>
                {items.length} {items.length === 1 ? 'Skill' : 'Skills'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
              {items.map(skill => (
                <div 
                  key={skill.id} 
                  style={{ 
                    backgroundColor: 'var(--color-bg)', 
                    padding: '1.25rem', 
                    borderRadius: '12px',
                    border: '1px solid var(--color-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '0.5rem',
                    transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
                    cursor: 'default',
                    willChange: 'transform'
                  }}
                  className="skill-card-hover"
                >
                  {/* Highlighted Skill Name */}
                  <div style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}>
                    {skill.name}
                  </div>

                  {/* Category as Skill Type / Description */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: '500', 
                      color: 'var(--color-primary)', 
                      backgroundColor: 'rgba(0, 242, 254, 0.08)',
                      border: '1px solid rgba(0, 242, 254, 0.2)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '6px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em'
                    }}>
                      {category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .skill-card-hover:hover {
          transform: translateY(-3px);
          border-color: var(--color-primary) !important;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15) !important;
        }
      `}} />
    </section>
  );
}
