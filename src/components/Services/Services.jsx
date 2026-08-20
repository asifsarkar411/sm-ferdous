import { prisma } from '@/lib/prisma';

export default async function Services({ services: propServices }) {
  const services = propServices !== undefined ? propServices : await prisma.service.findMany().catch(() => []);

  if (!services || services.length === 0) return null;

  return (
    <section id="services" className="section container">
      <div className="section-header">
        <h2 className="section-title">Services & Offerings</h2>
        <div className="section-divider"></div>
        <p className="section-subtitle">Tailored technical solutions engineered for scale, reliability, and speed.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.75rem' }}>
        {services.map(service => (
          <div 
            key={service.id} 
            className="service-card service-card-hover"
            style={{ 
              padding: '2rem', 
              backgroundColor: 'var(--color-surface)', 
              border: '1px solid var(--color-border)', 
              borderRadius: '18px', 
              boxShadow: 'var(--shadow-sm)',
              transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease', 
              willChange: 'transform' 
            }}
          >
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'rgba(0, 242, 254, 0.08)', border: '1px solid rgba(0, 242, 254, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: 'var(--color-primary)', fontSize: '1.25rem' }}>
              ⚡
            </div>
            <h3 style={{ marginBottom: '0.75rem', fontSize: '1.2rem', fontWeight: '700', color: 'var(--color-text-primary)' }}>{service.title}</h3>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.65, fontSize: '0.94rem' }}>{service.description}</p>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .service-card-hover:hover {
          transform: translateY(-4px);
          border-color: var(--color-primary);
          box-shadow: var(--card-glow);
        }
        @media (max-width: 640px) {
          .service-card {
            padding: 1.35rem 1.15rem !important;
          }
        }
      `}} />
    </section>
  );
}
