import { prisma } from '@/lib/prisma';
import { safeQuery } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function EditLanguage({ params }) {
  const { id } = await params;
  const lang = await safeQuery(p => p.languageProficiency.findUnique({ where: { id } }), null);

  if (!lang) {
    redirect('/admin/languages');
  }

  async function updateLanguage(formData) {
    'use server';
    const language = formData.get('language');
    const reading = formData.get('reading');
    const writing = formData.get('writing');
    const speaking = formData.get('speaking');

    if (language) {
      try {
        await safeMutation(p => p.languageProficiency.update({
          where: { id },
          data: {
            language: language.toString().trim(),
            reading: reading ? reading.toString().trim() : 'Good',
            writing: writing ? writing.toString().trim() : 'Good',
            speaking: speaking ? speaking.toString().trim() : 'Good',
          },
        }));
      } catch (err) {
        console.error('Error updating language:', err);
      }
    }

    revalidatePath('/admin/languages');
    revalidatePath('/');
    redirect('/admin/languages');
  }

  async function deleteLanguage() {
    'use server';
    try {
      await safeMutation(p => p.languageProficiency.delete({
        where: { id },
      }));
    } catch (err) {
      console.error('Error deleting language:', err);
    }
    revalidatePath('/admin/languages');
    revalidatePath('/');
    redirect('/admin/languages');
  }

  return (
    <div>
      <Link href="/admin/languages" style={{ color: 'var(--color-primary)', display: 'inline-block', marginBottom: '1rem', fontSize: '0.9rem' }}>&larr; Back to Languages</Link>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '700' }}>Edit Language</h2>
      
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 450px', backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '14px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <form action={updateLanguage} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Language *</label>
              <input name="language" defaultValue={lang.language} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Reading *</label>
              <input name="reading" defaultValue={lang.reading} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Writing *</label>
              <input name="writing" defaultValue={lang.writing} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Speaking *</label>
              <input name="speaking" defaultValue={lang.speaking} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
            </div>

            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Save Changes</button>
          </form>
        </div>

        <div style={{ flex: '1 1 300px', backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '14px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', alignSelf: 'flex-start' }}>
          <h3 style={{ color: '#ef4444', marginBottom: '1rem' }}>Danger Zone</h3>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.25rem', fontSize: '0.875rem' }}>
            Deleting this record is permanent.
          </p>
          <form action={deleteLanguage}>
            <button type="submit" className="btn btn-outline" style={{ color: '#ef4444', borderColor: '#ef4444', width: '100%' }}>Delete Language</button>
          </form>
        </div>
      </div>
    </div>
  );
}
