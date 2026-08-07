import { prisma } from '@/lib/prisma';


export default async function Hobby() {
  const hobbies = await prisma.hobby.findMany();

  if (hobbies.length === 0) return null;

  return (
    <section id="hobby" className="section container">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', textTransform: 'uppercase' }}>My Hobbies</h2>
        <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--color-primary)', margin: '0 auto' }}></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {hobbies.map((hobby) => (
          <div key={hobby.id} className="animate-float hobby-card" style={{ backgroundColor: 'var(--color-surface)', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', transition: 'transform 0.3s ease, box-shadow 0.3s ease', cursor: 'pointer' }}>
            {hobby.imageUrl && (
              <img src={hobby.imageUrl} alt={hobby.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            )}
            <div style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>{hobby.title}</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                {hobby.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
