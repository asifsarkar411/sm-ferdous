import { prisma } from '@/lib/prisma';
import { safeQuery, safeMutation } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ManageLanguages() {
  const languages = await safeQuery(p => p.languageProficiency.findMany({ orderBy: { language: 'asc' } }), []);

  async function createLanguage(formData) {
    'use server';
    const language = formData.get('language');
    const reading = formData.get('reading');
    const writing = formData.get('writing');
    const speaking = formData.get('speaking');

    if (language) {
      try {
        await safeMutation(p => p.languageProficiency.create({
          data: {
            language: language.toString().trim(),
            reading: reading ? reading.toString().trim() : 'Good',
            writing: writing ? writing.toString().trim() : 'Good',
            speaking: speaking ? speaking.toString().trim() : 'Good',
          },
        }));
      } catch (err) {
        console.error('Error creating language:', err);
      }
    }
    
    revalidatePath('/admin/languages');
    revalidatePath('/');
  }

  async function deleteLanguage(formData) {
    'use server';
    const id = formData.get('id');
    if (id) {
      try {
        await safeMutation(p => p.languageProficiency.delete({
          where: { id: id.toString() },
        }));
      } catch (err) {
        console.error('Error deleting language:', err);
      }
    }
    
    revalidatePath('/admin/languages');
    revalidatePath('/');
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '700' }}>Manage Language Proficiencies</h2>
      
      <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '14px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', maxWidth: '600px', marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem' }}>Add New Language</h3>
        <form action={createLanguage} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Language *</label>
            <input name="language" placeholder="e.g., English, Bangla, German" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Reading Proficiency (Dotted Rating: 1 to 5 dots)</label>
            <input list="proficiency-options" name="reading" placeholder="e.g. Native (5/5), Fluent, Professional (4/5)" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Writing Proficiency (Dotted Rating: 1 to 5 dots)</label>
            <input list="proficiency-options" name="writing" placeholder="e.g. Native (5/5), Fluent, Professional (4/5)" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Speaking Proficiency (Dotted Rating: 1 to 5 dots)</label>
            <input list="proficiency-options" name="speaking" placeholder="e.g. Native (5/5), Fluent, Conversational (3/5)" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          </div>

          <datalist id="proficiency-options">
            <option value="Native" />
            <option value="Fluent" />
            <option value="Professional" />
            <option value="Intermediate" />
            <option value="Basic" />
            <option value="5/5" />
            <option value="4/5" />
            <option value="3/5" />
            <option value="2/5" />
            <option value="1/5" />
          </datalist>
          
          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Add Language</button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {languages.map((lang) => (
          <div key={lang.id} style={{ backgroundColor: 'var(--color-surface)', padding: '1.5rem', borderRadius: '14px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <h4 style={{ fontSize: '1.15rem', fontWeight: '600', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>{lang.language}</h4>
            <div style={{ fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', color: 'var(--color-text-secondary)' }}>
              <div>Reading: <strong style={{ color: 'var(--color-text-primary)' }}>{lang.reading}</strong></div>
              <div>Writing: <strong style={{ color: 'var(--color-text-primary)' }}>{lang.writing}</strong></div>
              <div>Speaking: <strong style={{ color: 'var(--color-text-primary)' }}>{lang.speaking}</strong></div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem', marginTop: '1rem' }}>
              <Link href={`/admin/languages/${lang.id}`} style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: '500' }}>Edit</Link>
              <form action={deleteLanguage}>
                <input type="hidden" name="id" value={lang.id} />
                <button type="submit" style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
