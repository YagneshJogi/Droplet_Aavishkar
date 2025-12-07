// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { theme } from './theme';
import { GlobalStyle } from './globalStyles';

import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import About from './pages/About';
import BOD from './pages/BOD';
import TestInput from './pages/TestInput';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {/* ⚠️ IMPORTANT: NO BrowserRouter HERE */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/about" element={<About />} />
        <Route path="/bod" element={<BOD />} />
        <Route path="/test-input" element={<TestInput />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
