'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HeroTwo() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Typography animation while the 3D scene (GlobalScene) zooms through the portal
  const textY = useTransform(scrollYProgress, [0, 0.4], [100, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.8, 1], [0, 1, 1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.2]);
  const letterSpacing = useTransform(scrollYProgress, [0, 0.5], ["-0.05em", "0.1em"]);

  return (
    <section ref={containerRef} style={{ height: '500vh', position: 'relative', background: 'transparent', pointerEvents: 'none' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', mixBlendMode: 'plus-lighter' }}>
          <motion.h2 
            style={{ 
              fontSize: 'clamp(3rem, 6vw, 6rem)', 
              fontFamily: 'Space Grotesk', 
              fontWeight: 800,
              y: textY,
              opacity: textOpacity,
              scale: textScale,
              letterSpacing,
              color: 'white',
              lineHeight: 1,
              textShadow: '0 0 40px rgba(168,85,247,0.5)'
            }}
          >
            Entering A New <br />
            Dimension.
          </motion.h2>
          <motion.p
            style={{
              fontSize: '1.5rem',
              color: 'rgba(255,255,255,0.9)',
              marginTop: '1.5rem',
              y: useTransform(scrollYProgress, [0.2, 0.5], [50, 0]),
              opacity: useTransform(scrollYProgress, [0.2, 0.4, 0.8, 1], [0, 1, 1, 0]),
              textShadow: '0 0 20px rgba(99,102,241,0.5)'
            }}
          >
            Where logic meets imagination
          </motion.p>
        </div>
      </div>
    </section>
  );
}
