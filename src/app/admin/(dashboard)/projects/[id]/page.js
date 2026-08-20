import { prisma } from '@/lib/prisma';
import { safeQuery } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function EditProject({ params }) {
  const { id } = await params;
  const project = await safeQuery(p => p.project.findUnique({ where: { id } }), null);

  if (!project) {
    redirect('/admin/projects');
  }

  async function updateProject(formData) {
    'use server';
    const title = formData.get('title');
    const category = formData.get('category');
    const description = formData.get('description');
    const liveUrl = formData.get('liveUrl');
    const detailsUrl = formData.get('detailsUrl');
    
    const file = formData.get('image');
    let imageUrl = project.imageUrl;
    
    if (file && typeof file.arrayBuffer === 'function' && file.size > 0) {
      try {
        const buffer = Buffer.from(await file.arrayBuffer());
        const mimeType = file.type || 'image/jpeg';
        imageUrl = `data:${mimeType};base64,${buffer.toString('base64')}`;
      } catch (e) {
        console.error('Error converting file to Base64:', e);
      }
    }

    if (title && title.toString().trim().length > 0) {
      try {
        await safeMutation(p => p.project.update({
          where: { id },
          data: { 
            title: title.toString().trim(), 
            category: category ? category.toString().trim() : 'Development', 
            description: description ? description.toString().trim() : '', 
            liveUrl: liveUrl ? liveUrl.toString().trim() : null, 
            detailsUrl: detailsUrl ? detailsUrl.toString().trim() : null, 
            imageUrl 
          },
        }));
      } catch (err) {
        console.error('Error updating project:', err);
      }
    }

    revalidatePath('/');
    revalidatePath('/admin/projects');
    redirect('/admin/projects');
  }

  async function deleteProject() {
    'use server';
    try {
      await safeMutation(p => p.project.delete({ where: { id: id.toString() } }));
    } catch (err) {
      console.error('Error deleting project:', err);
    }
    revalidatePath('/');
    revalidatePath('/admin/projects');
    redirect('/admin/projects');
  }

  return (
    <div>
      <Link href="/admin/projects" style={{ color: 'var(--color-primary)', display: 'inline-block', marginBottom: '1rem', fontSize: '0.9rem' }}>&larr; Back to Projects</Link>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '700' }}>Edit Project</h2>
      
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 500px', backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '14px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <form action={updateProject} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Project Title *</label>
              <input name="title" defaultValue={project.title} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Category *</label>
              <input name="category" defaultValue={project.category} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Short Description *</label>
              <textarea name="description" defaultValue={project.description} required rows={3} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', resize: 'vertical' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Detailed Overview (optional)</label>
              <textarea name="detailsUrl" defaultValue={project.detailsUrl || ''} rows={5} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', resize: 'vertical' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Live URL (optional)</label>
              <input name="liveUrl" defaultValue={project.liveUrl || ''} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Update Image (optional - leave empty to keep current)</label>
              {project.imageUrl && (
                <div style={{ marginBottom: '0.5rem' }}>
                  <img src={project.imageUrl} alt={project.title} style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '6px' }} />
                </div>
              )}
              <input name="image" type="file" accept="image/*" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
            </div>

            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Save Changes</button>
          </form>
        </div>

        <div style={{ flex: '1 1 300px', backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '14px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', alignSelf: 'flex-start' }}>
          <h3 style={{ color: '#ef4444', marginBottom: '1rem' }}>Danger Zone</h3>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.25rem', fontSize: '0.875rem' }}>
            Deleting this project is permanent.
          </p>
          <form action={deleteProject}>
            <button type="submit" className="btn btn-outline" style={{ color: '#ef4444', borderColor: '#ef4444', width: '100%' }}>Delete Project</button>
          </form>
        </div>
      </div>
    </div>
  );
}
