import { prisma } from '@/lib/prisma';
import styles from './Hero.module.css';
import Link from 'next/link';

export default async function Hero() {
  const heroData = await prisma.hero.findFirst();

  if (!heroData) return null;

  return (
    <section id="home" className={styles.heroSection}>
      <div className={`container ${styles.heroContainer} flex-responsive`} style={{ display: 'flex', gap: '2rem', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className={styles.heroContent} style={{ flex: 1 }}>
          <h1 className={styles.title} style={{ textTransform: 'uppercase', marginBottom: '0.5rem', lineHeight: '1.2' }}>{heroData.title || 'HELLO THIS IS SM FERDOUS AHMMED'}</h1>
          <h2 className={styles.subtitle} style={{ color: 'var(--color-primary)', fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '500' }}>
            {heroData.subtitle || 'Frontend Developer & IoT Enthusiast'}
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', fontSize: '1.1rem', maxWidth: '600px' }}>
            {heroData.description || 'Developing seamless frontend interfaces and robust automation pipelines.'}
          </p>
          <div className={styles.ctaWrapper} style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <a href={heroData.cvUrl || '#'} download className="btn btn-outline" style={{ padding: '0.75rem 1.5rem' }}>
              Download CV &darr;
            </a>
            <Link href="#contact" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
              Get In Touch &rarr;
            </Link>
          </div>
        </div>
        <div className={`${styles.heroImage} animate-float`} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
