import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default async function ManageHero() {
  const heroData = await prisma.hero.findFirst();

  async function updateHero(formData) {
    'use server';
    const title = formData.get('title');
    const subtitle = formData.get('subtitle');
    const imageUrl = formData.get('imageUrl') || null;

    if (heroData) {
      await prisma.hero.update({
        where: { id: heroData.id },
        data: { title, subtitle, imageUrl },
      });
    } else {
      await prisma.hero.create({
        data: { title, subtitle, imageUrl },
      });
    }

    revalidatePath('/');
    revalidatePath('/admin/hero');
    redirect('/admin');
  }

  return (
    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', maxWidth: '600px' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Manage Hero Section</h2>
      <form action={updateHero} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Title</label>
          <input 
            name="title" 
            defaultValue={heroData?.title || ''} 
            required 
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Subtitle</label>
          <textarea 
            name="subtitle" 
            defaultValue={heroData?.subtitle || ''} 
            required 
            rows={4}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc', resize: 'vertical' }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Image URL (Optional)</label>
          <input 
            name="imageUrl" 
            type="url"
            defaultValue={heroData?.imageUrl || ''} 
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }}
            placeholder="https://example.com/image.jpg"
          />
          <small style={{ color: 'var(--color-text-secondary)', display: 'block', marginTop: '0.5rem' }}>
            For Vercel deployment, upload your images to an external service like Cloudinary or Imgur and paste the direct link here.
          </small>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button type="submit" className="btn btn-primary">Save Changes</button>
          <a href="/admin" className="btn btn-outline" style={{ color: 'var(--color-text-secondary)', borderColor: '#ccc' }}>Cancel</a>
        </div>
      </form>
    </div>
  );
}
