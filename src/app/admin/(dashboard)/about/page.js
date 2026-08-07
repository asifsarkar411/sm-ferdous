import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';

export default async function ManageAbout() {
  const aboutData = await prisma.about.findFirst();

  async function updateAbout(formData) {
    'use server';
    const currentAbout = await prisma.about.findFirst();

    const description = formData.get('description');
    const yearsCoding = formData.get('yearsCoding');
    const projectsBuilt = formData.get('projectsBuilt');
    const frameworks = formData.get('frameworks');
    
    const file = formData.get('image');
    let imageUrl = currentAbout?.imageUrl || null;
    
    if (file && file.size > 0) {
      const publicDir = path.join(process.cwd(), 'public', 'uploads');
      try {
        const buffer = Buffer.from(await file.arrayBuffer());
        const originalName = file.name || 'image.jpg';
        const filename = `${Date.now()}-${originalName.replace(/\\s/g, '_')}`;
        await fs.mkdir(publicDir, { recursive: true });
        await fs.writeFile(path.join(publicDir, filename), buffer);
        imageUrl = `/uploads/${filename}`;
      } catch (e) {
        console.error('Error saving file:', e);
      }
    }

    if (currentAbout) {
      await prisma.about.update({
        where: { id: currentAbout.id },
        data: { description, yearsCoding, projectsBuilt, frameworks, imageUrl },
      });
    } else {
      await prisma.about.create({
        data: { description, yearsCoding, projectsBuilt, frameworks, imageUrl },
      });
    }

    revalidatePath('/');
    revalidatePath('/admin/about');
    redirect('/admin');
  }

  return (
    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', maxWidth: '600px' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Manage About Section</h2>
      <form action={updateAbout} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description (Bio)</label>
          <textarea 
            name="description" 
            defaultValue={aboutData?.description || ''} 
            required 
            rows={4}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc', resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Years Coding</label>
            <input 
              name="yearsCoding" 
              defaultValue={aboutData?.yearsCoding || ''} 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Projects Built</label>
            <input 
              name="projectsBuilt" 
              defaultValue={aboutData?.projectsBuilt || ''} 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Frameworks</label>
            <input 
              name="frameworks" 
              defaultValue={aboutData?.frameworks || ''} 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }}
            />
          </div>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Profile Image Upload</label>
          {aboutData?.imageUrl && (
            <div style={{ marginBottom: '1rem' }}>
              <img src={aboutData.imageUrl} alt="Current About Profile" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
            </div>
          )}
          <input 
            name="image" 
            type="file"
            accept="image/*"
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }}
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
