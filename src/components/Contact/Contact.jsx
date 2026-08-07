import { prisma } from '@/lib/prisma';
import ContactForm from './ContactForm';
import { FaFacebook, FaFacebookMessenger, FaWhatsapp, FaGithub, FaPhoneAlt } from 'react-icons/fa';


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
      <footer className="flex-responsive" style={{ marginTop: '5rem', padding: '2rem 0', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--color-text-secondary)', gap: '2rem' }}>
        <div>All right reserved by SM FERDOUS AHMMED</div>
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '1.5rem' }}>
          <a href="https://www.facebook.com/sarkarasif59/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-secondary)', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#1877F2'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-text-secondary)'} title="Facebook">
            <FaFacebook />
          </a>
          <a href="https://m.me/sarkarasif59" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-secondary)', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#00B2FF'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-text-secondary)'} title="Messenger">
            <FaFacebookMessenger />
          </a>
          <a href="https://wa.me/8801743648510" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-secondary)', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#25D366'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-text-secondary)'} title="WhatsApp">
            <FaWhatsapp />
          </a>
          <a href="https://github.com/asifsarkar411" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-secondary)', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--color-text-primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-text-secondary)'} title="GitHub">
            <FaGithub />
          </a>
          <a href="tel:01628628300" style={{ color: 'var(--color-text-secondary)', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--color-primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-text-secondary)'} title="Call Phone">
            <FaPhoneAlt />
          </a>
        </div>
      </footer>
    </section>
  );
}
