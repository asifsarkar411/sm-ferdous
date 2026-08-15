import { prisma } from '@/lib/prisma';
import { safeQuery } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ManageServices() {
  const services = await safeQuery(p => p.service.findMany({ orderBy: { title: 'asc' } }), []);

  async function createService(formData) {
    'use server';
    const title = formData.get('title');
    const description = formData.get('description');

    if (title && description) {
      await prisma.service.create({
        data: { title: title.trim(), description: description.trim() },
      });
    }

    revalidatePath('/');
    revalidatePath('/admin/services');
  }

  async function deleteService(formData) {
    'use server';
    const id = formData.get('id');
    if (id) {
      await prisma.service.delete({ where: { id } });
      revalidatePath('/');
      revalidatePath('/admin/services');
    }
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '700' }}>Manage Services</h2>
      
      <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '14px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', maxWidth: '600px', marginBottom: '2.5rem' }}>
        <h3 style={{ marginBottom: '1.25rem', fontSize: '1.15rem' }}>Add New Service</h3>
        <form action={createService} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Service Title *</label>
            <input name="title" placeholder="e.g. Full Stack Web Development" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Description *</label>
            <textarea name="description" placeholder="Description of the service offered..." required rows={3} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', resize: 'vertical' }} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Add Service</button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {services.map(service => (
          <div key={service.id} style={{ backgroundColor: 'var(--color-surface)', padding: '1.5rem', borderRadius: '14px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>{service.title}</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>{service.description}</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem' }}>
              <Link href={`/admin/services/${service.id}`} style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: '500' }}>Edit</Link>
              <form action={deleteService}>
                <input type="hidden" name="id" value={service.id} />
                <button type="submit" style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
