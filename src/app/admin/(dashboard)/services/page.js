import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default async function ManageServices() {
  const services = await prisma.service.findMany();

  async function createService(formData) {
    'use server';
    const title = formData.get('title');
    const description = formData.get('description');

    await prisma.service.create({
      data: { title, description },
    });

    revalidatePath('/');
    revalidatePath('/admin/services');
  }

  async function deleteService(formData) {
    'use server';
    const id = formData.get('id');
    await prisma.service.delete({ where: { id } });
    revalidatePath('/');
    revalidatePath('/admin/services');
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Manage Services</h2>
      
      <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', maxWidth: '600px', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Add New Service</h3>
        <form action={createService} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input name="title" placeholder="Service Title" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)' }} />
          <textarea name="description" placeholder="Service Description" required rows={3} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', resize: 'vertical' }} />
          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Add Service</button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        {services.map(service => (
          <div key={service.id} style={{ backgroundColor: 'var(--color-surface)', padding: '1.5rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
            <h4 style={{ marginBottom: '0.5rem' }}>{service.title}</h4>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem', fontSize: '0.875rem' }}>{service.description}</p>
            <form action={deleteService}>
              <input type="hidden" name="id" value={service.id} />
              <button type="submit" style={{ color: 'red', textDecoration: 'underline', fontSize: '0.875rem' }}>Delete</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
