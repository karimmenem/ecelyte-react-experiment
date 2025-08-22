import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.5rem 2rem;
  background-color: ${theme.colors.primary};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 1rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: ${theme.fonts.weights.regular};
  color: ${theme.colors.secondary};
  font-family: ${theme.fonts.primary};
  cursor: pointer;
`;

const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CTAButton = styled.button`
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.primary};
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: ${theme.fonts.weights.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${theme.colors.accent};
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const MenuButton = styled.button`
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.primary};
  border: none;
  padding: 0.8rem 1.2rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: ${theme.fonts.weights.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${theme.colors.accent};
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Nav>
        <Logo>encelyte</Logo>
        
        <HeaderButtons>
          <CTAButton>Let's Build Together!</CTAButton>
          <MenuButton>Menu</MenuButton>
        </HeaderButtons>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;