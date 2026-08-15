import { prisma } from '@/lib/prisma';

export default async function Testimonials({ testimonials: propTestimonials }) {
  const testimonials = propTestimonials !== undefined ? propTestimonials : await prisma.testimonial.findMany().catch(() => []);

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="section container">
      <div className="section-header">
        <h2 className="section-title">Client Testimonials</h2>
        <div className="section-divider"></div>
        <p className="section-subtitle">Feedback and recommendations from collaborators and clients.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {testimonials.map(testimonial => (
          <div 
            key={testimonial.id} 
            style={{ 
              padding: '2.25rem', 
              backgroundColor: 'var(--color-surface)', 
              border: '1px solid var(--color-border)', 
              borderRadius: '18px', 
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease', 
              willChange: 'transform' 
            }}
            className="testimonial-card-hover"
          >
            <div style={{ fontSize: '1.5rem', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>&ldquo;</div>
            <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--color-text-secondary)', lineHeight: 1.65, fontSize: '0.96rem', flex: 1 }}>
              {testimonial.quote}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: 'var(--color-primary)', fontSize: '0.85rem' }}>
                {(testimonial.name || 'C').slice(0, 2).toUpperCase()}
              </div>
              <div>
                <strong style={{ color: 'var(--color-text-primary)', fontSize: '0.95rem', display: 'block' }}>{testimonial.name}</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{testimonial.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .testimonial-card-hover:hover {
          transform: translateY(-4px);
          border-color: var(--color-primary);
          box-shadow: var(--card-glow);
        }
      `}} />
    </section>
  );
}
