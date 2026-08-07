import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


export default async function EditEducation({ params }) {
  const { id } = await params;
  const edu = await prisma.education.findUnique({ where: { id } });

  if (!edu) {
    redirect('/admin/education');
  }

  async function updateEducation(formData) {
    'use server';
    const degree = formData.get('degree');
    const institution = formData.get('institution');
    const year = formData.get('year');
    const gpa = formData.get('gpa');
    
    await prisma.education.update({
      where: { id },
      data: { degree, institution, year, gpa },
    });

    revalidatePath('/');
    revalidatePath('/admin/education');
    redirect('/admin/education');
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Edit Education</h2>
      
      <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', maxWidth: '600px', marginBottom: '2rem' }}>
        <form action={updateEducation} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Degree</label>
          <input name="degree" defaultValue={edu.degree} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          
          <label style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Institution Name</label>
          <input name="institution" defaultValue={edu.institution} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          
          <label style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Year / Date</label>
          <input name="year" defaultValue={edu.year} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          
          <label style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Details (e.g., GPA, Group)</label>
          <input name="gpa" defaultValue={edu.gpa || ''} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" className="btn btn-primary">Save Changes</button>
            <a href="/admin/education" className="btn btn-outline" style={{ color: 'var(--color-text-secondary)', borderColor: 'var(--color-border)' }}>Cancel</a>
          </div>
        </form>
      </div>
    </div>
  );
}
