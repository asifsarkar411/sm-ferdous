import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

export default async function ManageSkills() {
  const skills = await prisma.skill.findMany();

  async function createSkill(formData) {
    'use server';
    const name = formData.get('name');
    const category = formData.get('category');

    await prisma.skill.create({
      data: { name, category },
    });

    revalidatePath('/');
    revalidatePath('/admin/skills');
  }

  async function deleteSkill(formData) {
    'use server';
    const id = formData.get('id');
    await prisma.skill.delete({ where: { id } });
    revalidatePath('/');
    revalidatePath('/admin/skills');
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Manage Skills</h2>
      
      <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', maxWidth: '600px', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Add New Skill</h3>
        <form action={createSkill} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input name="name" placeholder="Skill Name (e.g., React.js)" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          <input name="category" placeholder="Category (e.g., Frontend, Backend)" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Add Skill</button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {skills.map(skill => (
          <div key={skill.id} style={{ backgroundColor: 'var(--color-surface)', padding: '1.5rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
            <h4 style={{ marginBottom: '0.5rem' }}>{skill.name}</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>{skill.category}</p>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Link href={`/admin/skills/${skill.id}`} style={{ color: 'var(--color-primary)', textDecoration: 'underline', fontSize: '0.875rem' }}>Edit</Link>
              <form action={deleteSkill}>
                <input type="hidden" name="id" value={skill.id} />
                <button type="submit" style={{ color: 'red', textDecoration: 'underline', fontSize: '0.875rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
