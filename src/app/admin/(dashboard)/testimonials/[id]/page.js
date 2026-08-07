import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export default async function EditTestimonial({ params }) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });

  if (!testimonial) {
    redirect('/admin/testimonials');
  }

  async function updateTestimonial(formData) {
    'use server';
    const name = formData.get('name');
    const role = formData.get('role');
    const quote = formData.get('quote');
    
    await prisma.testimonial.update({
      where: { id },
      data: { name, role, quote },
    });

    revalidatePath('/');
    revalidatePath('/admin/testimonials');
    redirect('/admin/testimonials');
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Edit Testimonial</h2>
      
      <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', maxWidth: '600px', marginBottom: '2rem' }}>
        <form action={updateTestimonial} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Client Name</label>
          <input name="name" defaultValue={testimonial.name} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          
          <label style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Client Role</label>
          <input name="role" defaultValue={testimonial.role} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          
          <label style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Testimonial Quote</label>
          <textarea name="quote" defaultValue={testimonial.quote} required rows={3} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', resize: 'vertical' }} />
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" className="btn btn-primary">Save Changes</button>
            <a href="/admin/testimonials" className="btn btn-outline" style={{ color: 'var(--color-text-secondary)', borderColor: 'var(--color-border)' }}>Cancel</a>
          </div>
        </form>
      </div>
    </div>
  );
}
