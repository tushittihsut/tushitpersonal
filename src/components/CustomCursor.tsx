'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [inLightDimension, setInLightDimension] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleScroll = () => {
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const progress = window.scrollY / maxScroll;
      setInLightDimension(progress > 0.3);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('scroll', handleScroll);
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('scroll', handleScroll);
      document.body.style.cursor = 'auto';
    };
  }, []);

  const dotColor = inLightDimension ? '#3d3528' : '#ffffff';
  const ringBorder = inLightDimension ? '1px solid rgba(61,53,40,0.3)' : '1px solid rgba(255,255,255,0.5)';
  const ringHoverBg = inLightDimension ? 'rgba(61,53,40,1)' : 'rgba(255,255,255,1)';

  return (
    <>
      <motion.div
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '8px', height: '8px',
          backgroundColor: dotColor,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          transition: 'background-color 0.6s ease'
        }}
      />
      <motion.div
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? ringHoverBg : 'rgba(0,0,0,0)',
          border: isHovering ? 'none' : ringBorder,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.2 }}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '40px', height: '40px',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
}
