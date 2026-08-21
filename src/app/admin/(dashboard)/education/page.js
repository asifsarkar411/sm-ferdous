import { prisma } from '@/lib/prisma';
import { safeQuery, safeMutation, defaultPortfolioData } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ManageEducation() {
  const educations = await safeQuery(p => p.education.findMany({ orderBy: { year: 'desc' } }), []);
  const educationList = (educations && educations.length > 0) ? educations : defaultPortfolioData.educationList;

  async function createEducation(formData) {
    'use server';
    const degree = formData.get('degree');
    const institution = formData.get('institution');
    const year = formData.get('year');
    const gpa = formData.get('gpa');

    if (degree && institution) {
      try {
        await safeMutation(p => p.education.create({
          data: {
            degree: degree.toString().trim(),
            institution: institution.toString().trim(),
            year: year ? year.toString().trim() : '',
            gpa: gpa ? gpa.toString().trim() : null,
          },
        }));
      } catch (err) {
        console.error('Error creating education:', err);
      }
    }
    
    revalidatePath('/admin/education');
    revalidatePath('/');
  }

  async function deleteEducation(formData) {
    'use server';
    const id = formData.get('id');
    if (id) {
      try {
        await safeMutation(p => p.education.delete({
          where: { id: id.toString() },
        }));
      } catch (err) {
        console.error('Error deleting education:', err);
      }
    }
    
    revalidatePath('/admin/education');
    revalidatePath('/');
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '700' }}>Manage Education</h2>
      
      <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '14px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', maxWidth: '600px', marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem' }}>Add New Education</h3>
        <form action={createEducation} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Degree *</label>
            <input name="degree" placeholder="e.g. BSc. in Computer Science & Engineering" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Institution Name *</label>
            <input name="institution" placeholder="e.g. Dhaka University" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Year / Duration *</label>
            <input name="year" placeholder="e.g. 2022 - 2026" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Grade / GPA (optional)</label>
            <input name="gpa" placeholder="e.g. CGPA: 3.85 / 4.00" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Add Education</button>
        </form>
      </div>

      <div>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: '600' }}>Existing Education</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {educationList.map((edu) => (
            <div key={edu.id} style={{ backgroundColor: 'var(--color-surface)', padding: '1.5rem', borderRadius: '14px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', gap: '0.5rem', flexWrap: 'wrap' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--color-text-primary)' }}>{edu.degree}</h4>
                <span style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-primary)', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600', border: '1px solid var(--color-border)' }}>{edu.year}</span>
              </div>
              <p style={{ color: 'var(--color-primary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{edu.institution}</p>
              {edu.gpa && <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>{edu.gpa}</p>}
              
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
                <Link href={`/admin/education/${edu.id}`} style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: '500' }}>Edit</Link>
                <form action={deleteEducation}>
                  <input type="hidden" name="id" value={edu.id} />
                  <button type="submit" style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Delete</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
