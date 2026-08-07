import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default async function ManageContact() {
  const contactData = await prisma.contact.findFirst();

  async function updateContact(formData) {
    'use server';
    const title = formData.get('title');
    const description = formData.get('description');
    const buttonText = formData.get('buttonText');
    const buttonLink = formData.get('buttonLink');
    const motto = formData.get('motto');
    const address = formData.get('address');
    const location = formData.get('location');
    const phoneNumber = formData.get('phoneNumber');

    if (contactData) {
      await prisma.contact.update({
        where: { id: contactData.id },
        data: { title, description, buttonText, buttonLink, motto, address, location, phoneNumber },
      });
    } else {
      await prisma.contact.create({
        data: { title, description, buttonText, buttonLink, motto, address, location, phoneNumber },
      });
    }

    revalidatePath('/');
    revalidatePath('/admin/contact');
    redirect('/admin');
  }

  return (
    <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', maxWidth: '600px' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Manage Contact Section</h2>
      <form action={updateContact} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Title</label>
          <input 
            name="title" 
            defaultValue={contactData?.title || ''} 
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description</label>
          <textarea 
            name="description" 
            defaultValue={contactData?.description || ''} 
            rows={2}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', resize: 'vertical' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Motto</label>
          <input 
            name="motto" 
            defaultValue={contactData?.motto || ''} 
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Address</label>
          <input 
            name="address" 
            defaultValue={contactData?.address || ''} 
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Location</label>
          <input 
            name="location" 
            defaultValue={contactData?.location || ''} 
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Phone Number</label>
          <input 
            name="phoneNumber" 
            defaultValue={contactData?.phoneNumber || ''} 
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button type="submit" className="btn btn-primary">Save Changes</button>
          <a href="/admin" className="btn btn-outline" style={{ color: 'var(--color-text-secondary)', borderColor: 'var(--color-border)' }}>Cancel</a>
        </div>
      </form>
    </div>
  );
}
