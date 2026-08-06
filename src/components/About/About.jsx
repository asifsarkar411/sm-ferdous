import { prisma } from '@/lib/prisma';

export default async function About() {
  const aboutData = await prisma.about.findFirst();
  if (!aboutData) return null;

  return (
    <section id="about" className="section container" style={{ display: 'flex', gap: '4rem', alignItems: 'center' }}>
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>I'm Your Career Growth Partner</h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>{aboutData.description}</p>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ width: '100%', height: '400px', backgroundColor: '#e0e0e0', borderRadius: '16px' }}></div>
      </div>
    </section>
  );
}
