import { prisma } from '@/lib/prisma';
import { safeQuery, safeMutation } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ManageProjects() {
  const projects = await safeQuery(p => p.project.findMany({ orderBy: { title: 'asc' } }), []);

  async function createProject(formData) {
    'use server';
    const title = formData.get('title');
    const category = formData.get('category');
    const description = formData.get('description');
    const liveUrl = formData.get('liveUrl');
    const detailsUrl = formData.get('detailsUrl');
    
    const file = formData.get('image');
    let imageUrl = '';
    
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
        await safeMutation(p => p.project.create({
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
        console.error('Error creating project:', err);
      }
    }

    revalidatePath('/');
    revalidatePath('/admin/projects');
  }

  async function deleteProject(formData) {
    'use server';
    const id = formData.get('id');
    if (id) {
      try {
        await safeMutation(p => p.project.delete({ where: { id: id.toString() } }));
      } catch (err) {
        console.error('Error deleting project:', err);
      }
      revalidatePath('/');
      revalidatePath('/admin/projects');
    }
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '700' }}>Manage Projects</h2>
      
      <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '14px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', maxWidth: '650px', marginBottom: '2.5rem' }}>
        <h3 style={{ marginBottom: '1.25rem', fontSize: '1.15rem' }}>Add New Project</h3>
        <form action={createProject} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Project Title *</label>
            <input name="title" placeholder="e.g. Smart IoT Monitoring System" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Category *</label>
            <input name="category" placeholder="e.g. Web Development, IoT & Embedded" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Short Description *</label>
            <textarea name="description" placeholder="Short summary displayed on the card..." required rows={3} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', resize: 'vertical' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Detailed Overview (optional)</label>
            <textarea name="detailsUrl" placeholder="Detailed architectural and feature breakdown..." rows={5} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', resize: 'vertical' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Live Demo / Repo URL (optional)</label>
            <input name="liveUrl" placeholder="https://..." style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Cover Image (optional)</label>
            <input name="image" type="file" accept="image/*" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Add Project</button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {projects.map(project => (
          <div key={project.id} style={{ backgroundColor: 'var(--color-surface)', padding: '1.5rem', borderRadius: '14px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column' }}>
            {project.imageUrl && <img src={project.imageUrl} alt={project.title} style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} />}
            <h4 style={{ marginBottom: '0.25rem', fontSize: '1.1rem', fontWeight: '600' }}>{project.title}</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{project.category}</p>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem', flex: 1, lineHeight: 1.5 }}>{project.description}</p>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem' }}>
              <Link href={`/admin/projects/${project.id}`} style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: '500' }}>Edit</Link>
              <form action={deleteProject}>
                <input type="hidden" name="id" value={project.id} />
                <button type="submit" style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
