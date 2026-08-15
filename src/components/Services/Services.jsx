import { prisma } from '@/lib/prisma';

export default async function Services() {
  const services = await prisma.service.findMany();

  if (services.length === 0) return null;

  return (
    <section id="services" className="section container">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', textTransform: 'uppercase' }}>Services</h2>
        <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--color-primary)', margin: '0 auto' }}></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {services.map(service => (
          <div key={service.id} style={{ padding: '2rem', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '16px' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>{service.title}</h3>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
