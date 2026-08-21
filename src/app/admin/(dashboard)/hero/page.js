import { safeQuery, safeMutation, defaultPortfolioData } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ManageHero() {
  const heroData = await safeQuery(p => p.hero.findFirst(), null);
  const hero = heroData || defaultPortfolioData.heroData;

  async function updateHero(formData) {
    'use server';
    const currentHero = await safeQuery(p => p.hero.findFirst(), null);
    
    const title = formData.get('title');
    const subtitle = formData.get('subtitle');
    const description = formData.get('description');
    const logoName = formData.get('logoName');
    const isAvailable = formData.get('isAvailable') === 'true';
    const statusText = formData.get('statusText');
    const showStatusBadge = formData.get('showStatusBadge') === 'on';
    
    const file = formData.get('image');
    let imageUrl = currentHero?.imageUrl || null;

    const logoFile = formData.get('logoImage');
    let logoImageUrl = currentHero?.logoImage || null;

    if (file && typeof file.arrayBuffer === 'function' && file.size > 0) {
      try {
        const buffer = Buffer.from(await file.arrayBuffer());
        const mimeType = file.type || 'image/jpeg';
        imageUrl = `data:${mimeType};base64,${buffer.toString('base64')}`;
      } catch (e) { console.error('Error converting file to Base64:', e); }
    }

    if (logoFile && typeof logoFile.arrayBuffer === 'function' && logoFile.size > 0) {
      try {
        const buffer = Buffer.from(await logoFile.arrayBuffer());
        const mimeType = logoFile.type || 'image/png';
        logoImageUrl = `data:${mimeType};base64,${buffer.toString('base64')}`;
      } catch (e) { console.error('Error converting logo to Base64:', e); }
    }

    const heroPayload = {
      title: title ? title.toString().trim() : '',
      subtitle: subtitle ? subtitle.toString().trim() : '',
      description: description ? description.toString().trim() : null,
      imageUrl,
      logoName: logoName ? logoName.toString().trim() : null,
      logoImage: logoImageUrl,
      isAvailable,
      statusText: statusText ? statusText.toString().trim() : 'Available for new projects',
      showStatusBadge,
    };

    try {
      if (currentHero) {
        await safeMutation(p => p.hero.update({
          where: { id: currentHero.id },
          data: heroPayload,
        }));
      } else {
        await safeMutation(p => p.hero.create({
          data: heroPayload,
        }));
      }
    } catch (err) {
      console.error('Error updating hero:', err);
    }

    revalidatePath('/');
    revalidatePath('/admin/hero');
  }

  const isAvailableValue = hero?.isAvailable !== false;
  const showBadgeValue = hero?.showStatusBadge !== false;

  return (
    <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', maxWidth: '650px' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Manage Hero & Status Settings</h2>
      <form action={updateHero} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Availability & Status Badge Settings */}
        <div style={{ padding: '1.25rem', border: '1px solid var(--color-border)', borderRadius: '10px', backgroundColor: 'var(--color-bg)' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🟢</span> Availability Status Badge
          </h3>
          
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontWeight: '500' }}>
              <input 
                type="checkbox" 
                name="showStatusBadge" 
                defaultChecked={showBadgeValue} 
                style={{ width: '18px', height: '18px' }}
              />
              <span>Show status badge in Hero section</span>
            </label>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500' }}>Availability State</label>
            <select 
              name="isAvailable" 
              defaultValue={isAvailableValue ? 'true' : 'false'}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }}
            >
              <option value="true">🟢 Available (Active / Green Glowing Dot)</option>
              <option value="false">🔴 Unavailable / Busy (Red Glowing Dot)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '500' }}>Custom Status Text</label>
            <input 
              name="statusText" 
              defaultValue={hero?.statusText || 'Available for new projects'} 
              placeholder="e.g. Available for new projects or Unavailable / Busy"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }}
            />
          </div>
        </div>

        <div style={{ padding: '1.25rem', border: '1px solid var(--color-border)', borderRadius: '10px', backgroundColor: 'var(--color-bg)' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Navbar Logo Settings</h3>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Navbar Logo Name</label>
            <input 
              name="logoName" 
              defaultValue={hero?.logoName || ''} 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }}
              placeholder="e.g. SM FERDOUS AHMMED"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Navbar Logo Image</label>
            {hero?.logoImage && (
              <div style={{ marginBottom: '1rem' }}>
                <img src={hero.logoImage} alt="Current Logo" style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
              </div>
            )}
            <input 
              name="logoImage" 
              type="file"
              accept="image/*"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }}
            />
          </div>
        </div>

        <div style={{ padding: '1.25rem', border: '1px solid var(--color-border)', borderRadius: '10px' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Hero Section Content</h3>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Title</label>
            <input 
              name="title" 
              defaultValue={hero?.title || ''} 
              required 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
            />
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Subtitle</label>
            <textarea 
              name="subtitle" 
              defaultValue={hero?.subtitle || ''} 
              required 
              rows={3}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', resize: 'vertical' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description (Bio / Summary)</label>
            <textarea 
              name="description" 
              defaultValue={hero?.description || ''} 
              rows={4}
              placeholder="Specializing in building high-performance web applications..."
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', resize: 'vertical' }}
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
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
            />
            <small style={{ color: 'var(--color-text-secondary)', display: 'block', marginTop: '0.5rem' }}>
              Upload a picture from your device.
            </small>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button type="submit" className="btn btn-primary">Save Changes</button>
          <Link href="/admin" className="btn btn-outline" style={{ color: 'var(--color-text-secondary)', borderColor: 'var(--color-border)' }}>Dashboard</Link>
        </div>
      </form>
    </div>
  );
}
