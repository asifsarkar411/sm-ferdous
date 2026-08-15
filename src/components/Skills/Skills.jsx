import { prisma } from '@/lib/prisma';

export default async function Skills({ skills: propSkills }) {
  const skills = propSkills !== undefined ? propSkills : await prisma.skill.findMany();
  
  if (!skills || skills.length === 0) return null;

  // Group by category
  const categories = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="section container">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', textTransform: 'uppercase' }}>TECHNICAL SKILLS</h2>
        <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--color-primary)', margin: '0 auto' }}></div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {Object.entries(categories).map(([category, items]) => (
          <div key={category}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.25rem', borderLeft: '4px solid var(--color-primary)', paddingLeft: '1rem' }}>
              {category}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
              {items.map(skill => (
                <div key={skill.id} style={{ 
                  backgroundColor: 'var(--color-surface)', 
                  padding: '1.25rem 1rem', 
                  borderRadius: '12px',
                  border: '1px solid var(--color-border)',
                  textAlign: 'center',
                  transition: 'transform 0.2s ease, border-color 0.2s ease',
                  willChange: 'transform'
                }}>
                  <p style={{ fontWeight: '500', fontSize: '0.95rem', color: 'var(--color-text)' }}>{skill.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
