import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

export default async function ManageProjects() {
  const projects = await prisma.project.findMany();

  async function createProject(formData) {
    'use server';
    const title = formData.get('title');
    const category = formData.get('category');
    const description = formData.get('description');
    const liveUrl = formData.get('liveUrl');
    
    // Simple local file upload for the project image
    const file = formData.get('image');
    let imageUrl = '';
    
    if (file && file.size > 0) {
      const publicDir = path.join(process.cwd(), 'public', 'uploads');
      try {
        const buffer = Buffer.from(await file.arrayBuffer());
        const originalName = file.name || 'project.jpg';
        const filename = `${Date.now()}-${originalName.replace(/\\s/g, '_')}`;
        await fs.mkdir(publicDir, { recursive: true });
        await fs.writeFile(path.join(publicDir, filename), buffer);
        imageUrl = `/uploads/${filename}`;
      } catch (e) {
        console.error('Error saving file:', e);
      }
    }

    await prisma.project.create({
      data: { title, category, description, liveUrl, imageUrl },
    });

    revalidatePath('/');
    revalidatePath('/admin/projects');
  }

  async function deleteProject(formData) {
    'use server';
    const id = formData.get('id');
    await prisma.project.delete({ where: { id } });
    revalidatePath('/');
    revalidatePath('/admin/projects');
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Manage Projects</h2>
      
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', maxWidth: '600px', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Add New Project</h3>
        <form action={createProject} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input name="title" placeholder="Project Title" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }} />
          <input name="category" placeholder="Category (e.g., Web Development)" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }} />
          <textarea name="description" placeholder="Description" required rows={3} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc', resize: 'vertical' }} />
          <input name="liveUrl" placeholder="Live URL (optional)" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }} />
          <input name="image" type="file" accept="image/*" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }} />
          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Add Project</button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        {projects.map(project => (
          <div key={project.id} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
            {project.imageUrl && <img src={project.imageUrl} alt={project.title} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} />}
            <h4 style={{ marginBottom: '0.5rem' }}>{project.title}</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>{project.category}</p>
            <p style={{ fontSize: '0.875rem', color: '#555', marginBottom: '1rem' }}>{project.description}</p>
            <form action={deleteProject}>
              <input type="hidden" name="id" value={project.id} />
              <button type="submit" style={{ color: 'red', textDecoration: 'underline', fontSize: '0.875rem' }}>Delete</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
