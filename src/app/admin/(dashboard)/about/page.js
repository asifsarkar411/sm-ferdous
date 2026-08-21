import { safeQuery, safeMutation, defaultPortfolioData } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ManageAbout() {
  const aboutData = await safeQuery(p => p.about.findFirst(), null);
  const about = aboutData || defaultPortfolioData.aboutData;

  async function updateAbout(formData) {
    'use server';
    const currentAbout = await safeQuery(p => p.about.findFirst(), null);

    const description = formData.get('description');
    const yearsCoding = formData.get('yearsCoding');
    const projectsBuilt = formData.get('projectsBuilt');
    const frameworks = formData.get('frameworks');
    
    const file = formData.get('image');
    let imageUrl = currentAbout?.imageUrl || null;
    
    if (file && typeof file.arrayBuffer === 'function' && file.size > 0) {
      try {
        const buffer = Buffer.from(await file.arrayBuffer());
        const mimeType = file.type || 'image/jpeg';
        imageUrl = `data:${mimeType};base64,${buffer.toString('base64')}`;
      } catch (e) {
        console.error('Error converting file to Base64:', e);
      }
    }

    const payload = {
      description: description ? description.toString().trim() : '',
      yearsCoding: yearsCoding ? yearsCoding.toString().trim() : null,
      projectsBuilt: projectsBuilt ? projectsBuilt.toString().trim() : null,
      frameworks: frameworks ? frameworks.toString().trim() : null,
      imageUrl,
    };

    try {
      if (currentAbout) {
        await safeMutation(p => p.about.update({
          where: { id: currentAbout.id },
          data: payload,
        }));
      } else {
        await safeMutation(p => p.about.create({
          data: payload,
        }));
      }
    } catch (err) {
      console.error('Error updating about:', err);
    }

    revalidatePath('/');
    revalidatePath('/admin/about');
  }

  return (
    <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', maxWidth: '600px' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Manage About Section</h2>
      <form action={updateAbout} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Bio / Description</label>
          <textarea 
            name="description" 
            defaultValue={about?.description || ''} 
            required 
            rows={5} 
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', resize: 'vertical' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Years Coding (e.g. 2+)</label>
          <input 
            name="yearsCoding" 
            defaultValue={about?.yearsCoding || ''} 
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Projects Built (e.g. 15+)</label>
          <input 
            name="projectsBuilt" 
            defaultValue={about?.projectsBuilt || ''} 
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Frameworks & Tools (e.g. 8+)</label>
          <input 
            name="frameworks" 
            defaultValue={about?.frameworks || ''} 
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Optional Image</label>
          {about?.imageUrl && (
            <div style={{ marginBottom: '1rem' }}>
              <img src={about.imageUrl} alt="Current About" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
            </div>
          )}
          <input 
            name="image" 
            type="file" 
            accept="image/*" 
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button type="submit" className="btn btn-primary">Save Changes</button>
          <Link href="/admin" className="btn btn-outline" style={{ color: 'var(--color-text-secondary)', borderColor: 'var(--color-border)' }}>Dashboard</Link>
        </div>
      </form>
    </div>
  );
}
