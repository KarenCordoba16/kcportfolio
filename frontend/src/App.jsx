// src/App.jsx
// Componente raíz — configura el router y el tema global

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Technologies from './pages/Technologies';
import Contact from './pages/Contact';

function App() {
  // Persistir preferencia de tema en localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(d => !d)} />
        <main>
          <Routes>
            <Route path="/"             element={<Home />} />
            <Route path="/about"        element={<About />} />
            <Route path="/projects"     element={<Projects />} />
            <Route path="/technologies" element={<Technologies />} />
            <Route path="/contact"      element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
