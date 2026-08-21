import { prisma } from '@/lib/prisma';
import { safeQuery, safeMutation } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ManageTestimonials() {
  const testimonials = await safeQuery(p => p.testimonial.findMany({ orderBy: { name: 'asc' } }), []);

  async function createTestimonial(formData) {
    'use server';
    const name = formData.get('name');
    const role = formData.get('role');
    const quote = formData.get('quote');

    if (name && quote) {
      try {
        await safeMutation(p => p.testimonial.create({
          data: { name: name.toString().trim(), role: role ? role.toString().trim() : 'Client', quote: quote.toString().trim() },
        }));
      } catch (err) {
        console.error('Error creating testimonial:', err);
      }
    }

    revalidatePath('/');
    revalidatePath('/admin/testimonials');
  }

  async function deleteTestimonial(formData) {
    'use server';
    const id = formData.get('id');
    if (id) {
      try {
        await safeMutation(p => p.testimonial.delete({ where: { id: id.toString() } }));
      } catch (err) {
        console.error('Error deleting testimonial:', err);
      }
      revalidatePath('/');
      revalidatePath('/admin/testimonials');
    }
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '700' }}>Manage Testimonials</h2>
      
      <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '14px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', maxWidth: '600px', marginBottom: '2.5rem' }}>
        <h3 style={{ marginBottom: '1.25rem', fontSize: '1.15rem' }}>Add New Testimonial</h3>
        <form action={createTestimonial} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Client Name *</label>
            <input name="name" placeholder="e.g. Sarah Jenkins" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Role / Title</label>
            <input name="role" placeholder="e.g. Senior Product Manager" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Quote *</label>
            <textarea name="quote" placeholder="Client feedback or recommendation..." required rows={3} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', resize: 'vertical' }} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Add Testimonial</button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {testimonials.map(t => (
          <div key={t.id} style={{ backgroundColor: 'var(--color-surface)', padding: '1.5rem', borderRadius: '14px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontStyle: 'italic', marginBottom: '1rem', color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: 1.5 }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--color-primary)' }}>{t.name}</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{t.role}</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem', marginTop: '1rem' }}>
              <Link href={`/admin/testimonials/${t.id}`} style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: '500' }}>Edit</Link>
              <form action={deleteTestimonial}>
                <input type="hidden" name="id" value={t.id} />
                <button type="submit" style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
