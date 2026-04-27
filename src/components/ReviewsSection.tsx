'use client';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

const reviews = [
  {
    id: 1,
    name: 'Arav Bhatia',
    role: 'CEO, Saptotree',
    text: 'Tushit delivered an experience that exceeded every expectation. Our conversion rate jumped 40% after the redesign. The attention to motion and detail was extraordinary.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Lokesh Sachdeva',
    role: 'Co-Founder, Metropolis',
    text: 'Working with Tushit felt like collaborating with someone who truly understands the intersection of design and engineering. The 3D elements he built were flawless.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Shefali Chugh',
    role: 'Creative Director',
    text: 'The website Tushit built for us became a talking point in our industry. Clients constantly ask who built it. Premium quality through and through.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Jagdish',
    role: 'CEO, Lovely',
    text: 'Fast, communicative, and incredibly talented. Tushit turned our vague brief into something that felt like a cinematic experience. Highly recommend.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Reshma Kumar',
    role: 'Startup Founder',
    text: 'We needed a developer who could handle complex animations without sacrificing performance. Tushit nailed it. Smooth 60fps across every device.',
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < count ? '#c9a87c' : 'none'} stroke="#c9a87c" strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: typeof reviews[0], index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="interactive"
      style={{
        background: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        border: '1px solid rgba(255,255,255,0.7)',
        borderRadius: '20px',
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        cursor: 'none',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: hovered 
          ? '0 20px 50px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.06)' 
          : '0 4px 20px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
      }}
    >
      {/* Quote mark */}
      <div style={{
        fontSize: '3rem',
        fontFamily: "'Playfair Display', serif",
        fontStyle: 'italic',
        color: 'rgba(201, 168, 124, 0.3)',
        lineHeight: 1,
        marginBottom: '0.5rem',
      }}>
        &ldquo;
      </div>

      <p style={{
        color: '#5a5045',
        fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)',
        lineHeight: 1.7,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 300,
        marginBottom: '1.5rem',
        fontStyle: 'italic',
      }}>
        {review.text}
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '0.8rem' }}>
        <div>
          <div style={{
            fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 600,
            color: '#3d3528',
            marginBottom: '0.25rem',
          }}>
            {review.name}
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: '#a09080',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            letterSpacing: '0.1em',
          }}>
            {review.role}
          </div>
        </div>
        <StarRating count={review.rating} />
      </div>
    </motion.div>
  );
}

export default function ReviewsSection() {
  return (
    <section id="reviews" style={{ padding: 'clamp(4rem, 10vw, 8rem) 0', position: 'relative', background: 'transparent' }}>
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 5rem)' }}
        >
          <p style={{
            color: '#a09080', fontSize: '0.8rem', letterSpacing: '0.4em', textTransform: 'uppercase',
            fontFamily: "'Inter', sans-serif", fontWeight: 300, marginBottom: '1.5rem'
          }}>
            Testimonials
          </p>
          <h2 style={{
            fontSize: 'clamp(2.2rem, 6vw, 3.5rem)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
            color: '#3d3528',
            fontStyle: 'italic',
            lineHeight: 1.2,
          }}>
            Satisfied Clients
          </h2>
        </motion.div>

        {/* Reviews grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: 'clamp(1.2rem, 3vw, 2rem)',
        }}>
          {reviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
