// src/components/Navbar.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const NavBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 120;
  backdrop-filter: blur(8px) saturate(120%);
  background: rgba(15, 23, 42, 0.75);
  border-bottom: 1px solid rgba(15, 23, 42, 0.85);
  box-shadow: 0 4px 18px rgba(2,6,23,0.4);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 16px;
  display:flex;
  align-items:center;
  justify-content:space-between;
`;

const Brand = styled.div`
  font-weight: 800;
  color: ${({theme}) => theme.colors.primary};
  font-size: 1.5rem;
`;

/* desktop nav */
const NavList = styled.nav`
  display:flex;
  align-items:center;
  gap: 18px;

  @media (max-width: 768px) {
    display:none;
  }
`;

const StyledLink = styled(NavLink)`
  position: relative;
  padding: 8px 12px;
  color: ${({theme}) => theme.colors.text.secondary};
  font-weight: 700;
  border-radius: 8px;

  &.active {
    color: ${({theme}) => theme.colors.primary};
  }

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -6px;
    height: 3px;
    width: 0;
    background: ${({theme}) => theme.ui.accent};
    border-radius: 999px;
    box-shadow: 0 6px 18px rgba(37,99,235,0.22);
    transition: width 220ms ease;
  }

  &.active::after { width: 56px; }
`;

/* mobile hamburger button */
const MenuButton = styled.button`
  display:none;

  @media (max-width: 768px) {
    display:inline-flex;
    align-items:center;
    justify-content:center;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid rgba(148,163,184,0.6);
    background: rgba(15,23,42,0.9);
    color: ${({theme}) => theme.colors.text.primary};
    font-weight:700;
    cursor:pointer;
  }
`;

const MenuIcon = styled.span`
  display:block;
  width: 18px;
  height: 2px;
  background: ${({theme}) => theme.colors.text.primary};
  position: relative;

  &::before,
  &::after {
    content:'';
    position:absolute;
    left:0;
    width:100%;
    height:2px;
    background: inherit;
  }

  &::before { top:-5px; }
  &::after { top:5px; }
`;

/* mobile dropdown */
const MobileMenu = styled.nav`
  display:none;

  @media (max-width: 768px) {
    display:flex;
    flex-direction:column;
    padding: 8px 16px 14px;
    gap: 6px;
    background: rgba(15,23,42,0.96);
    border-top: 1px solid rgba(30,64,175,0.45);
  }
`;

const MobileLink = styled(NavLink)`
  padding: 8px 10px;
  border-radius: 10px;
  font-weight: 600;
  color: ${({theme}) => theme.colors.text.secondary};
  background: rgba(15,23,42,0.9);

  &.active {
    background: linear-gradient(180deg,#3b82f6,#2563eb);
    color: #fff;
  }
`;

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <NavBar>
      <Container>
        <Brand>Droplet</Brand>

        {/* Desktop nav */}
        <NavList>
          <StyledLink to="/" end>Dashboard</StyledLink>
          <StyledLink to="/history">History</StyledLink>
          <StyledLink to="/bod">BOD</StyledLink>
          <StyledLink to="/about">About</StyledLink>
        </NavList>

        {/* Mobile hamburger */}
        <MenuButton onClick={() => setOpen(o => !o)}>
          <MenuIcon />
        </MenuButton>
      </Container>

      {/* Mobile dropdown - only when open */}
      {open && (
        <MobileMenu>
          <MobileLink to="/" end onClick={closeMenu}>Dashboard</MobileLink>
          <MobileLink to="/history" onClick={closeMenu}>History</MobileLink>
          <MobileLink to="/bod" onClick={closeMenu}>BOD</MobileLink>
          <MobileLink to="/about" onClick={closeMenu}>About</MobileLink>
        </MobileMenu>
      )}
    </NavBar>
  );
};

export default Navbar;
