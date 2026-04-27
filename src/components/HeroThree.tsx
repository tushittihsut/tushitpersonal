'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const cards = [
  { id: 1, label: 'Design', subtitle: 'Visual systems & aesthetics' },
  { id: 2, label: 'Motion', subtitle: 'Animation & interaction' },
  { id: 3, label: 'Code', subtitle: 'Engineering & architecture' },
  { id: 4, label: 'Vision', subtitle: 'Strategy & direction' },
  { id: 5, label: '∞', subtitle: 'The infinite canvas' },
];

function SequentialCard({ 
  card, 
  index, 
  totalCards,
  scrollYProgress 
}: { 
  card: typeof cards[0], 
  index: number, 
  totalCards: number,
  scrollYProgress: any 
}) {
  // Each card gets an equal slice of the scroll timeline
  const segmentSize = 1 / totalCards;
  const start = index * segmentSize;
  const mid = start + segmentSize * 0.5;
  const end = start + segmentSize;

  // Phase 1: Approach from depth (small + transparent → full size + opaque)
  // Phase 2: Hold at center (fully visible, readable)
  // Phase 3: Pass through camera (scale up large + fade out)
  const scale = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.3, mid, end - segmentSize * 0.1, end],
    [0.3, 0.85, 1, 1.8, 3]
  );

  const opacity = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.2, start + segmentSize * 0.35, end - segmentSize * 0.2, end],
    [0, 1, 1, 1, 0]
  );

  // Subtle vertical drift as card approaches
  const y = useTransform(
    scrollYProgress,
    [start, mid, end],
    [60, 0, -40]
  );

  // Z-index: active card is always on top
  const zIndex = useTransform(
    scrollYProgress,
    [start, start + 0.01, end - 0.01, end],
    [0, 10, 10, 0]
  );

  // Blur for depth: sharp in focus, blurred when entering/exiting
  const blur = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.25, start + segmentSize * 0.4, end - segmentSize * 0.15, end],
    [8, 0, 0, 0, 6]
  );

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        x: '-50%',
        y,
        marginTop: '-240px',
        width: '380px',
        height: '480px',
        scale,
        opacity,
        zIndex,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
        willChange: 'transform, opacity, filter',
      }}
    >
      <div style={{
        width: '100%',
        height: '100%',
        borderRadius: '24px',
        background: 'rgba(255, 255, 255, 0.55)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        border: '1px solid rgba(255, 255, 255, 0.7)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Soft accent line at top */}
        <div style={{
          position: 'absolute', top: 0, left: '15%', right: '15%', height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(201, 168, 124, 0.5), transparent)',
        }} />

        {/* Card number */}
        <span style={{
          fontSize: '0.7rem',
          color: '#a09080',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 300,
        }}>
          {card.id === 5 ? '' : `Chapter ${card.id}`}
        </span>

        {/* Main label */}
        <span style={{
          fontSize: '5rem',
          fontWeight: 400,
          color: '#3d3528',
          fontFamily: "'Playfair Display', serif",
          fontStyle: 'italic',
          lineHeight: 1,
        }}>
          {card.label}
        </span>

        {/* Subtitle */}
        <span style={{
          fontSize: '0.85rem',
          color: '#a09080',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 300,
          letterSpacing: '0.1em',
          maxWidth: '240px',
          textAlign: 'center',
          lineHeight: 1.5,
        }}>
          {card.subtitle}
        </span>
      </div>
    </motion.div>
  );
}

export default function HeroThree() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Progress indicator for current card
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Section title fades out once the first card starts
  const titleOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.08], [0, -60]);

  return (
    <section ref={containerRef} style={{ height: '600vh', position: 'relative', background: 'transparent' }}>
      <div style={{ 
        position: 'sticky', 
        top: 0, 
        height: '100vh', 
        overflow: 'hidden', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
      }}>
        {/* Section intro text — fades out when cards begin */}
        <motion.div
          style={{
            position: 'absolute',
            zIndex: 5,
            opacity: titleOpacity,
            y: titleY,
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <h2 style={{ 
            fontSize: 'clamp(3rem, 6vw, 5rem)', 
            fontFamily: "'Playfair Display', serif", 
            fontWeight: 400, 
            color: '#3d3528',
            lineHeight: 1.2,
            fontStyle: 'italic'
          }}>
            A Different <br />Reality
          </h2>
          <p style={{ 
            color: '#a09080', 
            fontSize: '0.85rem', 
            marginTop: '1.5rem', 
            letterSpacing: '0.3em', 
            textTransform: 'uppercase',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300
          }}>
            Scroll to reveal
          </p>
        </motion.div>

        {/* Card container */}
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          {cards.map((card, index) => (
            <SequentialCard 
              key={card.id} 
              card={card} 
              index={index} 
              totalCards={cards.length}
              scrollYProgress={scrollYProgress} 
            />
          ))}
        </div>

        {/* Bottom progress bar */}
        <div style={{ 
          position: 'absolute', 
          bottom: '3rem', 
          left: '50%', 
          transform: 'translateX(-50%)',
          width: '200px', 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.8rem',
          zIndex: 20,
        }}>
          <div style={{ width: '100%', height: '1px', background: 'rgba(61, 53, 40, 0.1)', borderRadius: '1px' }}>
            <motion.div style={{ height: '100%', background: '#c9a87c', width: progressWidth, borderRadius: '1px' }} />
          </div>
          <motion.span style={{
            fontSize: '0.65rem',
            color: '#a09080',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            opacity: useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]),
          }}>
            {cards.length} Chapters
          </motion.span>
        </div>
      </div>
    </section>
  );
}
