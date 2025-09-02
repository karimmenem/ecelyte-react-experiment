import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styled from 'styled-components';

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
`;

const TitleHeading = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 0 0 4rem 0;
  line-height: 1.1;
  transition: color 0.4s ease;
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
`;

const CardTitle = styled.h3`
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
  color: inherit;
`;

const CardSubtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.4rem);
  margin: 0;
  opacity: 0.7;
  text-align: right;
  font-weight: 500;
  color: inherit;
`;

const Recognition = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [50, 0]);

  const recognitionData = [
    { id: 1, title: 'Regional Excellence', subtitle: 'Leading IT Consulting Firm - Cyprus' },
    { id: 2, title: 'Client Success', subtitle: '95% Client Satisfaction Rate' },
    { id: 3, title: 'Technology Leadership', subtitle: 'AI Solutions Expert' }
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
          <TitleLabel variants={titleVariants}>Recognition</TitleLabel>
          <TitleHeading variants={titleVariants}>
            Trusted technology partner across Europe and MEA regions
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
