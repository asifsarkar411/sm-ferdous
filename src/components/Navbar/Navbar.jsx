import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function Navbar() {
  const heroData = await prisma.hero.findFirst();

  return (
    <nav style={{ 
      padding: '1rem 2rem', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    }}>
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {heroData?.logoImage && (
          <img src={heroData.logoImage} alt="Logo" style={{ height: '40px', width: 'auto', borderRadius: '4px' }} />
        )}
        <div style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--color-primary)' }}>
          {heroData?.logoName || 'Logo'}
        </div>
      </Link>
      
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link href="#home">Home</Link>
        <Link href="#about">About</Link>
        <Link href="#journey">Journey</Link>
        <Link href="#skills">Skills</Link>
        <Link href="#projects">Projects</Link>
        <Link href="#hobby">Hobby</Link>
        <Link href="#contact">Contact</Link>
        
        <Link href="/admin" className="btn btn-outline" style={{ color: 'var(--color-text-primary)', borderColor: 'var(--color-text-primary)', padding: '0.4rem 1rem', marginLeft: '1rem' }}>
          Admin
        </Link>
      </div>
    </nav>
  );
}
