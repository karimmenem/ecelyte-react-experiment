import React from 'react';
import styled, { keyframes } from 'styled-components';

const MarqueeContainer = styled.div`
  width: 100vw;
  overflow: hidden;
  position: relative;
  margin-left: 50%;
  transform: translateX(-50%);
`;

const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const MarqueeTrack = styled.div`
  display: flex;
  align-items: center;
  animation: ${scroll} 20s linear infinite;
  width: 200%;
  gap: 4rem;
  
  &:hover {
    animation-play-state: paused;
  }
`;

const TechIcon = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  opacity: 0.7;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: grayscale(0.3);
    transition: filter 0.3s ease;
  }
  
  &:hover img {
    filter: grayscale(0);
  }
`;

const TechMarquee = () => {
  const techIcons = [
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
  ];

  const duplicatedIcons = [...techIcons, ...techIcons];

  return (
    <MarqueeContainer>
      <MarqueeTrack>
        {duplicatedIcons.map((iconUrl, index) => (
          <TechIcon key={index}>
            <img 
              src={iconUrl} 
              alt={`Technology ${index}`}
              loading="lazy"
            />
          </TechIcon>
        ))}
      </MarqueeTrack>
    </MarqueeContainer>
  );
};

export default TechMarquee;