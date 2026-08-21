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
    <section id="home" className="hero-section" style={{ 
      background: 'var(--color-hero-bg)', 
      minHeight: '85vh', 
      display: 'flex', 
      alignItems: 'center', 
      padding: '4.5rem 0 3rem 0',
      position: 'relative', 
      overflow: 'hidden' 
    }}>
      <div className="container hero-container" style={{ 
        position: 'relative', 
        zIndex: 2, 
        display: 'flex', 
        gap: '3.5rem', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        width: '100%'
      }}>
        {/* Text Content */}
        <div className="hero-text-content" style={{ flex: 1, maxWidth: '620px' }}>
          {/* Live Status Pill */}
          <div className="status-badge">
            <span className="status-dot"></span>
            <span>Available for new projects</span>
          </div>

          <h1 style={{ 
            fontSize: 'clamp(2.1rem, 5.5vw, 4.2rem)', 
            fontWeight: 800, 
            lineHeight: 1.1, 
            letterSpacing: '-0.03em', 
            marginBottom: '1.15rem' 
          }}>
            <span className="text-gradient">
              {hero.title || defaultHero.title}
            </span>
          </h1>

          <h2 style={{ 
            color: 'var(--color-primary)', 
            fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)', 
            marginBottom: '1.15rem', 
            fontWeight: '600',
            letterSpacing: '-0.01em'
          }}>
            {hero.subtitle || defaultHero.subtitle}
          </h2>

          <p style={{ 
            color: 'var(--color-text-secondary)', 
            marginBottom: '2rem', 
            fontSize: 'clamp(0.95rem, 2vw, 1.08rem)', 
            lineHeight: 1.65,
            maxWidth: '560px' 
          }}>
            {hero.description || defaultHero.description}
          </p>

          {/* Action CTAs */}
          <div className="hero-cta-wrapper" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <DownloadCVButton cvs={serializedCvs} fallbackUrl={hero.cvUrl} />
            <a href="#contact" className="btn btn-primary hero-btn">
              Get In Touch &rarr;
            </a>
          </div>
        </div>

        {/* Profile Image with Ambient Halo Glow */}
        <div className="hero-image-wrapper animate-float" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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

            <div className="hero-img-box" style={{ 
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
        .hero-cta-wrapper {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .hero-btn {
          min-height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.6rem;
          font-size: 0.95rem;
          font-weight: 600;
          white-space: nowrap;
          box-sizing: border-box;
          text-align: center;
        }
        .download-cv-dropdown-wrapper {
          display: inline-flex;
          align-items: center;
        }
        @media (max-width: 768px) {
          .hero-section {
            padding: 3.5rem 0 2.5rem 0 !important;
            min-height: auto !important;
          }
          .hero-container {
            flex-direction: column-reverse !important;
            gap: 2.5rem !important;
            text-align: center !important;
          }
          .hero-text-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-cta-wrapper {
            justify-content: center !important;
            width: 100%;
            max-width: 440px;
          }
          .hero-img-box {
            width: 250px !important;
            height: 250px !important;
          }
        }
        @media (max-width: 480px) {
          .hero-section {
            padding: 2.5rem 0 2rem 0 !important;
          }
          .hero-img-box {
            width: 200px !important;
            height: 200px !important;
          }
          .hero-cta-wrapper {
            width: 100% !important;
            display: flex !important;
            flex-direction: row !important;
            gap: 0.75rem !important;
          }
          .hero-cta-wrapper > *,
          .hero-cta-wrapper .download-cv-dropdown-wrapper,
          .hero-cta-wrapper .hero-btn {
            flex: 1 1 0 !important;
            width: 100% !important;
            padding: 0.75rem 0.75rem !important;
            font-size: 0.88rem !important;
            min-height: 46px !important;
            justify-content: center !important;
            text-align: center !important;
          }
        }
        @media (max-width: 360px) {
          .hero-cta-wrapper {
            flex-direction: column !important;
          }
        }
      `}} />
    </section>
  );
}
