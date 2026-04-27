'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [inLightDimension, setInLightDimension] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const progress = window.scrollY / maxScroll;
      setInLightDimension(progress > 0.3);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const textColor = inLightDimension ? '#3d3528' : 'var(--foreground)';
  const bgColor = scrolled
    ? inLightDimension ? 'rgba(245, 240, 235, 0.7)' : 'rgba(5, 5, 5, 0.8)'
    : 'transparent';
  const borderColor = scrolled 
    ? inLightDimension ? 'rgba(61, 53, 40, 0.1)' : 'var(--surface-border)'
    : 'transparent';

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: '1rem 1.2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: bgColor,
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: `1px solid ${borderColor}`,
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div style={{ 
        fontWeight: inLightDimension ? 400 : 700, 
        fontSize: 'clamp(0.75rem, 2.5vw, 1.2rem)', 
        letterSpacing: inLightDimension ? '0.03em' : '-0.02em', 
        fontFamily: inLightDimension ? "'Playfair Display', serif" : 'Space Grotesk',
        color: textColor,
        fontStyle: inLightDimension ? 'italic' : 'normal',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        whiteSpace: 'nowrap'
      }}>
        {inLightDimension ? 'Beyond Interface by Tushit' : 'BEYOND INTERFACE BY TUSHIT'}
      </div>
      <div style={{ 
        display: 'flex', 
        gap: 'clamp(0.8rem, 3vw, 2rem)', 
        fontSize: 'clamp(0.6rem, 1.8vw, 0.85rem)', 
        fontWeight: inLightDimension ? 300 : 600, 
        textTransform: 'uppercase', 
        letterSpacing: inLightDimension ? '0.15em' : '0.05em',
        fontFamily: inLightDimension ? "'Inter', sans-serif" : "'Outfit', sans-serif",
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        {['Work', 'About', 'Reviews', 'Contact'].map(link => (
          <a key={link} href={`#${link.toLowerCase()}`} className="interactive" style={{ 
            color: textColor, 
            textDecoration: 'none', 
            transition: 'opacity 0.3s',
            cursor: 'none',
            whiteSpace: 'nowrap'
          }}
          onMouseOver={e => e.currentTarget.style.opacity = '0.5'}
          onMouseOut={e => e.currentTarget.style.opacity = '1'}>
            {link}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}
