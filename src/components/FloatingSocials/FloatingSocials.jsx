'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaFacebook, FaFacebookMessenger, FaGithub, FaPhoneAlt, FaPlus } from 'react-icons/fa';

export default function FloatingSocials() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const socials = [
    { name: 'WhatsApp', icon: <FaWhatsapp size={24} />, color: '#25D366', url: 'https://wa.me/8801743648510' },
    { name: 'Facebook', icon: <FaFacebook size={24} />, color: '#1877F2', url: 'https://www.facebook.com/sarkarasif59/' },
    { name: 'Messenger', icon: <FaFacebookMessenger size={24} />, color: '#00B2FF', url: 'https://m.me/sarkarasif59' },
    { name: 'GitHub', icon: <FaGithub size={24} />, color: '#333333', url: 'https://github.com/asifsarkar411' },
    { name: 'Phone', icon: <FaPhoneAlt size={24} />, color: '#00c6d2', url: 'tel:01628628300' },
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      zIndex: 9999
    }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '0.5rem' }}
          >
            {socials.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: social.color,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                  textDecoration: 'none'
                }}
                title={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleOpen}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0, 242, 254, 0.4)',
        }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FaPlus size={28} />
        </motion.div>
      </motion.button>
    </div>
  );
}
