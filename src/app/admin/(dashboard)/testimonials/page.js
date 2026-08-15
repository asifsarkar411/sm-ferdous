import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

export default async function ManageTestimonials() {
  const testimonials = await prisma.testimonial.findMany();

  async function createTestimonial(formData) {
    'use server';
    const name = formData.get('name');
    const role = formData.get('role');
    const quote = formData.get('quote');

    await prisma.testimonial.create({
      data: { name, role, quote },
    });

    revalidatePath('/');
    revalidatePath('/admin/testimonials');
  }

  async function deleteTestimonial(formData) {
    'use server';
    const id = formData.get('id');
    await prisma.testimonial.delete({ where: { id } });
    revalidatePath('/');
    revalidatePath('/admin/testimonials');
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Manage Testimonials</h2>
      
      <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', maxWidth: '600px', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Add New Testimonial</h3>
        <form action={createTestimonial} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input name="name" placeholder="Client Name" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          <input name="role" placeholder="Client Role (e.g. UX Designer)" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          <textarea name="quote" placeholder="Testimonial Quote" required rows={3} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', resize: 'vertical' }} />
          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Add Testimonial</button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        {testimonials.map(t => (
          <div key={t.id} style={{ backgroundColor: 'var(--color-surface)', padding: '1.5rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
            <p style={{ fontStyle: 'italic', marginBottom: '1rem', fontSize: '0.875rem' }}>&ldquo;{t.quote}&rdquo;</p>
            <h4 style={{ marginBottom: '0.25rem' }}>{t.name}</h4>
            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>{t.role}</div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Link href={`/admin/testimonials/${t.id}`} style={{ color: 'var(--color-primary)', textDecoration: 'underline', fontSize: '0.875rem' }}>Edit</Link>
              <form action={deleteTestimonial}>
                <input type="hidden" name="id" value={t.id} />
                <button type="submit" style={{ color: 'red', textDecoration: 'underline', fontSize: '0.875rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
