import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';


export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  // Fetch metrics dynamically
  const projectCount = await prisma.project.count();
  const messageCount = await prisma.message.count();
  const cvCount = await prisma.cV.count();
  const skillCount = await prisma.skill.count();
  const hobbyCount = await prisma.hobby.count();

  const cards = [
    { title: 'Hero Section', desc: 'Main title, subtitle, and profile picture.', link: '/admin/hero', count: '1' },
    { title: 'About Section', desc: 'Your bio and general information.', link: '/admin/about', count: '1' },
    { title: 'Projects', desc: 'Manage your portfolio items.', link: '/admin/projects', count: projectCount },
    { title: 'Skills', desc: 'Manage your technical skills.', link: '/admin/skills', count: skillCount },
    { title: 'Journey', desc: 'Update your experience timeline.', link: '/admin/journey', count: 'Timeline' },
    { title: 'Education', desc: 'Update your education history.', link: '/admin/education', count: 'History' },
    { title: 'Hobbies', desc: 'Manage your hobbies and interests.', link: '/admin/hobbies', count: hobbyCount },
    { title: 'Messages', desc: 'View contact form submissions.', link: '/admin/messages', count: messageCount },
    { title: 'CVs', desc: 'Manage downloadable CVs.', link: '/admin/cvs', count: cvCount },
    { title: 'Contact Info', desc: 'Update your contact details.', link: '/admin/contact', count: 'Info' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Welcome to the Admin Dashboard</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Logged in as: <strong>{session?.email}</strong>
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
