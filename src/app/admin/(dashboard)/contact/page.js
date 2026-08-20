import { safeQuery, safeMutation } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ManageContact() {
  const contactData = await safeQuery(p => p.contact.findFirst(), null);

  async function updateContact(formData) {
    'use server';
    const currentContact = await safeQuery(p => p.contact.findFirst(), null);

    const title = formData.get('title');
    const description = formData.get('description');
    const buttonText = formData.get('buttonText');
    const buttonLink = formData.get('buttonLink');
    const motto = formData.get('motto');
    const address = formData.get('address');
    const location = formData.get('location');
    const phoneNumber = formData.get('phoneNumber');

    const payload = {
      title: title ? title.toString().trim() : null,
      description: description ? description.toString().trim() : null,
      buttonText: buttonText ? buttonText.toString().trim() : null,
      buttonLink: buttonLink ? buttonLink.toString().trim() : null,
      motto: motto ? motto.toString().trim() : null,
      address: address ? address.toString().trim() : null,
      location: location ? location.toString().trim() : null,
      phoneNumber: phoneNumber ? phoneNumber.toString().trim() : null,
    };

    try {
      if (currentContact) {
        await safeMutation(p => p.contact.update({
          where: { id: currentContact.id },
          data: payload,
        }));
      } else {
        await safeMutation(p => p.contact.create({
          data: payload,
        }));
      }
    } catch (err) {
      console.error('Error updating contact:', err);
    }

    revalidatePath('/');
    revalidatePath('/admin/contact');
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
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
          <input 
            name="motto" 
            defaultValue={contactData?.motto || ''} 
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Address</label>
          <input 
            name="address" 
            defaultValue={contactData?.address || ''} 
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Location</label>
          <input 
            name="location" 
            defaultValue={contactData?.location || ''} 
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Phone Number</label>
          <input 
            name="phoneNumber" 
            defaultValue={contactData?.phoneNumber || ''} 
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description</label>
          <textarea 
            name="description" 
            defaultValue={contactData?.description || ''} 
            rows={2}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', resize: 'vertical' }}
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
