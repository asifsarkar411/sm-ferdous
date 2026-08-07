import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { uploadToImgBB } from '@/lib/imgbb';

export default async function ManageHero() {
  const heroData = await prisma.hero.findFirst();

  async function updateHero(formData) {
    'use server';
    const currentHero = await prisma.hero.findFirst();
    
    const title = formData.get('title');
    const subtitle = formData.get('subtitle');
    const logoName = formData.get('logoName');
    
    const file = formData.get('image');
    let imageUrl = currentHero?.imageUrl || null;

    const logoFile = formData.get('logoImage');
    let logoImageUrl = currentHero?.logoImage || null;

    if (file && file.size > 0) {
      try {
        const buffer = Buffer.from(await file.arrayBuffer());
        imageUrl = await uploadToImgBB(buffer);
      } catch (e) { console.error('Error uploading file to ImgBB:', e); }
    }

    if (logoFile && logoFile.size > 0) {
      try {
        const buffer = Buffer.from(await logoFile.arrayBuffer());
        logoImageUrl = await uploadToImgBB(buffer);
      } catch (e) { console.error('Error uploading logo file to ImgBB:', e); }
    }

    if (currentHero) {
      await prisma.hero.update({
        where: { id: currentHero.id },
        data: { title, subtitle, imageUrl, logoName, logoImage: logoImageUrl },
      });
    } else {
      await prisma.hero.create({
        data: { title, subtitle, imageUrl, logoName, logoImage: logoImageUrl },
      });
    }

    revalidatePath('/');
    revalidatePath('/admin/hero');
    redirect('/admin');
  }

  return (
    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', maxWidth: '600px' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Manage Hero & Navbar Settings</h2>
      <form action={updateHero} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        <div style={{ padding: '1rem', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#fafafa' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Navbar Logo Settings</h3>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Navbar Logo Name</label>
            <input 
              name="logoName" 
              defaultValue={heroData?.logoName || ''} 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }}
              placeholder="e.g. SM FERDOUS AHMMED"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Navbar Logo Image</label>
            {heroData?.logoImage && (
              <div style={{ marginBottom: '1rem' }}>
                <img src={heroData.logoImage} alt="Current Logo" style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
              </div>
            )}
            <input 
              name="logoImage" 
              type="file"
              accept="image/*"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }}
            />
          </div>
        </div>

        <div style={{ padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Hero Section Settings</h3>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Title</label>
            <input 
              name="title" 
              defaultValue={heroData?.title || ''} 
              required 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }}
            />
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Subtitle</label>
            <textarea 
              name="subtitle" 
              defaultValue={heroData?.subtitle || ''} 
              required 
              rows={4}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc', resize: 'vertical' }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Profile Image Upload</label>
            {heroData?.imageUrl && (
              <div style={{ marginBottom: '1rem' }}>
                <img src={heroData.imageUrl} alt="Current Profile" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }} />
              </div>
            )}
            <input 
              name="image" 
              type="file"
              accept="image/*"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }}
            />
            <small style={{ color: 'var(--color-text-secondary)', display: 'block', marginTop: '0.5rem' }}>
              Upload a picture from your device.
            </small>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button type="submit" className="btn btn-primary">Save Changes</button>
          <a href="/admin" className="btn btn-outline" style={{ color: 'var(--color-text-secondary)', borderColor: '#ccc' }}>Cancel</a>
        </div>
      </form>
    </div>
  );
}
