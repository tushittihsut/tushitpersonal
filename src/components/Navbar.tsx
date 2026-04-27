'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [inLightDimension, setInLightDimension] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Calculate if we've passed through the portal
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
        padding: '1.5rem 2rem',
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
        fontWeight: inLightDimension ? 400 : 800, 
        fontSize: '1.5rem', 
        letterSpacing: inLightDimension ? '0.05em' : '-0.05em', 
        fontFamily: inLightDimension ? "'Playfair Display', serif" : 'Space Grotesk',
        color: textColor,
        fontStyle: inLightDimension ? 'italic' : 'normal',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        {inLightDimension ? 'Portfolio.' : 'PORTFOLIO.'}
      </div>
      <div style={{ 
        display: 'flex', 
        gap: '2rem', 
        fontSize: '0.85rem', 
        fontWeight: inLightDimension ? 300 : 600, 
        textTransform: 'uppercase', 
        letterSpacing: inLightDimension ? '0.3em' : '0.1em',
        fontFamily: inLightDimension ? "'Inter', sans-serif" : "'Outfit', sans-serif",
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        {['Work', 'About', 'Contact'].map(link => (
          <a key={link} href={`#${link.toLowerCase()}`} className="interactive" style={{ 
            color: textColor, 
            textDecoration: 'none', 
            transition: 'opacity 0.3s',
            cursor: 'none'
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
