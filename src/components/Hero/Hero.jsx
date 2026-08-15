import { prisma } from '@/lib/prisma';
import DownloadCVButton from './DownloadCVButton';

const defaultHero = {
  title: 'SM FERDOUS AHMMED',
  subtitle: 'Full Stack Developer & IoT Engineer',
  description: 'Specializing in building high-performance web applications, scalable cloud backends, and modern embedded IoT systems.',
  imageUrl: null,
  cvUrl: null,
};

export default async function Hero({ heroData: propHeroData, cvs: propCvs }) {
  const heroData = propHeroData !== undefined ? propHeroData : await prisma.hero.findFirst().catch(() => null);
  const cvs = propCvs !== undefined ? propCvs : await prisma.cV.findMany().catch(() => []);

  const hero = heroData || defaultHero;

  // Plain JSON serialization for cvs to prevent any DateTime client boundary serialization errors
  const serializedCvs = (cvs || []).map(cv => ({
    id: cv.id,
    title: cv.title || 'CV',
    fileUrl: cv.fileUrl,
    isHidden: Boolean(cv.isHidden),
  }));

  return (
    <section id="home" style={{ 
      background: 'var(--color-hero-bg)', 
      minHeight: '88vh', 
      display: 'flex', 
      alignItems: 'center', 
      padding: '5rem 0 3.5rem 0',
      position: 'relative', 
      overflow: 'hidden' 
    }}>
      <div className="container flex-responsive" style={{ 
        position: 'relative', 
        zIndex: 2, 
        display: 'flex', 
        gap: '4rem', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        width: '100%'
      }}>
        {/* Text Content */}
        <div style={{ flex: 1, maxWidth: '620px' }}>
          {/* Live Status Pill */}
          <div className="status-badge">
            <span className="status-dot"></span>
            <span>Available for new projects</span>
          </div>

          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)', 
            fontWeight: 800, 
            lineHeight: 1.08, 
            letterSpacing: '-0.03em', 
            marginBottom: '1.25rem' 
          }}>
            <span className="text-gradient">
              {hero.title || defaultHero.title}
            </span>
          </h1>

          <h2 style={{ 
            color: 'var(--color-primary)', 
            fontSize: 'clamp(1.2rem, 2.5vw, 1.45rem)', 
            marginBottom: '1.25rem', 
            fontWeight: '600',
            letterSpacing: '-0.01em'
          }}>
            {hero.subtitle || defaultHero.subtitle}
          </h2>

          <p style={{ 
            color: 'var(--color-text-secondary)', 
            marginBottom: '2.25rem', 
            fontSize: '1.08rem', 
            lineHeight: 1.65,
            maxWidth: '560px' 
          }}>
            {hero.description || defaultHero.description}
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }} className="hero-cta-wrapper">
            <DownloadCVButton cvs={serializedCvs} fallbackUrl={hero.cvUrl} />
            <a href="#contact" className="btn btn-primary">
              Get In Touch &rarr;
            </a>
          </div>
        </div>

        {/* Profile Image with Ambient Halo Glow */}
        <div className="animate-float" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            {/* Ambient Radial Halo Glow */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '105%',
              height: '105%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)',
              opacity: 0.25,
              filter: 'blur(20px)',
              pointerEvents: 'none'
            }}></div>

            <div style={{ 
              width: '320px', 
              height: '320px', 
              maxWidth: '80vw', 
              maxHeight: '80vw', 
              borderRadius: '50%', 
              overflow: 'hidden', 
              border: '2px solid var(--color-border)', 
              boxShadow: 'var(--card-glow)',
              position: 'relative',
              backgroundColor: 'var(--color-surface)'
            }}>
              {hero.imageUrl ? (
                <img 
                  src={hero.imageUrl} 
                  alt="Profile" 
                  width={320}
                  height={320}
                  fetchPriority="high"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>
                  SM FERDOUS
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .hero-cta-wrapper {
            justify-content: center;
          }
        }
      `}} />
    </section>
  );
}
