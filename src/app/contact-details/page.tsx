'use client';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: 'tushitsachdeva7@gmail.com',
    href: 'mailto:tushitsachdeva7@gmail.com',
    description: 'For project inquiries & collaborations',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 9354989574',
    href: 'tel:+919354989574',
    description: 'Available Mon–Sat, 10AM–7PM IST',
  },
];

export default function ContactDetailsPage() {
  return (
    <main style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(180deg, #f5f0eb 0%, #ede6dd 100%)',
      padding: 'clamp(1rem, 4vw, 2rem)',
    }}>
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: '900px', margin: '0 auto', paddingTop: '1rem' }}
      >
        <Link href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          color: '#8a7b6b', textDecoration: 'none', fontSize: '0.85rem',
          fontFamily: "'Inter', sans-serif", fontWeight: 300,
          transition: 'color 0.3s',
          letterSpacing: '0.05em',
        }}
        onMouseOver={e => e.currentTarget.style.color = '#3d3528'}
        onMouseOut={e => e.currentTarget.style.color = '#8a7b6b'}>
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </motion.div>

      <div style={{ maxWidth: '900px', margin: '0 auto', paddingTop: 'clamp(3rem, 8vh, 6rem)', paddingBottom: '4rem' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}
        >
          <p style={{
            color: '#a09080', fontSize: '0.8rem', letterSpacing: '0.4em', textTransform: 'uppercase',
            fontFamily: "'Inter', sans-serif", fontWeight: 300, marginBottom: '1.5rem'
          }}>Contact</p>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400, fontStyle: 'italic',
            color: '#3d3528', lineHeight: 1.15, marginBottom: '1.5rem',
          }}>
            {"Let's Work"} <br />Together.
          </h1>
          <p style={{
            color: '#8a7b6b', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            fontFamily: "'Inter', sans-serif", fontWeight: 300, lineHeight: 1.7,
            maxWidth: '550px',
          }}>
            Have a project in mind or want to discuss an idea? Reach out through any of the channels below.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '1.5rem', marginBottom: 'clamp(3rem, 6vw, 4rem)' }}>
          {contactMethods.map((method, i) => (
            <motion.a
              key={method.label}
              href={method.href}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(30px)',
                border: '1px solid rgba(255,255,255,0.8)',
                borderRadius: '20px',
                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                textDecoration: 'none',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                display: 'flex', flexDirection: 'column', gap: '1rem',
              }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.08)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)'; }}
            >
              <div style={{
                width: '48px', height: '48px', borderRadius: '14px',
                background: 'rgba(61, 53, 40, 0.06)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <method.icon size={22} color="#3d3528" strokeWidth={1.5} />
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#a09080', letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif", fontWeight: 300, marginBottom: '0.5rem' }}>
                  {method.label}
                </div>
                <div style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', color: '#3d3528', fontFamily: "'Playfair Display', serif", fontWeight: 600, marginBottom: '0.4rem' }}>
                  {method.value}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#8a7b6b', fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>
                  {method.description}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Pricing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: '#3d3528',
            borderRadius: '20px',
            padding: 'clamp(2rem, 5vw, 3rem)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '1rem',
          }}
        >
          <div style={{
            width: '56px', height: '56px', borderRadius: '50%',
            background: 'rgba(245, 240, 235, 0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Phone size={24} color="#f5f0eb" strokeWidth={1.5} />
          </div>
          <h3 style={{
            fontSize: 'clamp(1.3rem, 4vw, 1.8rem)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400, fontStyle: 'italic',
            color: '#f5f0eb',
          }}>
            For Pricing & Custom Quotes
          </h3>
          <p style={{
            fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
            color: 'rgba(245, 240, 235, 0.6)',
            fontFamily: "'Inter', sans-serif", fontWeight: 300,
            lineHeight: 1.6, maxWidth: '450px',
          }}>
            Every project is unique. Give me a call to discuss your requirements and get a personalized quote.
          </p>
          <a href="tel:+919354989574" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            marginTop: '0.5rem',
            padding: 'clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2.5rem)',
            background: '#f5f0eb', color: '#3d3528',
            borderRadius: '40px', fontWeight: 500,
            textDecoration: 'none', fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
            fontFamily: "'Inter', sans-serif",
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)'; }}
          onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
            <Phone size={16} />
            Call Now — +91 9354989574
          </a>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{
            textAlign: 'center', marginTop: '3rem',
            color: '#a09080', fontSize: '0.8rem',
            fontFamily: "'Inter', sans-serif", fontWeight: 300,
            letterSpacing: '0.05em',
          }}
        >
          © {new Date().getFullYear()} Beyond Interface. All rights reserved.
        </motion.p>
      </div>
    </main>
  );
}
