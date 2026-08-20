import { prisma } from '@/lib/prisma';

const defaultAbout = {
  description: 'I am an adaptive full-stack developer and IoT enthusiast committed to crafting robust, visually engaging interfaces and performant server architectures.',
  yearsCoding: '2+',
  projectsBuilt: '15+',
  frameworks: '8+',
};

export default async function About({ aboutData: propAboutData, educationList: propEduList }) {
  const aboutData = propAboutData !== undefined ? propAboutData : await prisma.about.findFirst().catch(() => null);
  const educationList = propEduList !== undefined ? propEduList : await prisma.education.findMany({ orderBy: { year: 'desc' } }).catch(() => []);

  const about = aboutData || defaultAbout;
  const list = educationList || [];

  return (
    <section id="about" className="section container">
      <div className="section-header">
        <h2 className="section-title">About Me</h2>
        <div className="section-divider"></div>
        <p className="section-subtitle">A glimpse into my background, stats, and academic milestones.</p>
      </div>

      <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '2rem', alignItems: 'start' }}>
        {/* Left Bento: Bio & Highlights */}
        <div className="about-bento-card" style={{ 
          backgroundColor: 'var(--color-surface)', 
          padding: '2.25rem', 
          borderRadius: '20px', 
          border: '1px solid var(--color-border)', 
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '2rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '1.4rem' }}>👨‍💻</span>
              <h3 style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.35rem)', fontWeight: '700', color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}>
                Engineering & Passion
              </h3>
            </div>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.98rem', lineHeight: 1.7 }}>
              {about.description || defaultAbout.description}
            </p>
          </div>
          
          {/* Key Metric Highlights */}
          <div className="about-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem' }}>
            <div style={{ 
              backgroundColor: 'var(--color-bg)', 
              padding: '1.15rem 0.5rem', 
              borderRadius: '14px', 
              textAlign: 'center', 
              border: '1px solid var(--color-border)',
              transition: 'transform 0.2s ease',
              willChange: 'transform'
            }} className="stat-card-hover">
              <div style={{ fontSize: 'clamp(1.3rem, 3vw, 1.6rem)', fontWeight: '800', color: 'var(--color-primary)', lineHeight: 1.2, marginBottom: '0.35rem' }}>
                {about.yearsCoding || '2+'}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                Years Coding
              </div>
            </div>

            <div style={{ 
              backgroundColor: 'var(--color-bg)', 
              padding: '1.15rem 0.5rem', 
              borderRadius: '14px', 
              textAlign: 'center', 
              border: '1px solid var(--color-border)',
              transition: 'transform 0.2s ease',
              willChange: 'transform'
            }} className="stat-card-hover">
              <div style={{ fontSize: 'clamp(1.3rem, 3vw, 1.6rem)', fontWeight: '800', color: 'var(--color-primary)', lineHeight: 1.2, marginBottom: '0.35rem' }}>
                {about.projectsBuilt || '15+'}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                Projects Built
              </div>
            </div>

            <div style={{ 
              backgroundColor: 'var(--color-bg)', 
              padding: '1.15rem 0.5rem', 
              borderRadius: '14px', 
              textAlign: 'center', 
              border: '1px solid var(--color-border)',
              transition: 'transform 0.2s ease',
              willChange: 'transform'
            }} className="stat-card-hover">
              <div style={{ fontSize: 'clamp(1.3rem, 3vw, 1.6rem)', fontWeight: '800', color: 'var(--color-primary)', lineHeight: 1.2, marginBottom: '0.35rem' }}>
                {about.frameworks || '8+'}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                Frameworks
              </div>
            </div>
          </div>
        </div>

        {/* Right Bento: Education Timeline */}
        <div className="about-bento-card" style={{ 
          backgroundColor: 'var(--color-surface)', 
          padding: '2.25rem', 
          borderRadius: '20px', 
          border: '1px solid var(--color-border)', 
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.4rem' }}>🎓</span>
            <h3 style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.35rem)', fontWeight: '700', color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}>
              Education & Degrees
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {list.length > 0 ? list.map((edu) => (
              <div 
                key={edu.id} 
                style={{ 
                  backgroundColor: 'var(--color-bg)', 
                  padding: '1.15rem 1rem', 
                  borderRadius: '14px', 
                  border: '1px solid var(--color-border)',
                  transition: 'transform 0.2s ease, border-color 0.2s ease'
                }}
                className="stat-card-hover"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--color-text-primary)' }}>{edu.degree}</h4>
                  <span style={{ 
                    backgroundColor: 'rgba(0, 242, 254, 0.08)', 
                    color: 'var(--color-primary)', 
                    padding: '0.15rem 0.5rem', 
                    borderRadius: '6px', 
                    fontSize: '0.72rem', 
                    fontWeight: '600',
                    border: '1px solid rgba(0, 242, 254, 0.2)',
                    whiteSpace: 'nowrap'
                  }}>
                    {edu.year}
                  </span>
                </div>
                <p style={{ color: 'var(--color-primary)', fontSize: '0.88rem', fontWeight: '500', marginBottom: edu.gpa ? '0.25rem' : '0' }}>
                  {edu.institution}
                </p>
                {edu.gpa && (
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>
                    Grade / GPA: <strong>{edu.gpa}</strong>
                  </p>
                )}
              </div>
            )) : (
              <div style={{ color: 'var(--color-text-secondary)', textAlign: 'center', padding: '2rem' }}>
                Academic information updating soon.
              </div>
            )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .stat-card-hover:hover {
          transform: translateY(-2px);
          border-color: var(--color-primary) !important;
        }
        @media (max-width: 768px) {
          .about-bento-card {
            padding: 1.5rem 1.25rem !important;
            border-radius: 16px !important;
            gap: 1.5rem !important;
          }
          .about-grid {
            gap: 1.5rem !important;
          }
        }
        @media (max-width: 480px) {
          .about-bento-card {
            padding: 1.25rem 1rem !important;
          }
          .about-stats-grid {
            gap: 0.5rem !important;
          }
        }
      `}} />
    </section>
  );
}
