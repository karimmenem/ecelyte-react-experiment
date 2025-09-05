import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import TechMarquee from '../TechMarquee';

const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8rem 2rem 4rem;
  background-color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  width: 100%;
  margin-bottom: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainTitle = styled(motion.h1)`
  font-size: clamp(3.5rem, 7vw, 6rem);
  font-weight: 700;
  line-height: 0.9;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 0 0 2rem 0;
  font-family: ${({ theme }) => theme.fonts.primary};
  letter-spacing: -0.02em;
  text-align: center;
  width: 100%;
  
  @media (max-width: 767px) {
    font-size: clamp(2.2rem, 7vw, 3.5rem);
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.secondary};
  max-width: 700px;
  margin: 0 auto;
  opacity: 0.8;
  text-align: center;
  
  @media (max-width: 767px) {
    font-size: 1rem;
  }
`;

const MarqueeSection = styled.div`
  margin-top: 4rem;
  width: 100%;
`;

const DownArrow = styled(motion.div)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4rem auto 0;
  cursor: pointer;
  
  &::after {
    content: '↓';
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.5rem;
  }
`;

const floatPulse = keyframes`0%{transform:translateY(0) scale(1);} 50%{transform:translateY(-8px) scale(1.04);} 100%{transform:translateY(0) scale(1);}`;
const glow = keyframes`0%{opacity:.35;} 50%{opacity:.75;} 100%{opacity:.35;}`;

const LogoImgHero = styled.img`height:54px; width:auto; display:block; object-fit:contain; filter:drop-shadow(0 6px 16px rgba(0,0,0,.35));`;

const ExpandLogo = styled.div`
  position:relative; margin:0 auto 2.6rem; height:86px; width:86px; border-radius:28px; display:flex; align-items:center; justify-content:center; overflow:hidden; isolation:isolate;
  background:linear-gradient(135deg, ${({ theme }) => theme.colors.secondary} 0%, ${({ theme }) => theme.colors.accent} 95%);
  box-shadow:0 12px 32px -10px rgba(0,0,0,.4), 0 0 0 6px ${({ theme }) => theme.colors.accent}22, inset 0 0 0 1px ${({ theme }) => theme.colors.white}22;
  animation:${floatPulse} 5.5s ease-in-out infinite;
  &:before{content:''; position:absolute; inset:-25%; background:radial-gradient(circle at 50% 60%, ${({ theme }) => theme.colors.accent}55, transparent 70%); filter:blur(30px); z-index:-1; animation:${glow} 6s ease-in-out infinite;}
  &:after{content:''; position:absolute; inset:0; border-radius:inherit; background:linear-gradient(160deg,#ffffffaa,transparent 60%); mix-blend-mode:overlay; opacity:.35;}
`;

const Badge = styled.span`
  flex:0 0 54px; height:54px; width:54px; border-radius:20px; display:flex; align-items:center; justify-content:center; font-size:2.05rem; font-weight:700; letter-spacing:-0.04em; color:${({ theme }) => theme.colors.white}; background:linear-gradient(145deg, ${({ theme }) => theme.colors.secondary} 0%, ${({ theme }) => theme.colors.accent} 100%); box-shadow:0 6px 16px -6px rgba(0,0,0,.45), inset 0 0 0 1px ${({ theme }) => theme.colors.white}22; position:relative; z-index:2;
`;

const WordReveal = styled.div`display:none;`;

const Hero = () => {
  const containerVariants = { hidden:{opacity:0}, visible:{opacity:1, transition:{duration:1, staggerChildren:0.2}} };
  const titleVariants = { hidden:{opacity:0,y:30}, visible:{opacity:1,y:0, transition:{duration:.8, ease:[0.25,0.1,0.25,1]}} };
  return (
    <HeroContainer id="home">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ width:'100%', display:'flex', flexDirection:'column', alignItems:'center' }}>
        <HeroContent>
          <ExpandLogo aria-hidden="true">
            <Badge style={{background:'transparent', boxShadow:'none', flex:'0 0 auto', width:'auto', height:'auto', borderRadius:0, padding:0}}>
              <LogoImgHero src="/logo.png" alt="Encelyte logo" />
            </Badge>
          </ExpandLogo>
          <motion.div variants={titleVariants}>
            <MainTitle>CRAFTING DIGITAL<br />EXCELLENCE<br />WORLDWIDE</MainTitle>
          </motion.div>
          <motion.div variants={titleVariants}>
            <Description>We transform ambitious ideas into powerful digital solutions, serving clients across Europe and the Middle East with cutting-edge technology and strategic innovation.</Description>
          </motion.div>
        </HeroContent>

        <MarqueeSection>
          <TechMarquee />
        </MarqueeSection>

        <DownArrow
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
        />
      </motion.div>
    </HeroContainer>
  );
};

export default Hero;