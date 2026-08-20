import { safeQuery, safeMutation } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ManageAbout() {
  const aboutData = await safeQuery(p => p.about.findFirst(), null);

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
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description (Bio)</label>
          <textarea 
            name="description" 
            defaultValue={aboutData?.description || ''} 
            required 
            rows={4}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Years Coding</label>
            <input 
              name="yearsCoding" 
              defaultValue={aboutData?.yearsCoding || ''} 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Projects Built</label>
            <input 
              name="projectsBuilt" 
              defaultValue={aboutData?.projectsBuilt || ''} 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text)' }}>Language & Frameworks</label>
            <input name="frameworks" defaultValue={aboutData?.frameworks || ''} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
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
