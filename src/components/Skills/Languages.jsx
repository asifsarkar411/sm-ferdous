import { prisma } from '@/lib/prisma';

function getDotScore(levelStr) {
  if (!levelStr) return 4;
  const str = String(levelStr).toLowerCase().trim();
  
  // Direct number check (e.g. "5", "5/5", "4", "4/5", "80%")
  const match = str.match(/^(\d+)/);
  if (match) {
    const num = parseInt(match[1], 10);
    if (num >= 1 && num <= 5) return num;
    if (num > 5 && num <= 10) return Math.round(num / 2);
    if (num > 10 && num <= 100) return Math.max(1, Math.min(5, Math.round((num / 100) * 5)));
  }
  
  if (str.includes('native') || str.includes('bilingual') || str.includes('expert') || str.includes('mother')) return 5;
  if (str.includes('fluent') || str.includes('advanced') || str.includes('c2') || str.includes('c1')) return 5;
  if (str.includes('professional') || str.includes('proficient') || str.includes('b2')) return 4;
  if (str.includes('conversational') || str.includes('intermediate') || str.includes('b1')) return 3;
  if (str.includes('elementary') || str.includes('basic') || str.includes('a2') || str.includes('beginner')) return 2;
  if (str.includes('starter') || str.includes('a1') || str.includes('limited')) return 1;
  return 4;
}

function DottedRating({ level }) {
  const score = getDotScore(level);
  const maxDots = 5;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
      {/* 5-Dot Indicator */}
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }} aria-label={`${score} out of 5 dots`}>
        {Array.from({ length: maxDots }).map((_, index) => {
          const isActive = index < score;
          return (
            <span
              key={index}
              style={{
                width: '9px',
                height: '9px',
                borderRadius: '50%',
                backgroundColor: isActive ? 'var(--color-primary)' : 'var(--color-border)',
                boxShadow: isActive ? '0 0 8px rgba(0, 242, 254, 0.4)' : 'none',
                transition: 'all 0.25s ease',
                display: 'inline-block',
              }}
            />
          );
        })}
      </div>

      {/* Level Text Badge */}
      <span
        style={{
          fontWeight: '600',
          fontSize: '0.8rem',
          color: 'var(--color-badge-text)',
          backgroundColor: 'var(--color-badge-bg)',
          padding: '0.2rem 0.55rem',
          borderRadius: '6px',
          border: '1px solid var(--color-border)',
          minWidth: '70px',
          textAlign: 'center',
          letterSpacing: '0.01em',
        }}
      >
        {level}
      </span>
    </div>
  );
}

export default async function Languages({ languages: propLanguages }) {
  const languages = propLanguages !== undefined ? propLanguages : await prisma.languageProficiency.findMany().catch(() => []);
  
  if (!languages || languages.length === 0) return null;

  return (
    <section id="languages" className="section container" style={{ paddingTop: '1rem' }}>
      <div className="section-header">
        <h2 className="section-title">Language Proficiency</h2>
        <div className="section-divider"></div>
        <p className="section-subtitle">Multilingual communication and technical articulation proficiency.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '1.75rem', maxWidth: '950px', margin: '0 auto' }}>
        {languages.map((lang) => (
          <div 
            key={lang.id} 
            style={{
              backgroundColor: 'var(--color-surface)',
              padding: '1.85rem',
              borderRadius: '16px',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)',
              transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
              willChange: 'transform'
            }}
            className="skill-card-hover"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.85rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-primary)', margin: 0, letterSpacing: '-0.01em' }}>
                {lang.language}
              </h3>
              <span style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: '600' }}>
                Fluency
              </span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Reading */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', fontWeight: '500' }}>
                  Reading
                </span>
                <DottedRating level={lang.reading} />
              </div>

              {/* Writing */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', fontWeight: '500' }}>
                  Writing
                </span>
                <DottedRating level={lang.writing} />
              </div>

              {/* Speaking */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', fontWeight: '500' }}>
                  Speaking
                </span>
                <DottedRating level={lang.speaking} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
