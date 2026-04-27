'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about" style={{ padding: 'clamp(4rem, 10vw, 10rem) 0', position: 'relative', background: 'transparent' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(2rem, 5vw, 6rem)', alignItems: 'center' }}
        >
          <div>
            <p style={{ 
              color: '#a09080', fontSize: '0.8rem', letterSpacing: '0.4em', textTransform: 'uppercase',
              fontFamily: "'Inter', sans-serif", fontWeight: 300, marginBottom: '1.5rem'
            }}>About</p>
            <h2 style={{ 
              fontSize: 'clamp(2.2rem, 6vw, 3.5rem)', 
              fontFamily: "'Playfair Display', serif", fontWeight: 400, marginBottom: '2rem',
              color: '#3d3528', lineHeight: 1.2, fontStyle: 'italic'
            }}>Beyond the <br/>Code.</h2>

            <p style={{ color: '#8a7b6b', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', lineHeight: 1.8, marginBottom: '1.5rem', fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>
              {"I'm Tushit — a developer focused on building high-performance, immersive web experiences."}
            </p>
            <p style={{ color: '#8a7b6b', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', lineHeight: 1.8, marginBottom: '1.5rem', fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>
              {"I don't just create websites. I engineer interactions that feel smooth, intentional, and alive. My work blends design, motion, and code to turn simple ideas into experiences people actually remember."}
            </p>
            <p style={{ color: '#8a7b6b', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', lineHeight: 1.8, marginBottom: '2.5rem', fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>
              {"I'm constantly pushing beyond standard interfaces — exploring animation, 3D, and scroll-driven storytelling to build websites that feel less like pages and more like journeys."}
            </p>
            
            <div style={{ borderTop: '1px solid rgba(61, 53, 40, 0.1)', paddingTop: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.75rem', color: '#a09080', marginBottom: '0.8rem', letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>Core Stack</h4>
                  <p style={{ color: '#3d3528', lineHeight: 1.7, fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.9rem' }}>React, Next.js,<br/>TypeScript, Node.js</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.75rem', color: '#a09080', marginBottom: '0.8rem', letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>Creative</h4>
                  <p style={{ color: '#3d3528', lineHeight: 1.7, fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '0.9rem' }}>Three.js, WebGL,<br/>GSAP, Framer Motion</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Portrait Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative', height: 'clamp(350px, 55vw, 550px)' }}
          >
            <div style={{ 
              position: 'absolute', inset: 0, borderRadius: '24px', overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 8px 32px rgba(0,0,0,0.06)'
            }}>
              <Image 
                src="/about-portrait.jpg" 
                alt="Tushit — Developer" 
                fill 
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                priority
              />
              {/* Soft gradient overlay at bottom */}
              <div style={{ 
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
                background: 'linear-gradient(to top, rgba(245, 240, 235, 0.6), transparent)',
                pointerEvents: 'none'
              }} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
