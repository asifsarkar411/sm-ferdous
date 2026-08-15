'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (res.ok) {
        setStatus('success');
        e.target.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%', maxWidth: '500px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Full Name</label>
        <input 
          name="name" 
          placeholder="e.g. John Doe" 
          required 
          style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-primary)', outline: 'none', transition: 'border-color 0.2s ease' }} 
          className="contact-input-focus"
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Email Address</label>
        <input 
          name="email" 
          type="email" 
          placeholder="e.g. john@example.com" 
          required 
          style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-primary)', outline: 'none', transition: 'border-color 0.2s ease' }} 
          className="contact-input-focus"
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-secondary)' }}>Your Message</label>
        <textarea 
          name="message" 
          placeholder="Tell me about your project, idea, or inquiry..." 
          required 
          rows={4} 
          style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-primary)', resize: 'vertical', outline: 'none', transition: 'border-color 0.2s ease' }} 
          className="contact-input-focus"
        />
      </div>

      <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem 1.5rem', width: '100%', marginTop: '0.5rem' }} disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending Message...' : 'Send Message ✉️'}
      </button>

      {status === 'success' && (
        <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', border: '1px solid rgba(34, 197, 94, 0.2)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.9rem', textAlign: 'center' }}>
          ✓ Thank you! Your message has been sent successfully.
        </div>
      )}
      {status === 'error' && (
        <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.9rem', textAlign: 'center' }}>
          ✕ Failed to send message. Please try again.
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .contact-input-focus:focus {
          border-color: var(--color-primary) !important;
          box-shadow: 0 0 0 3px rgba(0, 242, 254, 0.15) !important;
        }
      `}} />
    </form>
  );
}
