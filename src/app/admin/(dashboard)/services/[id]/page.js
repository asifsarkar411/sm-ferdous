import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export default async function EditService({ params }) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });

  if (!service) {
    redirect('/admin/services');
  }

  async function updateService(formData) {
    'use server';
    const title = formData.get('title');
    const description = formData.get('description');
    
    await prisma.service.update({
      where: { id },
      data: { title, description },
    });

    revalidatePath('/');
    revalidatePath('/admin/services');
    redirect('/admin/services');
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Edit Service</h2>
      
      <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', maxWidth: '600px', marginBottom: '2rem' }}>
        <form action={updateService} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Service Title</label>
          <input name="title" defaultValue={service.title} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          
          <label style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Description</label>
          <textarea name="description" defaultValue={service.description} required rows={3} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', resize: 'vertical' }} />
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" className="btn btn-primary">Save Changes</button>
            <a href="/admin/services" className="btn btn-outline" style={{ color: 'var(--color-text-secondary)', borderColor: 'var(--color-border)' }}>Cancel</a>
          </div>
        </form>
      </div>
    </div>
  );
}
