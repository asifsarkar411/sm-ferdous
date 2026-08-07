import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function ManageHobbies() {
  const hobbies = await prisma.hobby.findMany();

  async function addHobby(formData) {
    'use server';
    const title = formData.get('title');
    const description = formData.get('description');
    
    // Convert image to base64
    const file = formData.get('image');
    let imageUrl = null;
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const mimeType = file.type || 'image/png';
      imageUrl = `data:${mimeType};base64,${buffer.toString('base64')}`;
    }

    await prisma.hobby.create({
      data: { title, description, imageUrl },
    });

    revalidatePath('/');
    revalidatePath('/admin/hobbies');
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Manage Hobbies</h2>
      
      <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', maxWidth: '600px', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Add New Hobby</h3>
        <form action={addHobby} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input name="title" placeholder="Hobby Title (e.g., Photography)" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          <textarea name="description" placeholder="Description" required rows={3} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', resize: 'vertical' }} />
          <label style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Upload Image (optional)</label>
          <input name="image" type="file" accept="image/*" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Add Hobby</button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        {hobbies.map(hobby => (
          <div key={hobby.id} style={{ backgroundColor: 'var(--color-surface)', padding: '1.5rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
            {hobby.imageUrl && (
              <img src={hobby.imageUrl} alt={hobby.title} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} />
            )}
            <h4 style={{ marginBottom: '0.5rem' }}>{hobby.title}</h4>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>{hobby.description}</p>
            <Link href={`/admin/hobbies/${hobby.id}`} className="btn btn-outline" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
              Edit / Delete
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
