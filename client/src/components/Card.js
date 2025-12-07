// src/components/Card.js
import styled from 'styled-components';

export const Card = styled.div`
  background: ${({theme}) => theme.ui.glassBg};
  border-radius: ${({theme}) => theme.borderRadius.lg};
  padding: 18px;
  box-shadow: ${({theme}) => theme.ui.cardShadow};
  border: 1px solid ${({theme}) => theme.ui.cardBorder};
  backdrop-filter: blur(${({theme}) => theme.ui.blur}) saturate(120%);
  -webkit-backdrop-filter: blur(${({theme}) => theme.ui.blur});
  transition: transform 200ms ease, box-shadow 220ms ease;
  will-change: transform;
  position: relative;
  color: ${({theme}) => theme.colors.text.secondary};

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 48px rgba(2,6,23,0.36);
  }
`;

/* Common small components to keep usage consistent */
export const CardTitle = styled.h3`
  color: ${({theme}) => theme.colors.text.primary};
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0 0 10px 0;
  text-align: center;
`;

export const CardContent = styled.div`
  color: ${({theme}) => theme.colors.text.secondary};
`;

export const ValueDisplay = styled.div`
  font-size: 1.75rem;
  font-weight: 800;
  color: ${({theme}) => theme.colors.text.primary};
  text-align: center;
  margin: 12px 0;
`;

export const Unit = styled.span`
  font-size: 0.95rem;
  color: ${({theme}) => theme.colors.text.secondary};
  margin-left: 6px;
`;
