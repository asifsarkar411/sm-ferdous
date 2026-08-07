import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export default async function ManageJourney() {
  const journeys = await prisma.journey.findMany({ orderBy: { date: 'desc' } });

  async function createJourney(formData) {
    'use server';
    const title = formData.get('title');
    const subtitle = formData.get('subtitle');
    const date = formData.get('date');
    const location = formData.get('location');
    const pointsString = formData.get('points');
    const points = pointsString.split('\n').filter(p => p.trim() !== '');

    await prisma.journey.create({
      data: { title, subtitle, date, location, points },
    });

    revalidatePath('/');
    revalidatePath('/admin/journey');
  }

  async function deleteJourney(formData) {
    'use server';
    const id = formData.get('id');
    await prisma.journey.delete({ where: { id } });
    revalidatePath('/');
    revalidatePath('/admin/journey');
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Manage Journey</h2>
      
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', maxWidth: '600px', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Add New Journey Milestone</h3>
        <form action={createJourney} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input name="title" placeholder="Title (e.g., Began Coding Journey)" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }} />
          <input name="subtitle" placeholder="Subtitle" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }} />
          <input name="date" placeholder="Date (e.g., Jan 2023)" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }} />
          <input name="location" placeholder="Location (e.g., Home Base)" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }} />
          <textarea name="points" placeholder="Points (one per line)" required rows={4} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc', resize: 'vertical' }} />
          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Add Milestone</button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        {journeys.map(journey => (
          <div key={journey.id} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
            <h4 style={{ marginBottom: '0.5rem' }}>{journey.title}</h4>
            <p style={{ fontSize: '0.875rem', color: '#555', marginBottom: '0.5rem' }}>{journey.subtitle} | {journey.date}</p>
            <ul style={{ fontSize: '0.875rem', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              {journey.points.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
            <form action={deleteJourney}>
              <input type="hidden" name="id" value={journey.id} />
              <button type="submit" style={{ color: 'red', textDecoration: 'underline', fontSize: '0.875rem' }}>Delete</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
