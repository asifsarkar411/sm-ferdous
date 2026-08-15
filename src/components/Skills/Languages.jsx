import { prisma } from '@/lib/prisma';

export default async function Languages({ languages: propLanguages }) {
  const languages = propLanguages !== undefined ? propLanguages : await prisma.languageProficiency.findMany().catch(() => []);
  
  if (!languages || languages.length === 0) return null;

  return (
    <section id="languages" className="section container" style={{ paddingTop: '1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h3 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.2rem)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.02em', fontWeight: '700' }}>
          Language Proficiency
        </h3>
        <div style={{ width: '50px', height: '3px', backgroundColor: 'var(--color-primary)', margin: '0 auto', borderRadius: '2px' }}></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
        {languages.map((lang) => (
          <div 
            key={lang.id} 
            style={{
              backgroundColor: 'var(--color-surface)',
              padding: '1.75rem',
              borderRadius: '16px',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)',
              transition: 'transform 0.2s ease, border-color 0.2s ease',
              willChange: 'transform'
            }}
            className="skill-card-hover"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--color-primary)', margin: 0 }}>
                {lang.language}
              </h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Language</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Reading</span>
                <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--color-text-primary)', backgroundColor: 'var(--color-bg)', padding: '0.2rem 0.6rem', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                  {lang.reading}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Writing</span>
                <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--color-text-primary)', backgroundColor: 'var(--color-bg)', padding: '0.2rem 0.6rem', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                  {lang.writing}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Speaking</span>
                <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--color-text-primary)', backgroundColor: 'var(--color-bg)', padding: '0.2rem 0.6rem', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                  {lang.speaking}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
