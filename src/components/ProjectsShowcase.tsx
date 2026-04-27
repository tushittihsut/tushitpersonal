'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink, Code } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Aura E-Commerce',
    description: 'A premium headless e-commerce experience. Seamless transitions and a minimalist design language.',
    tech: ['Next.js', 'React', 'WebGL'],
    accent: '#c9a87c',
  },
  {
    id: 2,
    title: 'Nexus AI Dashboard',
    description: 'Real-time AI analytics dashboard. High-performance data visualization using WebGL.',
    tech: ['React', 'D3.js', 'Node.js'],
    accent: '#8a7b6b',
  },
  {
    id: 3,
    title: 'Lumina Creative',
    description: 'Award-winning agency website featuring scrollytelling and custom shaders.',
    tech: ['Three.js', 'GSAP', 'Next.js'],
    accent: '#a0907e',
  },
  {
    id: 4,
    title: 'Jesko Jets Clone',
    description: 'A 3D cinematic landing page inspired by high-end aviation. Features smooth camera motions.',
    tech: ['Three.js', 'Framer'],
    accent: '#b5a48e',
  }
];

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
  };

  return (
    <motion.div 
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: index * 0.8 }}
      style={{ width: 'min(420px, 80vw)', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '0' }}
    >
      <div 
        ref={cardRef}
        className="interactive"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          height: 'min(520px, 65vw)',
          borderRadius: '24px',
          background: 'rgba(255, 255, 255, 0.55)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          boxShadow: hovered 
            ? '0 20px 60px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)' 
            : '0 8px 32px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
          transition: 'box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.15s ease-out',
          cursor: 'none',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(255,255,255,0.7)'
        }}
      >
        <div style={{ 
          position: 'absolute', top: 0, left: '10%', right: '10%', height: '2px', 
          background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
          opacity: 0.6
        }} />
        
        <div style={{ textAlign: 'center' }}>
          <motion.div
            animate={{ opacity: hovered ? 1 : 0.4 }}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: 'clamp(4rem, 12vw, 7rem)',
              fontWeight: 400,
              color: '#3d3528',
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              lineHeight: 1
            }}
          >
            0{project.id}
          </motion.div>
          <div style={{
            fontSize: '0.7rem',
            color: '#a09080',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            marginTop: '1rem'
          }}>
            View Project
          </div>
        </div>
      </div>
      
      <div style={{ padding: '1.5rem 0.5rem' }}>
        <h3 style={{ 
          fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', 
          marginBottom: '0.6rem', 
          fontFamily: "'Playfair Display', serif",
          fontWeight: 600,
          color: '#3d3528'
        }}>
          {project.title}
        </h3>
        <p style={{ 
          color: '#8a7b6b', 
          fontSize: 'clamp(0.85rem, 2.5vw, 1rem)', 
          lineHeight: 1.6, 
          marginBottom: '1rem',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 300
        }}>
          {project.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.2rem' }}>
          {project.tech.map((t: string) => (
            <span key={t} style={{ 
              padding: '0.3rem 0.8rem', 
              background: 'rgba(61, 53, 40, 0.06)', 
              border: '1px solid rgba(61, 53, 40, 0.12)',
              borderRadius: '20px',
              fontSize: '0.7rem',
              color: '#8a7b6b',
              fontWeight: 400,
              fontFamily: "'Inter', sans-serif"
            }}>
              {t}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
          <a href="#" className="interactive" style={{ 
            display: 'flex', alignItems: 'center', gap: '0.4rem', 
            padding: '0.6rem 1.2rem', 
            background: '#3d3528', color: '#f5f0eb', 
            borderRadius: '30px', textDecoration: 'none', fontWeight: 500, 
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', cursor: 'none',
            fontSize: '0.8rem', fontFamily: "'Inter', sans-serif"
          }}
             onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(61, 53, 40, 0.2)'; }}
             onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
            <span>Case Study</span>
            <ExternalLink size={12} />
          </a>
          <a href="#" className="interactive" style={{ 
            display: 'flex', alignItems: 'center', gap: '0.4rem', 
            padding: '0.6rem 1.2rem', background: 'transparent', 
            border: '1px solid rgba(61, 53, 40, 0.2)', color: '#3d3528', 
            borderRadius: '30px', textDecoration: 'none', fontWeight: 400, 
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', cursor: 'none',
            fontSize: '0.8rem', fontFamily: "'Inter', sans-serif"
          }}
             onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(61, 53, 40, 0.06)'; }}
             onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}>
            <span>Source</span>
            <Code size={12} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsShowcase() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "-300%" : "-75%"]);

  return (
    <section id="work" ref={targetRef} style={{ height: isMobile ? '600vh' : '400vh', position: 'relative', background: 'transparent' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
        
        <div style={{ paddingLeft: 'clamp(1.5rem, 5vw, 10vw)', marginBottom: 'clamp(1.5rem, 4vw, 4rem)' }}>
          <h2 style={{ 
            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', 
            fontFamily: "'Playfair Display', serif", fontWeight: 400, margin: 0,
            color: '#3d3528', fontStyle: 'italic'
          }}>
            Selected Works
          </h2>
          <p style={{ 
            color: '#6b5e50', fontSize: 'clamp(0.7rem, 2vw, 0.9rem)', marginTop: '0.8rem', 
            letterSpacing: '0.3em', textTransform: 'uppercase',
            fontFamily: "'Inter', sans-serif", fontWeight: 300
          }}>
            A curated collection
          </p>
        </div>

        <motion.div style={{ x, display: 'flex', gap: 'clamp(2rem, 5vw, 5rem)', paddingLeft: 'clamp(1.5rem, 5vw, 10vw)', paddingRight: '10vw' }}>
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        <div style={{ position: 'absolute', bottom: '3rem', left: 'clamp(1.5rem, 5vw, 10vw)', right: 'clamp(1.5rem, 5vw, 10vw)', height: '1px', background: 'rgba(61, 53, 40, 0.1)' }}>
          <motion.div 
            style={{ height: '1px', background: '#c9a87c', width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }} 
          />
        </div>
      </div>
    </section>
  );
}
