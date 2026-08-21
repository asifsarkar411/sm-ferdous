import { safeQuery, safeMutation, defaultPortfolioData } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const adminUser = await safeQuery(p => p.user.findFirst(), null);

  async function updateCredentials(formData) {
    'use server';
    const email = formData.get('email');
    const newPassword = formData.get('newPassword');

    const currentUser = await safeQuery(p => p.user.findFirst(), null);
    if (!currentUser) return;

    const updateData = { email: email.toString().trim().toLowerCase() };

    if (newPassword && newPassword.toString().trim() !== '') {
      const hashedPassword = await bcrypt.hash(newPassword.toString(), 10);
      updateData.password = hashedPassword;
    }

    try {
      await safeMutation(p => p.user.update({
        where: { id: currentUser.id },
        data: updateData,
      }));
    } catch (err) {
      console.error('Error updating credentials:', err);
    }

    revalidatePath('/admin/settings');
  }

  async function seedDatabaseAction() {
    'use server';
    try {
      await safeMutation(async (p) => {
        // Hero
        const heroCount = await p.hero.count();
        if (heroCount === 0) {
          await p.hero.create({ data: defaultPortfolioData.heroData });
        }
        // About
        const aboutCount = await p.about.count();
        if (aboutCount === 0) {
          await p.about.create({ data: defaultPortfolioData.aboutData });
        }
        // Contact
        const contactCount = await p.contact.count();
        if (contactCount === 0) {
          await p.contact.create({ data: defaultPortfolioData.contactData });
        }
        // Education
        const eduCount = await p.education.count();
        if (eduCount === 0) {
          for (const item of defaultPortfolioData.educationList) {
            const { id, ...rest } = item;
            await p.education.create({ data: rest });
          }
        }
        // Journey
        const journeyCount = await p.journey.count();
        if (journeyCount === 0) {
          for (const item of defaultPortfolioData.journeys) {
            const { id, ...rest } = item;
            await p.journey.create({ data: rest });
          }
        }
        // Skills
        const skillCount = await p.skill.count();
        if (skillCount === 0) {
          for (const item of defaultPortfolioData.skills) {
            const { id, ...rest } = item;
            await p.skill.create({ data: rest });
          }
        }
        // Languages
        const langCount = await p.languageProficiency.count();
        if (langCount === 0) {
          for (const item of defaultPortfolioData.languages) {
            const { id, ...rest } = item;
            await p.languageProficiency.create({ data: rest });
          }
        }
        // Projects
        const projectCount = await p.project.count();
        if (projectCount === 0) {
          for (const item of defaultPortfolioData.projects) {
            const { id, ...rest } = item;
            await p.project.create({ data: rest });
          }
        }
        // Services
        const serviceCount = await p.service.count();
        if (serviceCount === 0) {
          for (const item of defaultPortfolioData.services) {
            const { id, ...rest } = item;
            await p.service.create({ data: rest });
          }
        }
        // Hobbies
        const hobbyCount = await p.hobby.count();
        if (hobbyCount === 0) {
          for (const item of defaultPortfolioData.hobbies) {
            const { id, ...rest } = item;
            await p.hobby.create({ data: rest });
          }
        }
      });
    } catch (err) {
      console.error('Error seeding database:', err);
    }
    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/admin/settings');
    revalidatePath('/admin/hero');
    revalidatePath('/admin/about');
    revalidatePath('/admin/contact');
    revalidatePath('/admin/projects');
    revalidatePath('/admin/education');
    revalidatePath('/admin/journey');
    revalidatePath('/admin/skills');
    revalidatePath('/admin/languages');
    revalidatePath('/admin/services');
    revalidatePath('/admin/hobbies');
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '700' }}>Admin Settings</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '650px' }}>
        {/* Credentials Card */}
        <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '14px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
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

        {/* Database Auto-Populate & Sync Card */}
        <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '14px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem', color: 'var(--color-primary)' }}>📦 Populate & Sync Database Tables</h3>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.25rem', fontSize: '0.9rem', lineHeight: 1.5 }}>
            Clicking this button will seed any empty database tables with your portfolio data (Hero, About, Education, Journey, Skills, Languages, Projects, Services, Hobbies, Contact) so that every table is fully populated.
          </p>

          <form action={seedDatabaseAction}>
            <button type="submit" className="btn btn-outline" style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}>
              ⚡ Populate Database Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
