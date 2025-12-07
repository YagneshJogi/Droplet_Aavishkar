// src/components/Notification.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const NotificationContainer = styled.div`
  position: fixed;
  bottom: 22px;
  right: 22px;
  z-index: 1400;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NotificationItem = styled.div`
  min-width: 260px;
  background: ${({ theme, type }) => type === 'success' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.10)'};
  color: ${({type}) => type === 'success' ? '#063b2f' : '#6b1b1b'};
  backdrop-filter: blur(8px) saturate(110%);
  border: 1px solid ${({type}) => type === 'success' ? 'rgba(16,185,129,0.16)' : 'rgba(239,68,68,0.16)'};
  padding: 12px 16px;
  border-radius: 12px;
  box-shadow: 0 10px 28px rgba(2,6,23,0.28);
  display:flex;
  gap: 12px;
  align-items:center;
  animation: slideIn 260ms ease;
  font-weight: 700;
  font-size: 0.95rem;

  @keyframes slideIn {
    from { transform: translateY(10px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

const Icon = styled.span`
  width: 28px;
  height: 28px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  border-radius: 8px;
  background: rgba(255,255,255,0.06);
  font-weight: 700;
`;

const Message = styled.span`
  flex: 1;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Notification = ({ message, type = 'success', duration = 3200, onClose }) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => { setVisible(false); onClose?.(); }, duration);
    return () => clearTimeout(t);
  }, [duration, onClose]);

  if (!visible) return null;
  return (
    <NotificationItem type={type}>
      <Icon>{type === 'success' ? '✓' : '!'}</Icon>
      <Message>{message}</Message>
    </NotificationItem>
  );
};

export const NotificationManager = ({ notifications = [], onRemove = () => {} }) => (
  <NotificationContainer>
    {notifications.map((n, i) => (
      <Notification
        key={i}
        message={n.message}
        type={n.type}
        onClose={() => onRemove(i)}
      />
    ))}
  </NotificationContainer>
);

export default Notification;
