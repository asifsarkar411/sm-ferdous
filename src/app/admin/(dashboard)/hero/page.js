import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';

export default async function ManageHero() {
  const heroData = await prisma.hero.findFirst();

  async function updateHero(formData) {
    'use server';
    const title = formData.get('title');
    const subtitle = formData.get('subtitle');
    
    const file = formData.get('image');
    let imageUrl = heroData?.imageUrl || null;
    
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
      const publicDir = path.join(process.cwd(), 'public', 'uploads');
      
      try {
        await fs.mkdir(publicDir, { recursive: true });
        await fs.writeFile(path.join(publicDir, filename), buffer);
        imageUrl = `/uploads/${filename}`;
      } catch (e) {
        console.error('Error saving file:', e);
      }
    }

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
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Profile Image Upload</label>
          {heroData?.imageUrl && (
            <div style={{ marginBottom: '1rem' }}>
              <img src={heroData.imageUrl} alt="Current Profile" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }} />
            </div>
          )}
          <input 
            name="image" 
            type="file"
            accept="image/*"
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }}
          />
          <small style={{ color: 'var(--color-text-secondary)', display: 'block', marginTop: '0.5rem' }}>
            Upload a picture from your device.
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
