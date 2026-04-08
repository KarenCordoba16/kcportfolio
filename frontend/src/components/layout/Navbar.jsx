// src/components/layout/Navbar.jsx
// Barra de navegación responsive con toggle de tema

import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaLaptopCode } from "react-icons/fa";

const NAV_LINKS = [
  { to: '/',             label: 'Home' },
  { to: '/about',        label: 'About' },
  { to: '/projects',     label: 'Projects' },
  { to: '/technologies', label: 'Technologies' },
  { to: '/contact',      label: 'Contact' },
];

// Icono SVG: sol
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
  </svg>
);

// Icono SVG: luna
const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const location = useLocation();

  // Cerrar menú al cambiar de ruta
  useEffect(() => { setMenuOpen(false); }, [location]);

  // Sombra al hacer scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const linkClass = ({ isActive }) =>
    `relative text-sm font-medium transition-colors duration-200
    after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full
    after:origin-left after:scale-x-0 after:bg-blue-600 after:transition-transform after:duration-200
    hover:text-blue-600 dark:hover:text-blue-400
    hover:after:scale-x-100
    ${isActive
      ? 'text-blue-600 dark:text-blue-400 after:scale-x-100'
      : 'text-slate-700 dark:text-slate-300'
    }`;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${scrolled
        ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-slate-200/50 dark:border-slate-700/50'
        : 'bg-transparent'
      }`}>
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo / Brand */}
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center
              group-hover:scale-105 transition-transform duration-200">
              <span className="text-white font-mono font-bold text-xl">
                <FaLaptopCode />
              </span>
            </div>
            <span className="font-semibold text-slate-900 dark:text-white tracking-tight">
              Karen<span className="text-blue-600">Cordoba</span>
            </span>
          </NavLink>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === '/'}>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-3">
            {/* Toggle tema */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400
                hover:bg-slate-100 dark:hover:bg-slate-800
                hover:text-blue-600 dark:hover:text-blue-400
                transition-all duration-200"
              aria-label="Cambiar tema"
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Hamburger — mobile */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400
                hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Abrir menú"
            >
              <div className="w-5 flex flex-col gap-1.5">
                <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden
          ${menuOpen ? 'max-h-80 pb-4' : 'max-h-0'}`}>
          <div className="flex flex-col gap-1 pt-2 border-t border-slate-200 dark:border-slate-700">
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200
                  ${isActive
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
