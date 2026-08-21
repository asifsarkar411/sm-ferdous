import { prisma } from '@/lib/prisma';
import { safeQuery, safeMutation, defaultPortfolioData } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function EditService({ params }) {
  const { id } = await params;
  const dbService = await safeQuery(p => p.service.findUnique({ where: { id } }), null);
  const defaultService = defaultPortfolioData.services.find(s => s.id === id);
  const service = dbService || defaultService;

  if (!service) {
    redirect('/admin/services');
  }

  async function updateService(formData) {
    'use server';
    const title = formData.get('title');
    const description = formData.get('description');
    
    if (title && description) {
      try {
        const payload = { 
          title: title.toString().trim(), 
          description: description.toString().trim() 
        };

        await safeMutation(p => p.service.upsert({
          where: { id },
          create: { id, ...payload },
          update: payload,
        }));
      } catch (err) {
        console.error('Error updating service:', err);
      }
    }

    revalidatePath('/');
    revalidatePath('/admin/services');
    redirect('/admin/services');
  }

  return (
    <div>
      <Link href="/admin/services" style={{ color: 'var(--color-primary)', display: 'inline-block', marginBottom: '1rem', fontSize: '0.9rem' }}>&larr; Back to Services</Link>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '700' }}>Edit Service</h2>
      
      <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '14px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', maxWidth: '600px', marginBottom: '2rem' }}>
        <form action={updateService} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Title *</label>
            <input name="title" defaultValue={service.title} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Description *</label>
            <textarea name="description" defaultValue={service.description} required rows={4} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', resize: 'vertical' }} />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <button type="submit" className="btn btn-primary">Save Changes</button>
            <Link href="/admin/services" className="btn btn-outline" style={{ color: 'var(--color-text-secondary)', borderColor: 'var(--color-border)' }}>Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
