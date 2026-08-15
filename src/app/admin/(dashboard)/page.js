import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { safeQuery } from '@/lib/db';
import Link from 'next/link';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  // Fetch metrics in batches with automatic retry
  const [projectCount, messageCount, cvCount, skillCount] = await Promise.all([
    safeQuery(p => p.project.count(), 0),
    safeQuery(p => p.message.count(), 0),
    safeQuery(p => p.cV.count(), 0),
    safeQuery(p => p.skill.count(), 0),
  ]);

  const [hobbyCount, serviceCount, testimonialCount, educationCount] = await Promise.all([
    safeQuery(p => p.hobby.count(), 0),
    safeQuery(p => p.service.count(), 0),
    safeQuery(p => p.testimonial.count(), 0),
    safeQuery(p => p.education.count(), 0),
  ]);

  const [journeyCount, languageCount] = await Promise.all([
    safeQuery(p => p.journey.count(), 0),
    safeQuery(p => p.languageProficiency.count(), 0),
  ]);

  const userEmail = session?.user?.email || session?.email || 'Admin';

  const cards = [
    { title: 'Hero Section', desc: 'Main title, subtitle, and profile picture.', link: '/admin/hero', count: '1' },
    { title: 'About Section', desc: 'Your bio and general information.', link: '/admin/about', count: '1' },
    { title: 'Projects', desc: 'Manage your portfolio items.', link: '/admin/projects', count: projectCount },
    { title: 'Skills', desc: 'Manage your technical skills.', link: '/admin/skills', count: skillCount },
    { title: 'Journey', desc: 'Update your experience timeline.', link: '/admin/journey', count: journeyCount },
    { title: 'Education', desc: 'Update your education history.', link: '/admin/education', count: educationCount },
    { title: 'Languages', desc: 'Manage language proficiencies.', link: '/admin/languages', count: languageCount },
    { title: 'Hobbies', desc: 'Manage your hobbies and interests.', link: '/admin/hobbies', count: hobbyCount },
    { title: 'Services', desc: 'Manage services offered.', link: '/admin/services', count: serviceCount },
    { title: 'Testimonials', desc: 'Manage client recommendations.', link: '/admin/testimonials', count: testimonialCount },
    { title: 'Messages', desc: 'View contact form submissions.', link: '/admin/messages', count: messageCount },
    { title: 'CVs', desc: 'Manage downloadable CVs.', link: '/admin/cvs', count: cvCount },
    { title: 'Contact Info', desc: 'Update your contact details.', link: '/admin/contact', count: 'Info' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Welcome to the Admin Dashboard</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Logged in as: <strong>{userEmail}</strong>
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
        {cards.map((card, idx) => (
          <div key={idx} style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{card.title}</h3>
              <span style={{ backgroundColor: 'var(--color-primary)', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                {card.count}
              </span>
            </div>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', flex: 1 }}>{card.desc}</p>
            <Link href={card.link} className="btn btn-outline" style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)', width: '100%' }}>
              Manage &rarr;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
