import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function Hero() {
  const heroData = await prisma.hero.findFirst();

  if (!heroData) return null;

  return (
    <section id="home" style={{ backgroundColor: 'var(--color-hero-bg)', minHeight: '90vh', display: 'flex', alignItems: 'center', color: 'var(--color-white)', padding: '6rem 0', borderRadius: '0 0 var(--border-radius-lg) var(--border-radius-lg)', position: 'relative', overflow: 'hidden' }}>
      <div className="container flex-responsive" style={{ position: 'relative', zIndex: 2, display: 'flex', gap: '4rem', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ flex: 1, maxWidth: '600px' }}>
          <h1 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 700, lineHeight: 1.1, textTransform: 'uppercase', marginBottom: '1.5rem' }}>{heroData.title || 'HELLO THIS IS SM FERDOUS AHMMED'}</h1>
          <h2 style={{ color: 'var(--color-primary)', fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '500' }}>
            {heroData.subtitle || 'Frontend Developer & IoT Enthusiast'}
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', fontSize: '1.1rem', maxWidth: '600px' }}>
            {heroData.description || 'Developing seamless frontend interfaces and robust automation pipelines.'}
          </p>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <a href={heroData.cvUrl || '#'} download className="btn btn-outline" style={{ padding: '0.75rem 1.5rem' }}>
              Download CV &darr;
            </a>
            <Link href="#contact" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
              Get In Touch &rarr;
            </Link>
          </div>
        </div>
        <div className="animate-float" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '350px', height: '350px', borderRadius: '50%', overflow: 'hidden', border: '5px solid var(--color-border)', boxShadow: '0 0 30px var(--color-shadow)' }}>
            {heroData.imageUrl ? (
              <img src={heroData.imageUrl} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Profile Image</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
