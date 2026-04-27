'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const words = ['Design', 'Motion', 'Code', 'Vision', 'Craft'];

export default function DimensionLanding() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Main title animation
  const titleScale = useTransform(scrollYProgress, [0, 0.3, 0.6], [0.8, 1, 1.2]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.7, 0.9], [0, 1, 1, 0]);
  const titleLetterSpacing = useTransform(scrollYProgress, [0, 0.3], ['-0.02em', '0.15em']);

  // Subtitle
  const subOpacity = useTransform(scrollYProgress, [0.1, 0.25, 0.7, 0.85], [0, 1, 1, 0]);
  const subY = useTransform(scrollYProgress, [0.1, 0.25], [40, 0]);

  // Floating rings
  const ring1Rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const ring2Rotate = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const ring3Rotate = useTransform(scrollYProgress, [0, 1], [45, 225]);
  const ringScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.6]);
  const ringOpacity = useTransform(scrollYProgress, [0, 0.15, 0.75, 0.95], [0, 0.4, 0.4, 0]);

  // Word cascade
  const wordContainerOpacity = useTransform(scrollYProgress, [0.25, 0.4, 0.75, 0.9], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} style={{ height: '300vh', position: 'relative', background: 'transparent' }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>

        {/* Geometric rings — orbital 3D feel */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          {/* Ring 1 — large, tilted */}
          <motion.div style={{
            position: 'absolute',
            width: '600px', height: '600px',
            border: '1px solid rgba(201, 168, 124, 0.15)',
            borderRadius: '50%',
            rotate: ring1Rotate,
            scale: ringScale,
            opacity: ringOpacity,
            rotateX: '70deg',
          }} />
          {/* Ring 2 — medium, counter-rotate */}
          <motion.div style={{
            position: 'absolute',
            width: '450px', height: '450px',
            border: '1px solid rgba(61, 53, 40, 0.1)',
            borderRadius: '50%',
            rotate: ring2Rotate,
            scale: ringScale,
            opacity: ringOpacity,
            rotateX: '60deg',
            rotateY: '30deg',
          }} />
          {/* Ring 3 — small, different axis */}
          <motion.div style={{
            position: 'absolute',
            width: '300px', height: '300px',
            border: '1px solid rgba(201, 168, 124, 0.2)',
            borderRadius: '50%',
            rotate: ring3Rotate,
            scale: ringScale,
            opacity: ringOpacity,
            rotateX: '80deg',
            rotateY: '-40deg',
          }} />

          {/* Center glow */}
          <motion.div style={{
            position: 'absolute',
            width: '200px', height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201, 168, 124, 0.15) 0%, transparent 70%)',
            scale: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1.5, 1.5, 0.5]),
            opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
          }} />
        </div>

        {/* Main content */}
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', pointerEvents: 'none' }}>
          <motion.h2 style={{
            fontSize: 'clamp(3.5rem, 7vw, 6rem)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
            color: '#3d3528',
            lineHeight: 1.1,
            fontStyle: 'italic',
            scale: titleScale,
            opacity: titleOpacity,
            letterSpacing: titleLetterSpacing,
          }}>
            A Different <br />Reality
          </motion.h2>

          <motion.p style={{
            color: '#a09080',
            fontSize: '1.1rem',
            marginTop: '2rem',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            letterSpacing: '0.2em',
            opacity: subOpacity,
            y: subY,
          }}>
            You've arrived.
          </motion.p>

          {/* Animated word cascade */}
          <motion.div style={{
            display: 'flex',
            gap: '2.5rem',
            justifyContent: 'center',
            marginTop: '4rem',
            opacity: wordContainerOpacity,
            flexWrap: 'wrap',
            padding: '0 2rem',
          }}>
            {words.map((word, i) => (
              <motion.span
                key={word}
                style={{
                  fontSize: '0.75rem',
                  color: '#a09080',
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                  opacity: useTransform(
                    scrollYProgress,
                    [0.3 + i * 0.04, 0.35 + i * 0.04],
                    [0, 1]
                  ),
                  y: useTransform(
                    scrollYProgress,
                    [0.3 + i * 0.04, 0.35 + i * 0.04],
                    [20, 0]
                  ),
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          {/* Thin decorative line */}
          <motion.div style={{
            width: '1px',
            height: '80px',
            background: 'linear-gradient(to bottom, rgba(201, 168, 124, 0.4), transparent)',
            margin: '3rem auto 0',
            opacity: useTransform(scrollYProgress, [0.35, 0.5, 0.8, 0.95], [0, 1, 1, 0]),
            scaleY: useTransform(scrollYProgress, [0.35, 0.5], [0, 1]),
          }} />
        </div>
      </div>
    </section>
  );
}
