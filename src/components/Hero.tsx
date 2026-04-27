'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const titleX = useTransform(smoothX, [-0.5, 0.5], [-30, 30]);
  const titleY = useTransform(smoothY, [-0.5, 0.5], [-30, 30]);
  const descX = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
  const descY = useTransform(smoothY, [-0.5, 0.5], [-15, 15]);
  const btnX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const btnY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX / innerWidth - 0.5);
      mouseY.set(e.clientY / innerHeight - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section ref={containerRef} style={{ position: 'relative', height: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', perspective: '1000px', background: 'transparent' }}>
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 1.5rem', transformStyle: 'preserve-3d' }}>
        <motion.h1 
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ 
            fontSize: 'clamp(2.5rem, 8vw, 7rem)', 
            lineHeight: 1.1, 
            marginBottom: '1.5rem', 
            fontFamily: 'Space Grotesk', 
            letterSpacing: '-0.03em',
            x: titleX,
            y: titleY,
            rotateX: useTransform(smoothY, [-0.5, 0.5], [10, -10]),
            rotateY: useTransform(smoothX, [-0.5, 0.5], [-10, 10]),
          }}
        >
          Crafting <span className="text-gradient-accent">Digital</span> <br /> Experiences.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ 
            fontSize: 'clamp(0.95rem, 2.5vw, 1.3rem)', 
            color: '#a0a0a0', 
            maxWidth: '650px', 
            margin: '0 auto 2.5rem auto', 
            lineHeight: 1.6,
            x: descX,
            y: descY
          }}
        >
          A cinematic, interactive portfolio engineered to impress. Elevating brands through code, motion, and design.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ x: btnX, y: btnY }}
        >
          <a href="#work" style={{ 
            display: 'inline-block',
            padding: 'clamp(0.9rem, 2vw, 1.2rem) clamp(2rem, 5vw, 3rem)', 
            background: 'var(--foreground)', 
            color: 'var(--background)', 
            borderRadius: '40px', 
            fontWeight: 700,
            textDecoration: 'none',
            fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
            transition: 'all 0.3s ease',
            boxShadow: '0 10px 30px -10px rgba(255,255,255,0.3)'
          }}
          className="interactive"
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 15px 40px -10px rgba(255,255,255,0.5)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(255,255,255,0.3)';
          }}
          >
            Explore Reality
          </a>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        style={{ position: 'absolute', bottom: '2rem', left: '50%', marginLeft: '-15px', zIndex: 10 }}
      >
        <div style={{ width: '30px', height: '50px', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '15px', position: 'relative' }}>
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '6px', height: '6px', background: 'var(--primary)', borderRadius: '50%', position: 'absolute', top: '10px', left: '50%', marginLeft: '-3px' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
