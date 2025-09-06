import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styled from 'styled-components';
import { useLanguage } from '../../contexts/LanguageContext';

const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.primary};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem;
  position: relative;
  transition: background 0.4s ease, color 0.4s ease;
  
  @media (max-width: 768px) {
    padding: 5rem 1.5rem;
    min-height: 100svh;
  }
  
  @media (max-width: 480px) {
    padding: 4rem 1rem;
  }
`;

const TitleLabel = styled(motion.p)`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textMedium};
  opacity: 0.8;
  margin: 0 0 1rem 0;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: color 0.4s ease;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    letter-spacing: 1.5px;
    margin: 0 0 0.8rem 0;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    letter-spacing: 1px;
  }
`;

const TitleHeading = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 0 0 4rem 0;
  line-height: 1.1;
  transition: color 0.4s ease;
  
  @media (max-width: 768px) {
    font-size: clamp(2rem, 6vw, 3rem);
    margin: 0 0 3rem 0;
    text-align: center;
  }
  
  @media (max-width: 480px) {
    font-size: clamp(1.8rem, 7vw, 2.5rem);
    margin: 0 0 2.5rem 0;
  }
`;

const Card = styled(motion.div)`
  background-color: ${({ theme }) => theme.mode === 'dark' ? theme.colors.secondary : theme.colors.panel};
  color: ${({ theme }) => theme.mode === 'dark' ? theme.colors.primary : theme.colors.secondary};
  border-radius: 2rem;
  padding: 3rem 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  min-height: 120px;
  transition: background 0.4s ease, color 0.4s ease;
  
  @media (max-width: 768px) {
    padding: 2.5rem 2rem;
    border-radius: 1.5rem;
    flex-direction: column;
    text-align: center;
    gap: 1rem;
    min-height: auto;
  }
  
  @media (max-width: 480px) {
    padding: 2rem 1.5rem;
    border-radius: 1rem;
    gap: 0.8rem;
  }
`;

const CardTitle = styled.h3`
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
  color: inherit;
  
  @media (max-width: 768px) {
    font-size: clamp(1.5rem, 4vw, 2rem);
  }
  
  @media (max-width: 480px) {
    font-size: clamp(1.3rem, 5vw, 1.8rem);
  }
`;

const CardSubtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.4rem);
  margin: 0;
  opacity: 0.7;
  text-align: right;
  font-weight: 500;
  color: inherit;
  
  @media (max-width: 768px) {
    text-align: center;
    font-size: clamp(0.9rem, 2.5vw, 1.2rem);
  }
  
  @media (max-width: 480px) {
    font-size: clamp(0.8rem, 3vw, 1rem);
  }
`;

const Recognition = () => {
  const { t } = useLanguage();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [50, 0]);

  const recognitionData = [
    { id: 1, title: t('recognition.items.1.title'), subtitle: t('recognition.items.1.subtitle') },
    { id: 2, title: t('recognition.items.2.title'), subtitle: t('recognition.items.2.subtitle') },
    { id: 3, title: t('recognition.items.3.title'), subtitle: t('recognition.items.3.subtitle') }
  ];

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  return (
    <Section ref={containerRef}>
      <motion.div style={{ opacity, y }} className="header-content">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
          style={{
            maxWidth: '1200px',
            textAlign: 'center',
            marginBottom: '4rem',
          }}
        >
          <TitleLabel variants={titleVariants}>{t('recognition.eyebrow')}</TitleLabel>
          <TitleHeading variants={titleVariants}>
            {t('recognition.title')}
          </TitleHeading>
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
          gap: '2rem',
        }}
        className="cards-container"
      >
        {recognitionData.map((item, index) => (
          <Card
            key={item.id}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
          >
            <CardTitle>{item.title}</CardTitle>
            <CardSubtitle>{item.subtitle}</CardSubtitle>
          </Card>
        ))}
      </motion.div>
    </Section>
  );
};

export default Recognition;
