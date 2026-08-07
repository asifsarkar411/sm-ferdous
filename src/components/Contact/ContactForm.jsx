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
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '500px' }}>
      <input 
        name="name" 
        placeholder="Your Name" 
        required 
        style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #eaeaea', backgroundColor: 'transparent', color: 'white' }} 
      />
      <input 
        name="email" 
        type="email" 
        placeholder="Your Email" 
        required 
        style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #eaeaea', backgroundColor: 'transparent', color: 'white' }} 
      />
      <textarea 
        name="message" 
        placeholder="Your Message" 
        required 
        rows={4} 
        style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #eaeaea', backgroundColor: 'transparent', color: 'white', resize: 'vertical' }} 
      />
      <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#fff', color: 'var(--color-hero-bg)' }} disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
      {status === 'success' && <p style={{ color: 'lightgreen', fontSize: '0.875rem' }}>Message sent successfully!</p>}
      {status === 'error' && <p style={{ color: 'lightcoral', fontSize: '0.875rem' }}>Failed to send message. Please try again.</p>}
    </form>
  );
}
