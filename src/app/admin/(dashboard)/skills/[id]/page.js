import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export default async function EditSkill({ params }) {
  const { id } = await params;
  const skill = await prisma.skill.findUnique({ where: { id } });

  if (!skill) {
    redirect('/admin/skills');
  }

  async function updateSkill(formData) {
    'use server';
    const name = formData.get('name');
    const category = formData.get('category');
    
    await prisma.skill.update({
      where: { id },
      data: { name, category },
    });

    revalidatePath('/');
    revalidatePath('/admin/skills');
    redirect('/admin/skills');
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Edit Skill</h2>
      
      <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', maxWidth: '600px', marginBottom: '2rem' }}>
        <form action={updateSkill} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Skill Name</label>
          <input name="name" defaultValue={skill.name} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          
          <label style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Category</label>
          <input name="category" defaultValue={skill.category} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" className="btn btn-primary">Save Changes</button>
            <a href="/admin/skills" className="btn btn-outline" style={{ color: 'var(--color-text-secondary)', borderColor: 'var(--color-border)' }}>Cancel</a>
          </div>
        </form>
      </div>
    </div>
  );
}
