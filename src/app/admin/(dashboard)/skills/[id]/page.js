import { prisma } from '@/lib/prisma';
import { safeQuery, safeMutation } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function EditSkill({ params }) {
  const { id } = await params;
  const skill = await safeQuery(p => p.skill.findUnique({ where: { id } }), null);

  if (!skill) {
    redirect('/admin/skills');
  }

  async function updateSkill(formData) {
    'use server';
    const name = formData.get('name');
    const category = formData.get('category');
    
    if (name && name.toString().trim().length > 0) {
      try {
        await safeMutation(p => p.skill.update({
          where: { id },
          data: { name: name.toString().trim(), category: category ? category.toString().trim() : 'General' },
        }));
      } catch (err) {
        console.error('Error updating skill:', err);
      }
    }

    revalidatePath('/');
    revalidatePath('/admin/skills');
    redirect('/admin/skills');
  }

  return (
    <div>
      <Link href="/admin/skills" style={{ color: 'var(--color-primary)', display: 'inline-block', marginBottom: '1rem', fontSize: '0.9rem' }}>&larr; Back to Skills</Link>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '700' }}>Edit Skill</h2>
      
      <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '14px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', maxWidth: '600px', marginBottom: '2rem' }}>
        <form action={updateSkill} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Skill Name *</label>
            <input name="name" defaultValue={skill.name} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Category / Skill Type *</label>
            <input name="category" defaultValue={skill.category} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <button type="submit" className="btn btn-primary">Save Changes</button>
            <Link href="/admin/skills" className="btn btn-outline" style={{ color: 'var(--color-text-secondary)', borderColor: 'var(--color-border)' }}>Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
