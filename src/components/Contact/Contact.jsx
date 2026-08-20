import { prisma } from '@/lib/prisma';
import ContactForm from './ContactForm';
import { FaFacebook, FaFacebookMessenger, FaWhatsapp, FaGithub, FaPhoneAlt } from 'react-icons/fa';

const defaultContact = {
  title: 'Let’s Build Something Exceptional',
  description: 'Whether you have a question, an open role, an IoT concept, or a project in mind, my inbox is always open.',
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
      <div className="section-header">
        <h2 className="section-title">Get In Touch</h2>
        <div className="section-divider"></div>
        <p className="section-subtitle">Reach out directly through the form or via my social profiles below.</p>
      </div>

      <div className="contact-box" style={{ 
        backgroundColor: 'var(--color-surface)', 
        color: 'var(--color-text-primary)', 
        padding: '3rem 2.5rem', 
        borderRadius: '20px', 
        display: 'flex', 
        gap: '3rem', 
        justifyContent: 'space-between', 
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        
        {/* Left Column: Direct Info */}
        <div style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.6rem)', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-text-primary)' }}>
              {contact.title || defaultContact.title}
            </h3>
            <p style={{ marginBottom: '2rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '0.96rem' }}>
              {contact.description || defaultContact.description}
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {contact.motto && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'var(--color-bg)', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--color-border)', wordBreak: 'break-all' }}>
                  <span style={{ fontSize: '1.1rem' }}>✉️</span>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Email</div>
                    <a href={`mailto:${contact.motto}`} style={{ color: 'var(--color-primary)', fontWeight: '600', fontSize: '0.92rem' }}>{contact.motto}</a>
                  </div>
                </div>
              )}

              {contact.phoneNumber && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'var(--color-bg)', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '1.1rem' }}>📞</span>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Phone</div>
                    <a href={`tel:${contact.phoneNumber}`} style={{ color: 'var(--color-text-primary)', fontWeight: '600', fontSize: '0.92rem' }}>{contact.phoneNumber}</a>
                  </div>
                </div>
              )}

              {(contact.location || contact.address) && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'var(--color-bg)', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '1.1rem' }}>📍</span>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Location</div>
                    <span style={{ color: 'var(--color-text-primary)', fontWeight: '500', fontSize: '0.92rem' }}>{contact.location || contact.address}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div style={{ flex: '1 1 340px', display: 'flex', justifyContent: 'center', width: '100%' }}>
          <ContactForm />
        </div>

      </div>

      {/* Modern Footer */}
      <footer className="footer-container" style={{ 
        marginTop: '4rem', 
        padding: '2rem 0 1rem 0', 
        borderTop: '1px solid var(--color-border)', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        color: 'var(--color-text-secondary)', 
        gap: '1.25rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ fontSize: '0.88rem' }}>
          &copy; {new Date().getFullYear()} <strong style={{ color: 'var(--color-text-primary)' }}>SM FERDOUS AHMMED</strong>. All rights reserved.
        </div>
        
        <div style={{ display: 'flex', gap: '1.25rem', fontSize: '1.35rem', alignItems: 'center' }}>
          <a href="https://github.com/asifsarkar411" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-secondary)', transition: 'color 0.2s ease, transform 0.2s ease' }} className="footer-social-icon" title="GitHub">
            <FaGithub />
          </a>
          <a href="https://www.facebook.com/sarkarasif59/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-secondary)', transition: 'color 0.2s ease, transform 0.2s ease' }} className="footer-social-icon" title="Facebook">
            <FaFacebook />
          </a>
          <a href="https://m.me/sarkarasif59" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-secondary)', transition: 'color 0.2s ease, transform 0.2s ease' }} className="footer-social-icon" title="Messenger">
            <FaFacebookMessenger />
          </a>
          <a href="https://wa.me/8801743648510" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-secondary)', transition: 'color 0.2s ease, transform 0.2s ease' }} className="footer-social-icon" title="WhatsApp">
            <FaWhatsapp />
          </a>
          <a href="tel:01628628300" style={{ color: 'var(--color-text-secondary)', transition: 'color 0.2s ease, transform 0.2s ease' }} className="footer-social-icon" title="Phone">
            <FaPhoneAlt />
          </a>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{__html: `
        .footer-social-icon:hover {
          color: var(--color-primary) !important;
          transform: translateY(-2px);
        }
        @media (max-width: 768px) {
          .contact-box {
            flex-direction: column !important;
            padding: 1.75rem 1.25rem !important;
            gap: 2.25rem !important;
          }
          .footer-container {
            flex-direction: column !important;
            text-align: center !important;
            gap: 1.25rem !important;
            justify-content: center !important;
          }
        }
        @media (max-width: 480px) {
          .contact-box {
            padding: 1.35rem 1rem !important;
            border-radius: 14px !important;
          }
        }
      `}} />
    </section>
  );
}
