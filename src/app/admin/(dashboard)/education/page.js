import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';


export default async function ManageEducation() {
  const educations = await prisma.education.findMany({ orderBy: { year: 'desc' } });

  async function createEducation(formData) {
    'use server';
    const degree = formData.get('degree');
    const institution = formData.get('institution');
    const year = formData.get('year');
    const gpa = formData.get('gpa');

    await prisma.education.create({
      data: {
        degree,
        institution,
        year,
        gpa,
      },
    });
    
    revalidatePath('/admin/education');
    revalidatePath('/');
  }

  async function deleteEducation(formData) {
    'use server';
    const id = formData.get('id');
    
    await prisma.education.delete({
      where: { id },
    });
    
    revalidatePath('/admin/education');
    revalidatePath('/');
  }

  return (
    <div>
      <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Manage Education</h2>
      
      <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', maxWidth: '600px', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Add New Education</h3>
        <form action={createEducation} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input name="degree" placeholder="Degree (e.g., BSc. Engg in CSE)" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          <input name="institution" placeholder="Institution Name" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          <input name="year" placeholder="Year / Date (e.g., 2022 - 2026)" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          <input name="gpa" placeholder="Details (e.g., Group : Science GPA : 5.00)" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          
          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Add Education</button>
        </form>
      </div>

      <div>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Existing Education</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {educations.map((edu) => (
            <div key={edu.id} style={{ backgroundColor: 'var(--color-surface)', padding: '1.5rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{edu.degree}</h4>
                <span style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-primary)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>{edu.year}</span>
              </div>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>{edu.institution}</p>
              {edu.gpa && <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>{edu.gpa}</p>}
              
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <a href={`/admin/education/${edu.id}`} style={{ color: 'var(--color-primary)', textDecoration: 'underline', fontSize: '0.875rem' }}>Edit</a>
                <form action={deleteEducation}>
                  <input type="hidden" name="id" value={edu.id} />
                  <button type="submit" style={{ color: 'red', textDecoration: 'underline', fontSize: '0.875rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Delete</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
