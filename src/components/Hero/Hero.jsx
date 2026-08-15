import { prisma } from '@/lib/prisma';
import DownloadCVButton from './DownloadCVButton';

export default async function Hero({ heroData: propHeroData, cvs: propCvs }) {
  const heroData = propHeroData !== undefined ? propHeroData : await prisma.hero.findFirst();
  const cvs = propCvs !== undefined ? propCvs : await prisma.cV.findMany();

  if (!heroData) return null;

  return (
    <section id="home" style={{ backgroundColor: 'var(--color-hero-bg)', minHeight: '85vh', display: 'flex', alignItems: 'center', color: 'var(--color-white)', padding: '5rem 0', borderRadius: '0 0 var(--border-radius-lg) var(--border-radius-lg)', position: 'relative', overflow: 'hidden' }}>
      <div className="container flex-responsive" style={{ position: 'relative', zIndex: 2, display: 'flex', gap: '4rem', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ flex: 1, maxWidth: '600px' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', fontWeight: 700, lineHeight: 1.1, textTransform: 'uppercase', marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
            {heroData.title || 'HELLO THIS IS SM FERDOUS AHMMED'}
          </h1>
          <h2 style={{ color: 'var(--color-primary)', fontSize: '1.35rem', marginBottom: '1.25rem', fontWeight: '500' }}>
            {heroData.subtitle || 'Frontend Developer & IoT Enthusiast'}
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', fontSize: '1.05rem', maxWidth: '580px', lineHeight: 1.6 }}>
            {heroData.description || 'Developing seamless frontend interfaces and robust automation pipelines.'}
          </p>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <DownloadCVButton cvs={cvs || []} fallbackUrl={heroData.cvUrl} />
            <a href="#contact" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
              Get In Touch &rarr;
            </a>
          </div>
        </div>
        <div className="animate-float" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '340px', height: '340px', maxWidth: '85vw', maxHeight: '85vw', borderRadius: '50%', overflow: 'hidden', border: '4px solid var(--color-border)', boxShadow: '0 0 35px var(--color-shadow)' }}>
            {heroData.imageUrl ? (
              <img 
                src={heroData.imageUrl} 
                alt="Profile" 
                width={340}
                height={340}
                fetchPriority="high"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            ) : (
              <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Profile Image</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
