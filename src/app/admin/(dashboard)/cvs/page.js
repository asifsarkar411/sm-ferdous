import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';


export async function createCV(formData) {
  'use server';
  const title = formData.get('title');
  const file = formData.get('file');

  if (file && file.size > 0) {
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const mimeType = file.type || 'application/pdf';
      const fileUrl = `data:${mimeType};base64,${buffer.toString('base64')}`;

      await prisma.cV.create({
        data: { title, fileUrl },
      });
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
  await prisma.cV.delete({ where: { id } });
  revalidatePath('/');
  revalidatePath('/admin/cvs');
}

export async function toggleHideCV(formData) {
  'use server';
  const id = formData.get('id');
  const isHidden = formData.get('isHidden') === 'true';
  await prisma.cV.update({ where: { id }, data: { isHidden: !isHidden } });
  revalidatePath('/');
  revalidatePath('/admin/cvs');
}

export default async function ManageCVs() {
  const cvs = await prisma.cV.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Manage CVs</h2>
      
      <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', maxWidth: '600px', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Upload New CV</h3>
        <form action={createCV} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input name="title" placeholder="CV Title (e.g. Frontend Developer CV)" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          <input name="file" type="file" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Upload CV</button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        {cvs.map(cv => (
          <div key={cv.id} style={{ backgroundColor: 'var(--color-surface)', padding: '1.5rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', opacity: cv.isHidden ? 0.6 : 1 }}>
            <h4 style={{ marginBottom: '0.5rem' }}>{cv.title} {cv.isHidden && '(Hidden)'}</h4>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <a href={cv.fileUrl} download={`${cv.title.replace(/\s+/g, '_')}`} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Download</a>
              <form action={toggleHideCV}>
                <input type="hidden" name="id" value={cv.id} />
                <input type="hidden" name="isHidden" value={cv.isHidden.toString()} />
                <button type="submit" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                  {cv.isHidden ? 'Unhide' : 'Hide'}
                </button>
              </form>
              <form action={deleteCV}>
                <input type="hidden" name="id" value={cv.id} />
                <button type="submit" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'red', borderColor: 'red' }}>
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
