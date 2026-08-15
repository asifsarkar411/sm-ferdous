import { prisma } from '@/lib/prisma';

export default async function Languages({ languages: propLanguages }) {
  const languages = propLanguages !== undefined ? propLanguages : await prisma.languageProficiency.findMany();
  
  if (!languages || languages.length === 0) return null;

  return (
    <section id="languages" className="section container" style={{ paddingTop: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '2rem', marginBottom: '1rem', textTransform: 'uppercase' }}>LANGUAGE PROFICIENCY</h3>
        <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--color-primary)', margin: '0 auto' }}></div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
        {languages.map((lang) => (
          <div key={lang.id} style={{
            width: '100%',
            maxWidth: '300px',
            backgroundColor: 'var(--color-surface)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
            transition: 'transform 0.2s ease',
            willChange: 'transform'
          }}>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--color-primary)', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
              {lang.language}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Reading:</span>
                <span style={{ fontWeight: '500' }}>{lang.reading}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Writing:</span>
                <span style={{ fontWeight: '500' }}>{lang.writing}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Speaking:</span>
                <span style={{ fontWeight: '500' }}>{lang.speaking}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
