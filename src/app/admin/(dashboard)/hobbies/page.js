import { safeQuery, safeMutation, defaultPortfolioData } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ManageHobbies() {
  const hobbies = await safeQuery(p => p.hobby.findMany({ orderBy: { title: 'asc' } }), []);
  const hobbyList = (hobbies && hobbies.length > 0) ? hobbies : defaultPortfolioData.hobbies;

  async function addHobby(formData) {
    'use server';
    const title = formData.get('title');
    const description = formData.get('description');
    
    // Convert image to base64 if provided
    const file = formData.get('image');
    let imageUrl = null;
    if (file && typeof file.arrayBuffer === 'function' && file.size > 0) {
      try {
        const buffer = Buffer.from(await file.arrayBuffer());
        const mimeType = file.type || 'image/png';
        imageUrl = `data:${mimeType};base64,${buffer.toString('base64')}`;
      } catch (e) {
        console.error('Error processing image:', e);
      }
    }

    if (title && title.toString().trim().length > 0) {
      const descVal = description ? description.toString().trim() : '';
      try {
        await safeMutation(p => p.hobby.create({
          data: { 
            title: title.toString().trim(), 
            description: descVal, 
            imageUrl 
          },
        }));
      } catch (err) {
        console.error('Error creating hobby:', err);
      }
    }

    revalidatePath('/');
    revalidatePath('/admin/hobbies');
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Manage Hobbies</h2>
      
      <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', maxWidth: '600px', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Add New Hobby</h3>
        <form action={addHobby} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Hobby Title *</label>
            <input name="title" placeholder="e.g. Photography, Robotics, Chess" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Description (optional)</label>
            <textarea name="description" placeholder="Brief description of your hobby or interest..." rows={3} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', resize: 'vertical' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Upload Image (optional)</label>
            <input name="image" type="file" accept="image/*" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Add Hobby</button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
        {hobbyList.map(hobby => (
          <div key={hobby.id} style={{ backgroundColor: 'var(--color-surface)', padding: '1.5rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column' }}>
            {hobby.imageUrl && (
              <img src={hobby.imageUrl} alt={hobby.title} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} />
            )}
            <h4 style={{ marginBottom: hobby.description ? '0.5rem' : '1rem', color: 'var(--color-primary)' }}>{hobby.title}</h4>
            {hobby.description && (
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '1rem', flex: 1 }}>{hobby.description}</p>
            )}
            <div style={{ marginTop: 'auto' }}>
              <Link href={`/admin/hobbies/${hobby.id}`} className="btn btn-outline" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
                Edit / Delete
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
