import { prisma } from '@/lib/prisma';
import { safeQuery, safeMutation } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function EditJourney({ params }) {
  const { id } = await params;
  const journey = await safeQuery(p => p.journey.findUnique({ where: { id } }), null);

  if (!journey) {
    redirect('/admin/journey');
  }

  const pointsList = Array.isArray(journey.points) 
    ? journey.points 
    : (typeof journey.points === 'string' ? [journey.points] : []);

  async function updateJourney(formData) {
    'use server';
    const title = formData.get('title');
    const subtitle = formData.get('subtitle');
    const date = formData.get('date');
    const location = formData.get('location');
    const pointsStr = formData.get('points');
    const order = parseInt(formData.get('order') || '0', 10);

    const points = pointsStr ? pointsStr.split('\n').map(p => p.trim()).filter(Boolean) : [];

    if (title && subtitle) {
      try {
        await safeMutation(p => p.journey.update({
          where: { id },
          data: {
            title: title.toString().trim(),
            subtitle: subtitle.toString().trim(),
            date: date ? date.toString().trim() : '',
            location: location ? location.toString().trim() : '',
            points,
            order: isNaN(order) ? 0 : order,
          },
        }));
      } catch (err) {
        console.error('Error updating journey:', err);
      }
    }

    revalidatePath('/admin/journey');
    revalidatePath('/');
    redirect('/admin/journey');
  }

  async function deleteJourney() {
    'use server';
    try {
      await safeMutation(p => p.journey.delete({ where: { id: id.toString() } }));
    } catch (err) {
      console.error('Error deleting journey:', err);
    }
    revalidatePath('/admin/journey');
    revalidatePath('/');
    redirect('/admin/journey');
  }

  return (
    <div>
      <Link href="/admin/journey" style={{ color: 'var(--color-primary)', display: 'inline-block', marginBottom: '1rem', fontSize: '0.9rem' }}>&larr; Back to Journey</Link>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '700' }}>Edit Journey Milestone</h2>
      
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 450px', backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '14px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <form action={updateJourney} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Title / Position *</label>
              <input name="title" defaultValue={journey.title} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Company / Institute *</label>
              <input name="subtitle" defaultValue={journey.subtitle} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Date / Period *</label>
              <input name="date" defaultValue={journey.date} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Location</label>
              <input name="location" defaultValue={journey.location || ''} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Points (one per line)</label>
              <textarea name="points" defaultValue={pointsList.join('\n')} rows={5} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', resize: 'vertical' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Display Order</label>
              <input name="order" type="number" defaultValue={journey.order} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
            </div>

            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Save Changes</button>
          </form>
        </div>

        <div style={{ flex: '1 1 300px', backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '14px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', alignSelf: 'flex-start' }}>
          <h3 style={{ color: '#ef4444', marginBottom: '1rem' }}>Danger Zone</h3>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.25rem', fontSize: '0.875rem' }}>
            Deleting this milestone is permanent.
          </p>
          <form action={deleteJourney}>
            <button type="submit" className="btn btn-outline" style={{ color: '#ef4444', borderColor: '#ef4444', width: '100%' }}>Delete Milestone</button>
          </form>
        </div>
      </div>
    </div>
  );
}
