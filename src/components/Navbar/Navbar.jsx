import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ padding: '2rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="container">
      <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'var(--color-hero-bg)' }}>
        Logo
      </div>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <Link href="#about">About</Link>
        <Link href="#services">Services</Link>
        <Link href="#testimonials">Testimonials</Link>
        <Link href="#contact">Contact</Link>
      </div>
      <Link href="/admin" className="btn btn-outline" style={{ color: 'var(--color-text-primary)', borderColor: 'var(--color-text-primary)' }}>
        Admin Login
      </Link>
    </nav>
  );
}
