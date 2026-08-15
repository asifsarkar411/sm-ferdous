import { prisma } from '@/lib/prisma';

export default async function Testimonials() {
  const testimonials = await prisma.testimonial.findMany();

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="section container">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', textTransform: 'uppercase' }}>Testimonials</h2>
        <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--color-primary)', margin: '0 auto' }}></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {testimonials.map(testimonial => (
          <div key={testimonial.id} style={{ padding: '2rem', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '16px' }}>
            <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }}>&ldquo;{testimonial.quote}&rdquo;</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div>
                <strong style={{ color: 'var(--color-primary)' }}>{testimonial.name}</strong>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{testimonial.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
