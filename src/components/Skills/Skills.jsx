import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function Skills() {
  const skills = await prisma.skill.findMany();
  
  if (skills.length === 0) return null;

  // Group by category
  const categories = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="section container">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>TECHNICAL SKILLS</h2>
        <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--color-primary)', margin: '0 auto' }}></div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {Object.entries(categories).map(([category, items]) => (
          <div key={category}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid var(--color-primary)', paddingLeft: '1rem' }}>
              {category}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
              {items.map(skill => (
                <div key={skill.id} style={{ 
                  backgroundColor: 'var(--color-surface)', 
                  padding: '1.5rem', 
                  borderRadius: '12px',
                  border: '1px solid var(--color-border)',
                  textAlign: 'center'
                }}>
                  <p style={{ fontWeight: '500', fontSize: '1.1rem' }}>{skill.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
