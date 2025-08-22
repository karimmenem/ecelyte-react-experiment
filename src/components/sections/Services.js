import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Services = () => {
  const containerRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState(null);
  
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  const cardsData = [
    {
      id: 1,
      title: "IT & AI Solutions",
      backgroundColor: "#2D4A2D",
      textColor: "#FFFFFF",
      tags: ["AI Solutions", "IT Consulting", "Technology Strategy", "Digital Transformation", "System Integration"],
      description: "Encelyte developers are ready to implement visual aesthetics into code, adopting the latest technologies to ensure a cutting-edge result. We'll provide regular updates and make sure the final product not only meets but surpasses your expectations."
    },
    {
      id: 2,
      title: "Strategic Consulting", 
      backgroundColor: "#8B5FBF",
      textColor: "#FFFFFF",
      tags: ["Business Strategy", "Technology Planning", "Process Optimization", "Risk Assessment", "Market Analysis"],
      description: "Encelyte crafts designs that serve as compelling narratives, deeply resonating with a brand's essence. By blending creativity with strategic storytelling, we ensure that every customer interaction is not just visually engaging but also uniquely memorable."
    },
    {
      id: 3,
      title: "Web & App Development",
      backgroundColor: "#D4A574", 
      textColor: "#2D2D2D",
      tags: ["Web Development", "Mobile Apps", "E-commerce", "API Integration", "Cloud Solutions"],
      description: "Encelyte works collaboratively to develop a unified brand voice, ensuring that every message aligns with your brand's tone, values, and objectives. We craft a compelling narrative that deeply resonates with your audience."
    },
    {
      id: 4,
      title: "Regional Market Access",
      backgroundColor: "#A8CCC8",
      textColor: "#2D2D2D", 
      tags: ["Europe Market Entry", "MEA Expansion", "Cross-Regional Strategy"],
      description: "Encelyte enhances your business's visibility through data-driven strategies and measurable results. Our dedicated team stays ahead of the curve, constantly adapting to the latest trends to ensure your brand remains competitive and impactful."
    }
  ];

  useEffect(() => {
    const cardsContainer = cardsContainerRef.current;
    if (!cardsContainer) return;

    const handleWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (isScrollLocked) return;
      
      if (e.deltaY > 0) {
        if (currentCardIndex < cardsData.length - 1) {
          setIsScrollLocked(true);
          setCurrentCardIndex(prev => prev + 1);
          
          if (scrollTimeout) clearTimeout(scrollTimeout);
          
          const timeout = setTimeout(() => {
            setIsScrollLocked(false);
          }, 600);
          setScrollTimeout(timeout);
        }
      } else if (e.deltaY < 0) {
        if (currentCardIndex > 0) {
          setIsScrollLocked(true);
          setCurrentCardIndex(prev => prev - 1);
          
          if (scrollTimeout) clearTimeout(scrollTimeout);
          
          const timeout = setTimeout(() => {
            setIsScrollLocked(false);
          }, 600);
          setScrollTimeout(timeout);
        }
      }
    };

    cardsContainer.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      cardsContainer.removeEventListener('wheel', handleWheel);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [currentCardIndex, isScrollLocked, scrollTimeout, cardsData.length]);

  return (
    <section 
      ref={containerRef}
      style={{
        backgroundColor: '#1a1a1a',
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        textAlign: 'center',
        marginBottom: '4rem'
      }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
        >
          <motion.p style={{
            fontSize: '1.2rem',
            color: '#ffffff',
            opacity: 0.6,
            margin: '0 0 1rem 0',
            fontWeight: 500
          }}>
            Services
          </motion.p>
          <motion.h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 700,
            color: '#ffffff',
            margin: '0 0 4rem 0',
            lineHeight: 1.1
          }}>
            Delivering innovative IT solutions across regional markets
          </motion.h2>
        </motion.div>
      </div>

      <div 
        ref={cardsContainerRef}
        style={{
          position: 'relative',
          width: '90%',
          maxWidth: '900px',
          height: '500px',
          cursor: 'pointer'
        }}
      >
        {cardsData.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ 
              y: index * 20, 
              scale: 1 - (index * 0.05),
              zIndex: cardsData.length - index
            }}
            animate={{ 
              y: index <= currentCardIndex ? 0 : (index - currentCardIndex) * 20,
              scale: index <= currentCardIndex ? 1 : 1 - ((index - currentCardIndex) * 0.05),
              zIndex: index <= currentCardIndex ? cardsData.length + index : cardsData.length - index
            }}
            transition={{ 
              duration: 0.5, 
              ease: [0.25, 0.1, 0.25, 1]
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '100%',
              backgroundColor: card.backgroundColor,
              color: card.textColor,
              borderRadius: '2rem',
              padding: '3rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
            }}
          >
            <h3 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '700',
              marginBottom: '2rem',
              lineHeight: '1.1',
              margin: '0 0 2rem 0'
            }}>
              {card.title}
            </h3>
            
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.8rem',
              marginBottom: '2rem'
            }}>
              {card.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    padding: '0.6rem 1.2rem',
                    borderRadius: '1.5rem',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.6',
              margin: '0',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem'
            }}>
              <span style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                width: '1.8rem',
                height: '1.8rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: '0',
                marginTop: '0.2rem',
                fontSize: '0.9rem'
              }}>
                ✓
              </span>
              {card.description}
            </p>
          </motion.div>
        ))}
      </div>

      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '0.5rem'
      }}>
        {cardsData.map((_, index) => (
          <div
            key={index}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: index <= currentCardIndex ? '#ffffff' : 'rgba(255, 255, 255, 0.3)',
              transition: 'background-color 0.3s ease'
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;