import { prisma } from '@/lib/prisma';

export default async function Languages() {
  const languages = await prisma.languageProficiency.findMany();
  
  if (languages.length === 0) return null;

  return (
    <div style={{ marginTop: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>LANGUAGE PROFICIENCY</h3>
        <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--color-primary)', margin: '0 auto' }}></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        {languages.map((lang) => (
          <div key={lang.id} style={{
            backgroundColor: 'var(--color-surface)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)'
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
    </div>
  );
}
