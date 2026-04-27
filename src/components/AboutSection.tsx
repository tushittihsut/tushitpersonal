'use client';
import { motion } from 'framer-motion';

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
              I am a creative developer who bridges the gap between design and engineering. My focus is on building immersive, highly interactive web experiences that don't just look good, but feel incredible to use.
            </p>
            <p style={{ color: '#8a7b6b', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', lineHeight: 1.8, marginBottom: '2.5rem', fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>
              By leveraging modern web technologies like React, Next.js, and WebGL, I create digital products that push the boundaries of what's possible in the browser.
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
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative', height: 'clamp(300px, 50vw, 500px)' }}
          >
            <div style={{ 
              position: 'absolute', inset: 0, background: 'rgba(255, 255, 255, 0.4)', borderRadius: '24px', 
              border: '1px solid rgba(255,255,255,0.6)', overflow: 'hidden',
              backdropFilter: 'blur(30px)', boxShadow: '0 8px 32px rgba(0,0,0,0.06)'
            }}>
              <div style={{ width: '150%', height: '150%', background: 'radial-gradient(circle at center, rgba(201, 168, 124, 0.15) 0%, transparent 60%)', position: 'absolute', top: '-25%', left: '-25%' }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', position: 'relative', zIndex: 10 }}>
                <div style={{ width: '200px', height: '200px', borderRadius: '50%', background: 'linear-gradient(135deg, #e8ddd3 0%, #c9a87c 100%)', filter: 'blur(50px)', opacity: 0.5 }} />
                <div style={{ position: 'absolute', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(5rem, 15vw, 8rem)', fontStyle: 'italic', color: 'rgba(61, 53, 40, 0.06)', fontWeight: 400 }}>A</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
