import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default async function ManageAbout() {
  const aboutData = await prisma.about.findFirst();

  async function updateAbout(formData) {
    'use server';
    const description = formData.get('description');
    const imageUrl = formData.get('imageUrl') || null;

    if (aboutData) {
      await prisma.about.update({
        where: { id: aboutData.id },
        data: { description, imageUrl },
      });
    } else {
      await prisma.about.create({
        data: { description, imageUrl },
      });
    }

    revalidatePath('/');
    revalidatePath('/admin/about');
    redirect('/admin');
  }

  return (
    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', maxWidth: '600px' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Manage About Section</h2>
      <form action={updateAbout} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description (Bio)</label>
          <textarea 
            name="description" 
            defaultValue={aboutData?.description || ''} 
            required 
            rows={6}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc', resize: 'vertical' }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Profile Image URL (Optional)</label>
          <input 
            name="imageUrl" 
            type="url"
            defaultValue={aboutData?.imageUrl || ''} 
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button type="submit" className="btn btn-primary">Save Changes</button>
          <a href="/admin" className="btn btn-outline" style={{ color: 'var(--color-text-secondary)', borderColor: '#ccc' }}>Cancel</a>
        </div>
      </form>
    </div>
  );
}
