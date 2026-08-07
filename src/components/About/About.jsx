import { prisma } from '@/lib/prisma';

export default async function About() {
  const aboutData = await prisma.about.findFirst();
  if (!aboutData) return null;

  const educationList = await prisma.education.findMany({ orderBy: { year: 'desc' } });

  return (
    <section id="about" className="section container">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', textTransform: 'uppercase' }}>ABOUT ME</h2>
        <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--color-primary)', margin: '0 auto' }}></div>
      </div>

      <div className="flex-responsive" style={{ display: 'flex', gap: '2rem' }}>
        {/* Left Side: Who Am I */}
        <div style={{ flex: '1 1 350px', backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--color-border)', alignSelf: 'flex-start' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>👤</span> Who Am I?
          </h3>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', fontSize: '1rem' }}>
            {aboutData?.description || 'I am an adaptive developer focused on combining responsive UI layouts with modern server capabilities.'}
          </p>
          
          <div className="flex-responsive" style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
            <div style={{ backgroundColor: 'var(--color-surface-hover)', padding: '1.5rem 1rem', borderRadius: '12px', textAlign: 'center', flex: 1, border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>{aboutData?.yearsCoding || '1+'}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Years Coding</div>
            </div>
            <div style={{ backgroundColor: 'var(--color-surface-hover)', padding: '1.5rem 1rem', borderRadius: '12px', textAlign: 'center', flex: 1, border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>{aboutData?.projectsBuilt || '10+'}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Projects Built</div>
            </div>
            <div style={{ backgroundColor: 'var(--color-surface-hover)', padding: '1.5rem 1rem', borderRadius: '12px', textAlign: 'center', flex: 1, border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>{aboutData?.frameworks || '3+'}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Frameworks</div>
            </div>
          </div>
        </div>

        {/* Right Side: Education List */}
        <div style={{ flex: '1 1 450px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {educationList.length > 0 ? educationList.map((edu) => (
            <div key={edu.id} style={{ backgroundColor: 'var(--color-surface)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '600' }}>{edu.degree}</h4>
                <span style={{ backgroundColor: 'rgba(0,242,254,0.1)', color: 'var(--color-primary)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>
                  📅 {edu.year}
                </span>
              </div>
              <p style={{ color: 'var(--color-primary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{edu.institution}</p>
              {edu.gpa && <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>GPA: {edu.gpa}</p>}
            </div>
          )) : (
            <div style={{ color: 'var(--color-text-secondary)', textAlign: 'center', padding: '2rem' }}>No education data found.</div>
          )}
        </div>
      </div>
    </section>
  );
}
