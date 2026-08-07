import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';

export default async function SettingsPage() {
  // Fetch the first (and only) admin user
  const adminUser = await prisma.user.findFirst();

  async function updateCredentials(formData) {
    'use server';
    const email = formData.get('email');
    const newPassword = formData.get('newPassword');

    if (!adminUser) return;

    const updateData = { email };

    if (newPassword && newPassword.trim() !== '') {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updateData.password = hashedPassword;
    }

    await prisma.user.update({
      where: { id: adminUser.id },
      data: updateData,
    });

    revalidatePath('/admin/settings');
  }

  return (
    <div>
      <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Admin Settings</h2>
      
      <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', maxWidth: '600px' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--color-text)' }}>Update Login Credentials</h3>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Change your admin email or password. If you leave the password blank, it will remain unchanged.
        </p>

        <form action={updateCredentials} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text)' }}>Email Address</label>
            <input 
              name="email" 
              type="email" 
              defaultValue={adminUser?.email || ''} 
              required 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} 
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text)' }}>New Password</label>
            <input 
              name="newPassword" 
              type="password" 
              placeholder="Leave blank to keep current password"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} 
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Update Credentials</button>
        </form>
      </div>
    </div>
  );
}
