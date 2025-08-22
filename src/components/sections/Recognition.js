import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { theme } from '../../styles/theme';

const Recognition = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [50, 0]);

  const recognitionData = [
    {
      id: 1,
      title: "Regional Excellence",
      subtitle: "Leading IT Consulting Firm - Cyprus",
      backgroundColor: "#1a1a1a"
    },
    {
      id: 2,
      title: "Client Success",
      subtitle: "95% Client Satisfaction Rate",
      backgroundColor: "#1a1a1a"
    },
    {
      id: 3,
      title: "Technology Leadership",
      subtitle: "AI Solutions Expert",
      backgroundColor: "#1a1a1a"
    }
  ];

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.25, 0.1, 0.25, 1]
      }
    })
  };

  return (
    <section 
      ref={containerRef}
      style={{
        backgroundColor: `${theme.colors.primary}`,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 2rem',
        position: 'relative'
      }}
    >
      <motion.div
        style={{ opacity, y }}
        className="header-content"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
          style={{
            maxWidth: '1200px',
            textAlign: 'center',
            marginBottom: '4rem'
          }}
        >
          <motion.p style={{
            fontSize: '1.2rem',
            color: '#666666',
            opacity: 0.8,
            margin: '0 0 1rem 0',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            Recognition
          </motion.p>
          <motion.h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 700,
            color: '#1a1a1a',
            margin: '0 0 4rem 0',
            lineHeight: 1.1
          }}>
            Trusted technology partner across Europe and MEA regions
          </motion.h2>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ 
          opacity, 
          y,
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}
      >
        {recognitionData.map((item, index) => (
          <motion.div
            key={item.id}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            style={{
              backgroundColor: item.backgroundColor,
              borderRadius: '2rem',
              padding: '3rem 4rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              color: item.backgroundColor === '#2D4A2D' ? '#ffffff' : '#ffffff',
              minHeight: '120px'
            }}
          >
            <h3 style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: '700',
              margin: 0,
              lineHeight: 1.2
            }}>
              {item.title}
            </h3>
            
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.4rem)',
              margin: 0,
              opacity: 0.7,
              textAlign: 'right',
              fontWeight: 500
            }}>
              {item.subtitle}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Recognition;
