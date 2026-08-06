import { prisma } from '@/lib/prisma';

export default async function Testimonials() {
  const testimonials = await prisma.testimonial.findMany();

  return (
    <section id="testimonials" className="section container">
      <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>Real Results from Real People</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {testimonials.length > 0 ? testimonials.map(testimonial => (
          <div key={testimonial.id} style={{ padding: '2rem', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '16px' }}>
            <p style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>"{testimonial.quote}"</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ccc' }}></div>
              <div>
                <strong>{testimonial.name}</strong>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{testimonial.role}</div>
              </div>
            </div>
          </div>
        )) : (
          <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>No testimonials yet.</p>
        )}
      </div>
    </section>
  );
}
