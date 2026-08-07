import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function EditHobby({ params }) {
  const { id } = await params;
  const hobby = await prisma.hobby.findUnique({ where: { id } });

  if (!hobby) {
    redirect('/admin/hobbies');
  }

  async function updateHobby(formData) {
    'use server';
    const title = formData.get('title');
    const description = formData.get('description');
    
    const file = formData.get('image');
    let imageUrl = hobby.imageUrl;
    
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const mimeType = file.type || 'image/png';
      imageUrl = `data:${mimeType};base64,${buffer.toString('base64')}`;
    }

    await prisma.hobby.update({
      where: { id },
      data: { title, description, imageUrl },
    });

    revalidatePath('/');
    revalidatePath('/admin/hobbies');
    redirect('/admin/hobbies');
  }

  async function deleteHobby() {
    'use server';
    await prisma.hobby.delete({ where: { id } });
    revalidatePath('/');
    revalidatePath('/admin/hobbies');
    redirect('/admin/hobbies');
  }

  return (
    <div>
      <Link href="/admin/hobbies" style={{ color: 'var(--color-primary)', display: 'inline-block', marginBottom: '1rem' }}>&larr; Back to Hobbies</Link>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Edit Hobby</h2>
      
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px', backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
          <form action={updateHobby} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Title</label>
            <input name="title" defaultValue={hobby.title} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
            
            <label style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Description</label>
            <textarea name="description" defaultValue={hobby.description} required rows={3} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', resize: 'vertical' }} />
            
            <label style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Update Image (Leave empty to keep current)</label>
            <input name="image" type="file" accept="image/*" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
            
            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Save Changes</button>
          </form>
        </div>

        <div style={{ flex: '1 1 300px', backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', alignSelf: 'flex-start' }}>
          <h3 style={{ color: 'red', marginBottom: '1rem' }}>Danger Zone</h3>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem', fontSize: '0.875rem' }}>
            Once you delete this hobby, there is no going back. Please be certain.
          </p>
          <form action={deleteHobby}>
            <button type="submit" className="btn btn-outline" style={{ color: 'red', borderColor: 'red', width: '100%' }}>Delete Hobby</button>
          </form>
        </div>
      </div>
    </div>
  );
}
