import { prisma } from '@/lib/prisma';
import styles from './Hero.module.css';
import Link from 'next/link';

export default async function Hero() {
  const heroData = await prisma.hero.findFirst();

  if (!heroData) return null;

  return (
    <section className={styles.heroSection}>
      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>Career coaching</div>
          <h1 className={styles.title}>{heroData.title}</h1>
          <p className={styles.subtitle}>{heroData.subtitle}</p>
          <div className={styles.ctaWrapper}>
            <Link href="#about" className="btn btn-primary">
              Read My Full Story &rarr;
            </Link>
          </div>
        </div>
        <div className={styles.heroImage}>
          {heroData.imageUrl ? (
            <img src={heroData.imageUrl} alt="Profile" />
          ) : (
            <div className={styles.imagePlaceholder}>Profile Image</div>
          )}
        </div>
      </div>
    </section>
  );
}
