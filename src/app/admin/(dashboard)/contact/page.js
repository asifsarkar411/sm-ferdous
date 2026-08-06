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

    if (contactData) {
      await prisma.contact.update({
        where: { id: contactData.id },
        data: { title, description, buttonText, buttonLink },
      });
    } else {
      await prisma.contact.create({
        data: { title, description, buttonText, buttonLink },
      });
    }

    revalidatePath('/');
    revalidatePath('/admin/contact');
    redirect('/admin');
  }

  return (
    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', maxWidth: '600px' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Manage Contact Section</h2>
      <form action={updateContact} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Title</label>
          <input 
            name="title" 
            defaultValue={contactData?.title || ''} 
            required 
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description</label>
          <textarea 
            name="description" 
            defaultValue={contactData?.description || ''} 
            required 
            rows={4}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc', resize: 'vertical' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Button Text</label>
          <input 
            name="buttonText" 
            defaultValue={contactData?.buttonText || 'Book Your Free Strategy Call'} 
            required 
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Button Link (Email or Calendar URL)</label>
          <input 
            name="buttonLink" 
            type="url"
            defaultValue={contactData?.buttonLink || ''} 
            placeholder="mailto:hello@example.com"
            required 
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button type="submit" className="btn btn-primary">Save Changes</button>
          <a href="/admin" className="btn btn-outline" style={{ color: 'var(--color-text-secondary)', borderColor: '#ccc' }}>Cancel</a>
        </div>
      </form>
    </div>
  );
}
