import { PrismaClient } from '@prisma/client';
import ContactForm from './ContactForm';

const prisma = new PrismaClient();

export default async function Contact() {
  const contactData = await prisma.contact.findFirst();

  return (
    <section id="contact" className="section container">
      <div style={{ backgroundColor: 'var(--color-hero-bg)', color: 'white', padding: '4rem 2rem', borderRadius: '16px', display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'space-between' }}>
        
        <div style={{ flex: '1 1 300px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{contactData?.title || 'Get In Touch'}</h2>
          <p style={{ marginBottom: '2rem', color: '#e2e8f0' }}>
            {contactData?.description || 'Looking forward to hearing from you!'}
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
            {contactData?.motto && (
              <div>
                <strong>Motto:</strong> <span style={{ color: '#e2e8f0' }}>{contactData.motto}</span>
              </div>
            )}
            {contactData?.address && (
              <div>
                <strong>Address:</strong> <span style={{ color: '#e2e8f0' }}>{contactData.address}</span>
              </div>
            )}
            {contactData?.location && (
              <div>
                <strong>Location:</strong> <span style={{ color: '#e2e8f0' }}>{contactData.location}</span>
              </div>
            )}
            {contactData?.phoneNumber && (
              <div>
                <strong>Phone:</strong> <span style={{ color: '#e2e8f0' }}>{contactData.phoneNumber}</span>
              </div>
            )}
          </div>
        </div>

        <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
          <ContactForm />
        </div>

      </div>
      <footer style={{ marginTop: '5rem', padding: '2rem 0', borderTop: '1px solid #eaeaea', display: 'flex', justifyContent: 'space-between' }}>
        <div>© 2026 Portfolio. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="#">GitHub</a>
          <a href="#">LinkedIn</a>
        </div>
      </footer>
    </section>
  );
}
