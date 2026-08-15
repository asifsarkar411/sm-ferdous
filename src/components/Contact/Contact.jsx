import { prisma } from '@/lib/prisma';
import ContactForm from './ContactForm';
import { FaFacebook, FaFacebookMessenger, FaWhatsapp, FaGithub, FaPhoneAlt } from 'react-icons/fa';

const defaultContact = {
  title: 'Get In Touch',
  description: 'Looking forward to hearing from you! Feel free to reach out anytime.',
  motto: 'asifsarkar411@gmail.com',
  address: 'Dhaka, Bangladesh',
  location: 'Bangladesh',
  phoneNumber: '+8801628628300',
};

export default async function Contact({ contactData: propContactData }) {
  const contactData = propContactData !== undefined ? propContactData : await prisma.contact.findFirst().catch(() => null);
  const contact = contactData || defaultContact;

  return (
    <section id="contact" className="section container">
      <div className="flex-responsive" style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text-primary)', padding: '4rem 2rem', borderRadius: '16px', display: 'flex', gap: '4rem', justifyContent: 'space-between', border: '1px solid var(--color-border)' }}>
        
        <div style={{ flex: '1 1 300px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{contact.title || defaultContact.title}</h2>
          <p style={{ marginBottom: '2rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            {contact.description || defaultContact.description}
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
            {contact.motto && (
              <div>
                <strong>Email:</strong> <span style={{ color: 'var(--color-text-secondary)', marginLeft: '0.5rem' }}>{contact.motto}</span>
              </div>
            )}
            {contact.address && (
              <div>
                <strong>Address:</strong> <span style={{ color: 'var(--color-text-secondary)', marginLeft: '0.5rem' }}>{contact.address}</span>
              </div>
            )}
            {contact.location && (
              <div>
                <strong>Location:</strong> <span style={{ color: 'var(--color-text-secondary)', marginLeft: '0.5rem' }}>{contact.location}</span>
              </div>
            )}
            {contact.phoneNumber && (
              <div>
                <strong>Phone:</strong> <span style={{ color: 'var(--color-text-secondary)', marginLeft: '0.5rem' }}>{contact.phoneNumber}</span>
              </div>
            )}
          </div>
        </div>

        <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
          <ContactForm />
        </div>

      </div>
      <footer className="flex-responsive" style={{ marginTop: '5rem', padding: '2rem 0', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--color-text-secondary)', gap: '2rem' }}>
        <div>All rights reserved &copy; {new Date().getFullYear()} SM FERDOUS AHMMED</div>
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '1.5rem' }}>
          <a href="https://www.facebook.com/sarkarasif59/" target="_blank" rel="noopener noreferrer" className="social-icon-fb" style={{ color: 'var(--color-text-secondary)', transition: 'color 0.2s ease' }} title="Facebook">
            <FaFacebook />
          </a>
          <a href="https://m.me/sarkarasif59" target="_blank" rel="noopener noreferrer" className="social-icon-msg" style={{ color: 'var(--color-text-secondary)', transition: 'color 0.2s ease' }} title="Messenger">
            <FaFacebookMessenger />
          </a>
          <a href="https://wa.me/8801743648510" target="_blank" rel="noopener noreferrer" className="social-icon-wa" style={{ color: 'var(--color-text-secondary)', transition: 'color 0.2s ease' }} title="WhatsApp">
            <FaWhatsapp />
          </a>
          <a href="https://github.com/asifsarkar411" target="_blank" rel="noopener noreferrer" className="social-icon-gh" style={{ color: 'var(--color-text-secondary)', transition: 'color 0.2s ease' }} title="GitHub">
            <FaGithub />
          </a>
          <a href="tel:01628628300" className="social-icon-ph" style={{ color: 'var(--color-text-secondary)', transition: 'color 0.2s ease' }} title="Call Phone">
            <FaPhoneAlt />
          </a>
        </div>
      </footer>
    </section>
  );
}
