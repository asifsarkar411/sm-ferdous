import Link from 'next/link';

export default function Contact() {
  return (
    <section id="contact" className="section container">
      <div style={{ backgroundColor: 'var(--color-hero-bg)', color: 'white', padding: '4rem 2rem', borderRadius: '16px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Ready to Write Your Own Success Story?</h2>
        <p style={{ marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
          Join hundreds of professionals who've transformed their careers through expert coaching. Whether you're switching fields or leveling up, your breakthrough starts here.
        </p>
        <button className="btn btn-primary" style={{ backgroundColor: '#fff', color: 'var(--color-hero-bg)' }}>
          Book Your Free Strategy Call
        </button>
      </div>
      <footer style={{ marginTop: '5rem', padding: '2rem 0', borderTop: '1px solid #eaeaea', display: 'flex', justifyContent: 'space-between' }}>
        <div>© 2026 Portfolio. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="#">Twitter</a>
          <a href="#">LinkedIn</a>
        </div>
      </footer>
    </section>
  );
}
