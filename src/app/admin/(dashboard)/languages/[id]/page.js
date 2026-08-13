import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

export default async function EditLanguage({ params }) {
  const { id } = await params;
  
  const language = await prisma.languageProficiency.findUnique({ where: { id } });

  if (!language) {
    redirect('/admin/languages');
  }

  async function updateLanguage(formData) {
    "use server";
    const lang = formData.get('language');
    const reading = formData.get('reading');
    const writing = formData.get('writing');
    const speaking = formData.get('speaking');
    
    await prisma.languageProficiency.update({
      where: { id },
      data: {
        language: lang,
        reading,
        writing,
        speaking,
      }
    });
    
    revalidatePath('/admin/languages');
    redirect('/admin/languages');
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <Link href="/admin/languages" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>&larr; Back</Link>
        <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Edit Language Proficiency</h2>
      </div>

      <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '12px' }}>
        <form action={updateLanguage} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input name="language" defaultValue={language.language} placeholder="Language Name" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)' }} />
          <input name="reading" defaultValue={language.reading} placeholder="Reading Level" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)' }} />
          <input name="writing" defaultValue={language.writing} placeholder="Writing Level" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)' }} />
          <input name="speaking" defaultValue={language.speaking} placeholder="Speaking Level" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)' }} />
          
          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Update Language</button>
        </form>
      </div>
    </div>
  );
}
