import { safeQuery, safeMutation } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function createCV(formData) {
  'use server';
  const title = formData.get('title');
  const file = formData.get('file');

  if (file && typeof file.arrayBuffer === 'function' && file.size > 0 && title) {
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const mimeType = file.type || 'application/pdf';
      const fileUrl = `data:${mimeType};base64,${buffer.toString('base64')}`;

      await safeMutation(p => p.cV.create({
        data: { title: title.toString().trim(), fileUrl },
      }));
      revalidatePath('/');
      revalidatePath('/admin/cvs');
    } catch (error) {
      console.error('Error uploading CV:', error);
    }
  }
}

export async function deleteCV(formData) {
  'use server';
  const id = formData.get('id');
  if (id) {
    try {
      await safeMutation(p => p.cV.delete({ where: { id: id.toString() } }));
    } catch (error) {
      console.error('Error deleting CV:', error);
    }
    revalidatePath('/');
    revalidatePath('/admin/cvs');
  }
}

export async function toggleHideCV(formData) {
  'use server';
  const id = formData.get('id');
  const isHidden = formData.get('isHidden') === 'true';
  if (id) {
    try {
      await safeMutation(p => p.cV.update({ where: { id: id.toString() }, data: { isHidden: !isHidden } }));
    } catch (error) {
      console.error('Error toggling CV:', error);
    }
    revalidatePath('/');
    revalidatePath('/admin/cvs');
  }
}

export default async function ManageCVs() {
  const cvs = await safeQuery(p => p.cV.findMany({ orderBy: { createdAt: 'desc' } }), []);

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '700' }}>Manage CVs</h2>
      
      <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '14px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', maxWidth: '600px', marginBottom: '2.5rem' }}>
        <h3 style={{ marginBottom: '1.25rem', fontSize: '1.15rem' }}>Upload New CV</h3>
        <form action={createCV} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>CV Title *</label>
            <input name="title" placeholder="e.g. Frontend Developer CV" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>File (PDF / DOC) *</label>
            <input name="file" type="file" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Upload CV</button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {cvs.map(cv => (
          <div key={cv.id} style={{ backgroundColor: 'var(--color-surface)', padding: '1.5rem', borderRadius: '14px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', opacity: cv.isHidden ? 0.6 : 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ marginBottom: '0.35rem', fontSize: '1.05rem', fontWeight: '600' }}>{cv.title} {cv.isHidden && '(Hidden)'}</h4>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
              <a href={cv.fileUrl} download={`${(cv.title || 'CV').replace(/\s+/g, '_')}`} className="btn btn-primary" style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}>Download</a>
              <form action={toggleHideCV}>
                <input type="hidden" name="id" value={cv.id} />
                <input type="hidden" name="isHidden" value={cv.isHidden.toString()} />
                <button type="submit" className="btn btn-outline" style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}>
                  {cv.isHidden ? 'Unhide' : 'Hide'}
                </button>
              </form>
              <form action={deleteCV}>
                <input type="hidden" name="id" value={cv.id} />
                <button type="submit" className="btn btn-outline" style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem', color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)' }}>
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
