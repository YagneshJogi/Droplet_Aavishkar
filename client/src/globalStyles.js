// src/globalStyles.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    height: 100%;
  }

  /* html is just a dark fallback now */
  html {
    background-color: #020617;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Open Sans', sans-serif;
    line-height: 1.5;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    padding-bottom: 80px; /* extra space for mobile browser bar */

    color: ${({ theme }) => theme.colors.text.primary};
    background: transparent;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    position: relative;
  }

  /* Ocean background layer */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url('/ocean-bg.jpg');
    background-size: cover;
    background-position: center top;
    background-repeat: no-repeat;
    z-index: -2;
    pointer-events: none;
  }

  /* Dark overlay layer */
  body::after {
    content: '';
    position: fixed;
    inset: 0;
    background:
      radial-gradient(circle at top left, rgba(15,23,42,0.4), transparent 55%),
      linear-gradient(180deg, rgba(15,23,42,0.45), rgba(15,23,42,0.25));
    z-index: -1;
    pointer-events: none;
  }

  #root {
    position: relative;
    z-index: 1;
    isolation: isolate;
  }

  h1, h2, h3, h4, h5, h6 {
    line-height: 1.15;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255,255,255,0.02);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.14);
    border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255,255,255,0.20);
  }

  /* Inputs & dropdowns must stay black text on white bg */
  input,
  textarea,
  select {
    color: #000 !important;
    background: #ffffff !important;
  }

  input::placeholder,
  textarea::placeholder {
    color: #555 !important;
  }

  option {
    color: #000 !important;
    background: #ffffff !important;
  }

  .history select,
  .history option {
    color: #000 !important;
    background: #ffffff !important;
  }

  /* Remove hover transforms/shadows globally (but not color) */
  *:hover {
    filter: none !important;
    transform: none !important;
    box-shadow: none !important;
  }

  /* Keep inputs solid & readable on focus / hover */
  input:hover,
  input:focus,
  textarea:hover,
  textarea:focus,
  select:hover,
  select:focus {
    background: #ffffff !important;
    color: #000 !important;
    box-shadow: none !important;
    outline: none !important;
  }

  /* Mobile tweaks */
  @media (max-width: 768px) {
    body {
      padding-bottom: 120px;
    }

    main, section, .container {
      padding-left: 12px !important;
      padding-right: 12px !important;
    }

    .card,
    .glass,
    [class*="Card"],
    [class*="Section"] {
      border-radius: 16px !important;
      padding: 14px !important;
    }

    button {
      width: auto;
      min-height: 42px;
      font-size: 0.9rem;
    }

    .btn-row,
    .button-row,
    [class*="ButtonRow"] {
      flex-direction: column !important;
      gap: 8px !important;
      align-items: stretch !important;
    }

    h1 { font-size: 1.4rem !important; }
    h2 { font-size: 1.2rem !important; }
    h3 { font-size: 1.05rem !important; }

    p, span, li {
      font-size: 0.9rem !important;
      line-height: 1.4;
    }

    nav {
      position: sticky !important;
      top: 0;
      z-index: 999;
    }
  }
`;
