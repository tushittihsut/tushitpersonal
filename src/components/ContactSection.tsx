'use client';
import { motion } from 'framer-motion';

export default function ContactSection() {
  return (
    <section id="contact" style={{ padding: 'clamp(4rem, 8vw, 8rem) 0 clamp(2rem, 5vw, 5rem) 0', position: 'relative', background: 'transparent' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ 
            background: 'rgba(255, 255, 255, 0.45)', backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.6)', 
            borderRadius: '24px', padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 2rem)',
            position: 'relative', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.04)'
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(201, 168, 124, 0.1) 0%, transparent 70%)', zIndex: 0 }} />
          
          <div style={{ position: 'relative', zIndex: 10 }}>
            <p style={{ color: '#a09080', fontSize: '0.8rem', letterSpacing: '0.4em', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif", fontWeight: 300, marginBottom: '1.5rem' }}>Get in Touch</p>
            <h2 style={{ 
              fontSize: 'clamp(1.8rem, 5vw, 4rem)', 
              fontFamily: "'Playfair Display', serif", fontWeight: 400, marginBottom: '1.5rem',
              color: '#3d3528', fontStyle: 'italic', lineHeight: 1.2
            }}>
              Let's Build Something <br/>Extraordinary.
            </h2>
            <p style={{ color: '#8a7b6b', fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', maxWidth: '550px', margin: '0 auto 2.5rem auto', fontFamily: "'Inter', sans-serif", fontWeight: 300, lineHeight: 1.7 }}>
              Open for freelance opportunities and collaborations. If you have a project in mind, let's talk.
            </p>
            <a href="mailto:hello@example.com" className="interactive" style={{ 
              display: 'inline-block', padding: 'clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2.5rem)', 
              background: '#3d3528', color: '#f5f0eb', borderRadius: '40px', fontWeight: 500,
              textDecoration: 'none', fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)', fontFamily: "'Inter', sans-serif", cursor: 'none'
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(61, 53, 40, 0.2)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              Get In Touch
            </a>
          </div>
        </motion.div>
        
        <div style={{ 
          marginTop: 'clamp(2rem, 5vw, 5rem)', color: '#a09080', fontSize: 'clamp(0.7rem, 2vw, 0.85rem)', 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
          fontFamily: "'Inter', sans-serif", fontWeight: 300
        }}>
          <div>© {new Date().getFullYear()} Portfolio.</div>
          <div style={{ display: 'flex', gap: 'clamp(1rem, 3vw, 2rem)' }}>
            {['Twitter', 'LinkedIn', 'GitHub'].map(link => (
              <a key={link} href="#" className="interactive" style={{ 
                color: '#a09080', textDecoration: 'none', transition: 'color 0.4s', cursor: 'none', letterSpacing: '0.1em'
              }} 
              onMouseOver={e => e.currentTarget.style.color = '#3d3528'} 
              onMouseOut={e => e.currentTarget.style.color = '#a09080'}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
