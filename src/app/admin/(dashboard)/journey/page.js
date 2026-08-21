import { safeQuery, safeMutation, defaultPortfolioData } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ManageJourney() {
  const journeys = await safeQuery(p => p.journey.findMany({ orderBy: { order: 'asc' } }), []);
  const journeyList = (journeys && journeys.length > 0) ? journeys : defaultPortfolioData.journeys;

  async function createJourney(formData) {
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
        await safeMutation(p => p.journey.create({
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
        console.error('Error creating journey:', err);
      }
    }

    revalidatePath('/admin/journey');
    revalidatePath('/');
  }

  async function deleteJourney(formData) {
    'use server';
    const id = formData.get('id');
    if (id) {
      try {
        await safeMutation(p => p.journey.delete({ where: { id: id.toString() } }));
      } catch (err) {
        console.error('Error deleting journey:', err);
      }
      revalidatePath('/admin/journey');
      revalidatePath('/');
    }
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '700' }}>Manage Journey & Experience</h2>
      
      <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '14px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', maxWidth: '600px', marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem' }}>Add Journey Milestone</h3>
        <form action={createJourney} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Title / Degree / Position *</label>
            <input name="title" placeholder="e.g. Lead Frontend Developer" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Company / Institute *</label>
            <input name="subtitle" placeholder="e.g. Tech Solutions Inc." required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Date / Period *</label>
            <input name="date" placeholder="e.g. 2023 - Present" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Location (optional)</label>
            <input name="location" placeholder="e.g. Dhaka, Bangladesh" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Points (one bullet point per line)</label>
            <textarea name="points" placeholder="Engineered high-performance web apps&#10;Integrated IoT telemetry pipelines" rows={4} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', resize: 'vertical' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Display Order</label>
            <input name="order" type="number" defaultValue="0" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Add Milestone</button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {journeyList.map(journey => {
          const pointsList = Array.isArray(journey.points) ? journey.points : [];
          return (
            <div key={journey.id} style={{ backgroundColor: 'var(--color-surface)', padding: '1.5rem', borderRadius: '14px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', gap: '0.5rem', flexWrap: 'wrap' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '600' }}>{journey.title}</h4>
                <span style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-primary)', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600', border: '1px solid var(--color-border)' }}>{journey.date}</span>
              </div>
              <p style={{ color: 'var(--color-primary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{journey.subtitle}</p>
              {journey.location && <p style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>📍 {journey.location}</p>}
              {pointsList.length > 0 && (
                <ul style={{ paddingLeft: '1.1rem', color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginBottom: '1rem', lineHeight: 1.4 }}>
                  {pointsList.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              )}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem' }}>
                <Link href={`/admin/journey/${journey.id}`} style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: '500' }}>Edit</Link>
                <form action={deleteJourney}>
                  <input type="hidden" name="id" value={journey.id} />
                  <button type="submit" style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Delete</button>
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
