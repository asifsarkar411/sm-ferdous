import { prisma } from '@/lib/prisma';
import { safeQuery } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function EditEducation({ params }) {
  const { id } = await params;
  const edu = await safeQuery(p => p.education.findUnique({ where: { id } }), null);

  if (!edu) {
    redirect('/admin/education');
  }

  async function updateEducation(formData) {
    'use server';
    const degree = formData.get('degree');
    const institution = formData.get('institution');
    const year = formData.get('year');
    const gpa = formData.get('gpa');

    if (degree && institution) {
      try {
        await safeMutation(p => p.education.update({
          where: { id },
          data: {
            degree: degree.toString().trim(),
            institution: institution.toString().trim(),
            year: year ? year.toString().trim() : '',
            gpa: gpa ? gpa.toString().trim() : null,
          },
        }));
      } catch (err) {
        console.error('Error updating education:', err);
      }
    }

    revalidatePath('/admin/education');
    revalidatePath('/');
    redirect('/admin/education');
  }

  async function deleteEducation() {
    'use server';
    try {
      await safeMutation(p => p.education.delete({
        where: { id },
      }));
    } catch (err) {
      console.error('Error deleting education:', err);
    }
    revalidatePath('/admin/education');
    revalidatePath('/');
    redirect('/admin/education');
  }

  return (
    <div>
      <Link href="/admin/education" style={{ color: 'var(--color-primary)', display: 'inline-block', marginBottom: '1rem', fontSize: '0.9rem' }}>&larr; Back to Education</Link>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '700' }}>Edit Education</h2>
      
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 450px', backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '14px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <form action={updateEducation} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Degree *</label>
              <input name="degree" defaultValue={edu.degree} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Institution *</label>
              <input name="institution" defaultValue={edu.institution} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Year *</label>
              <input name="year" defaultValue={edu.year} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Grade / GPA</label>
              <input name="gpa" defaultValue={edu.gpa || ''} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
            </div>

            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Save Changes</button>
          </form>
        </div>

        <div style={{ flex: '1 1 300px', backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '14px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', alignSelf: 'flex-start' }}>
          <h3 style={{ color: '#ef4444', marginBottom: '1rem' }}>Danger Zone</h3>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.25rem', fontSize: '0.875rem' }}>
            Deleting this record is permanent.
          </p>
          <form action={deleteEducation}>
            <button type="submit" className="btn btn-outline" style={{ color: '#ef4444', borderColor: '#ef4444', width: '100%' }}>Delete Education</button>
          </form>
        </div>
      </div>
    </div>
  );
}
