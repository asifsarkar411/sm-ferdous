import { prisma } from '@/lib/prisma';
import { safeQuery } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const adminUser = await safeQuery(p => p.user.findFirst(), null);

  async function updateCredentials(formData) {
    'use server';
    const email = formData.get('email');
    const newPassword = formData.get('newPassword');

    const currentUser = await prisma.user.findFirst().catch(() => null);
    if (!currentUser) return;

    const updateData = { email: email.trim().toLowerCase() };

    if (newPassword && newPassword.trim() !== '') {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updateData.password = hashedPassword;
    }

    await prisma.user.update({
      where: { id: currentUser.id },
      data: updateData,
    });

    revalidatePath('/admin/settings');
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '700' }}>Admin Settings</h2>
      
      <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '14px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', maxWidth: '600px' }}>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem', color: 'var(--color-text)' }}>Update Login Credentials</h3>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem', lineHeight: 1.5 }}>
          Change your admin email or password. If you leave the password blank, it will remain unchanged.
        </p>

        <form action={updateCredentials} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Email Address</label>
            <input 
              name="email" 
              type="email" 
              defaultValue={adminUser?.email || ''} 
              required 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} 
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>New Password</label>
            <input 
              name="newPassword" 
              type="password" 
              placeholder="Leave blank to keep current password"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} 
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}>Update Credentials</button>
        </form>
      </div>
    </div>
  );
}
