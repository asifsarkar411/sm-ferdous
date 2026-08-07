import { prisma } from '@/lib/prisma';
import ContactForm from './ContactForm';


export default async function Contact() {
  const contactData = await prisma.contact.findFirst();

  return (
    <section id="contact" className="section container">
      <div className="flex-responsive" style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text-primary)', padding: '4rem 2rem', borderRadius: '16px', display: 'flex', gap: '4rem', justifyContent: 'space-between', border: '1px solid var(--color-border)' }}>
        
        <div style={{ flex: '1 1 300px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{contactData?.title || 'Get In Touch'}</h2>
          <p style={{ marginBottom: '2rem', color: 'var(--color-text-secondary)' }}>
            {contactData?.description || 'Looking forward to hearing from you!'}
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
            {contactData?.motto && (
              <div>
                <strong>Email:</strong> <span style={{ color: 'var(--color-text-secondary)' }}>{contactData.motto}</span>
              </div>
            )}
            {contactData?.address && (
              <div>
                <strong>Address:</strong> <span style={{ color: 'var(--color-text-secondary)' }}>{contactData.address}</span>
              </div>
            )}
            {contactData?.location && (
              <div>
                <strong>Location:</strong> <span style={{ color: 'var(--color-text-secondary)' }}>{contactData.location}</span>
              </div>
            )}
            {contactData?.phoneNumber && (
              <div>
                <strong>Phone:</strong> <span style={{ color: 'var(--color-text-secondary)' }}>{contactData.phoneNumber}</span>
              </div>
            )}
          </div>
        </div>

        <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
          <ContactForm />
        </div>

      </div>
      <footer className="flex-responsive" style={{ marginTop: '5rem', padding: '2rem 0', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
        <div>All right reserved by SM FERDOUS AHMMED</div>
      </footer>
    </section>
  );
}
