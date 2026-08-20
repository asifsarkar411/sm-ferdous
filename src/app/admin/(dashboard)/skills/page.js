import { prisma } from '@/lib/prisma';
import { safeQuery } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ManageSkills() {
  const skills = await safeQuery(p => p.skill.findMany({ orderBy: { name: 'asc' } }), []);

  async function createSkill(formData) {
    'use server';
    const name = formData.get('name');
    const category = formData.get('category');

    if (name && name.toString().trim().length > 0) {
      try {
        await safeMutation(p => p.skill.create({
          data: { 
            name: name.toString().trim(), 
            category: category ? category.toString().trim() : 'General' 
          },
        }));
      } catch (err) {
        console.error('Error creating skill:', err);
      }
    }

    revalidatePath('/');
    revalidatePath('/admin/skills');
  }

  async function deleteSkill(formData) {
    'use server';
    const id = formData.get('id');
    if (id) {
      try {
        await safeMutation(p => p.skill.delete({ where: { id: id.toString() } }));
      } catch (err) {
        console.error('Error deleting skill:', err);
      }
      revalidatePath('/');
      revalidatePath('/admin/skills');
    }
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '700' }}>Manage Skills</h2>
      
      <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '14px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', maxWidth: '600px', marginBottom: '2.5rem' }}>
        <h3 style={{ marginBottom: '1.25rem', fontSize: '1.15rem' }}>Add New Skill</h3>
        <form action={createSkill} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Skill Name *</label>
            <input name="name" placeholder="e.g. Next.js, React, PostgreSQL, Docker" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Category / Skill Type *</label>
            <input name="category" placeholder="e.g. Frontend Development, Backend, Cloud & DevOps" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Add Skill</button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
        {skills.map(skill => (
          <div key={skill.id} style={{ backgroundColor: 'var(--color-surface)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.75rem' }}>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: '600', marginBottom: '0.25rem', color: 'var(--color-text-primary)' }}>{skill.name}</h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', backgroundColor: 'var(--color-bg)', padding: '0.2rem 0.5rem', borderRadius: '6px', border: '1px solid var(--color-border)', display: 'inline-block' }}>
                {skill.category}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
              <Link href={`/admin/skills/${skill.id}`} style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: '500' }}>Edit</Link>
              <form action={deleteSkill}>
                <input type="hidden" name="id" value={skill.id} />
                <button type="submit" style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
