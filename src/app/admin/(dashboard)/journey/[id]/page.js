import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


export default async function EditJourney({ params }) {
  const { id } = await params;
  const journey = await prisma.journey.findUnique({ where: { id } });

  if (!journey) {
    redirect('/admin/journey');
  }

  async function updateJourney(formData) {
    'use server';
    const title = formData.get('title');
    const subtitle = formData.get('subtitle');
    const date = formData.get('date');
    const location = formData.get('location');
    const pointsString = formData.get('points');
    const points = pointsString.split('\n').filter(p => p.trim() !== '');

    await prisma.journey.update({
      where: { id },
      data: { title, subtitle, date, location, points },
    });

    revalidatePath('/');
    revalidatePath('/admin/journey');
    redirect('/admin/journey');
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Edit Journey Milestone</h2>
      
      <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', maxWidth: '600px', marginBottom: '2rem' }}>
        <form action={updateJourney} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Title</label>
          <input name="title" defaultValue={journey.title} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          
          <label style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Subtitle</label>
          <input name="subtitle" defaultValue={journey.subtitle} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          
          <label style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Date</label>
          <input name="date" defaultValue={journey.date} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          
          <label style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Location</label>
          <input name="location" defaultValue={journey.location} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          
          <label style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Points (one per line)</label>
          <textarea name="points" defaultValue={journey.points.join('\n')} required rows={4} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', resize: 'vertical' }} />
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" className="btn btn-primary">Save Changes</button>
            <a href="/admin/journey" className="btn btn-outline" style={{ color: 'var(--color-text-secondary)', borderColor: 'var(--color-border)' }}>Cancel</a>
          </div>
        </form>
      </div>
    </div>
  );
}
