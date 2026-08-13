import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

export default async function ManageLanguages() {
  const languages = await prisma.languageProficiency.findMany();

  async function createLanguage(formData) {
    "use server";
    const language = formData.get('language');
    const reading = formData.get('reading');
    const writing = formData.get('writing');
    const speaking = formData.get('speaking');
    
    await prisma.languageProficiency.create({
      data: {
        language,
        reading,
        writing,
        speaking,
      }
    });
    
    revalidatePath('/admin/languages');
  }

  async function deleteLanguage(formData) {
    "use server";
    const id = formData.get('id');
    await prisma.languageProficiency.delete({ where: { id } });
    revalidatePath('/admin/languages');
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Manage Language Proficiencies</h2>
      
      <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '12px', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Add New Language</h3>
        <form action={createLanguage} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input name="language" placeholder="Language (e.g., English)" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)' }} />
          <input name="reading" placeholder="Reading Level (e.g., Fluent)" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)' }} />
          <input name="writing" placeholder="Writing Level (e.g., Good)" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)' }} />
          <input name="speaking" placeholder="Speaking Level (e.g., Basic)" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)' }} />
          
          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Add Language</button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {languages.map(lang => (
          <div key={lang.id} style={{ backgroundColor: 'var(--color-surface)', padding: '1.5rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
            <h4 style={{ marginBottom: '0.5rem' }}>{lang.language}</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>Reading: {lang.reading}</p>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>Writing: {lang.writing}</p>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>Speaking: {lang.speaking}</p>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Link href={`/admin/languages/${lang.id}`} style={{ color: 'var(--color-primary)', textDecoration: 'underline', fontSize: '0.875rem' }}>Edit</Link>
              <form action={deleteLanguage}>
                <input type="hidden" name="id" value={lang.id} />
                <button type="submit" style={{ color: 'var(--color-accent)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.875rem' }}>Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
