import { prisma } from '@/lib/prisma';

export default async function Services() {
  const services = await prisma.service.findMany();

  return (
    <section id="services" className="section container" style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '5rem 2rem', borderRadius: 'var(--border-radius-lg)' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>What You'll Get From Career Coaching</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        {services.length > 0 ? services.map(service => (
          <div key={service.id} style={{ padding: '2rem', border: '1px solid #eaeaea', borderRadius: '16px' }}>
            <h3 style={{ marginBottom: '1rem' }}>{service.title}</h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>{service.description}</p>
          </div>
        )) : (
          <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>No services available yet.</p>
        )}
      </div>
    </section>
  );
}
