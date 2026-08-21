import { prisma } from '@/lib/prisma';
import { safeQuery, safeMutation } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function EditTestimonial({ params }) {
  const { id } = await params;
  const testimonial = await safeQuery(p => p.testimonial.findUnique({ where: { id } }), null);

  if (!testimonial) {
    redirect('/admin/testimonials');
  }

  async function updateTestimonial(formData) {
    'use server';
    const name = formData.get('name');
    const role = formData.get('role');
    const quote = formData.get('quote');
    
    if (name && quote) {
      try {
        await safeMutation(p => p.testimonial.update({
          where: { id },
          data: { name: name.toString().trim(), role: role ? role.toString().trim() : 'Client', quote: quote.toString().trim() },
        }));
      } catch (err) {
        console.error('Error updating testimonial:', err);
      }
    }

    revalidatePath('/');
    revalidatePath('/admin/testimonials');
    redirect('/admin/testimonials');
  }

  return (
    <div>
      <Link href="/admin/testimonials" style={{ color: 'var(--color-primary)', display: 'inline-block', marginBottom: '1rem', fontSize: '0.9rem' }}>&larr; Back to Testimonials</Link>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '700' }}>Edit Testimonial</h2>
      
      <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '14px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', maxWidth: '600px', marginBottom: '2rem' }}>
        <form action={updateTestimonial} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Name *</label>
            <input name="name" defaultValue={testimonial.name} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Role / Company</label>
            <input name="role" defaultValue={testimonial.role} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Quote *</label>
            <textarea name="quote" defaultValue={testimonial.quote} required rows={4} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', resize: 'vertical' }} />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <button type="submit" className="btn btn-primary">Save Changes</button>
            <Link href="/admin/testimonials" className="btn btn-outline" style={{ color: 'var(--color-text-secondary)', borderColor: 'var(--color-border)' }}>Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
