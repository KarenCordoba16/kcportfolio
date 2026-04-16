// src/pages/Technologies.jsx
// Grid de tecnologías con logos obtenidos desde el backend

import { useState, useEffect } from 'react';
import api from '../utils/api';
import { useReveal } from '../hooks/useReveal';
import { SectionTitle, Loader } from '../components/ui/index.jsx';
import { LuCalendarClock } from "react-icons/lu";

// Datos de respaldo si el backend no responde
const FALLBACK_TECHS = [
  { id: 1,  name: 'React',       logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { id: 2,  name: 'Node.js',     logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { id: 3,  name: 'PostgreSQL',  logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { id: 4,  name: 'JavaScript',  logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { id: 5,  name: 'Python',      logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { id: 6,  name: 'Git',         logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { id: 7,  name: 'Express',     logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  { id: 8,  name: 'MongoDB',     logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { id: 9,  name: 'Tailwind',    logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { id: 10, name: 'Figma',       logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { id: 11, name: 'Vite',        logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
  { id: 12, name: 'Postman',     logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
  { id: 13, name: 'Django',      logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
  { id: 14, name: 'MySQL',       logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
];

function TechCard({ tech }) {
  return (
    <div className="group flex flex-col items-center gap-3 p-6 rounded-2xl
      bg-white dark:bg-slate-800
      border border-slate-200 dark:border-slate-700
      hover:border-blue-300 dark:hover:border-blue-600
      hover:shadow-lg hover:shadow-blue-100 dark:hover:shadow-blue-900/20
      hover:-translate-y-1 transition-all duration-300 cursor-default">

      {/* Logo */}
      <div className="w-14 h-14 flex items-center justify-center
        rounded-xl bg-slate-50 dark:bg-slate-700
        group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30
        transition-colors duration-300 p-2">
        {tech.logo_url ? (
          <img
            src={tech.logo_url}
            alt={tech.name}
            className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
            onError={e => {
              e.target.onerror = null;
              e.target.src = '/fallback-icon.svg';
            }}
          />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40
            flex items-center justify-center">
            <span className="text-blue-600 dark:text-blue-400 font-mono font-bold text-sm">
              {tech.name.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Nombre */}
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300
        group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {tech.name}
      </span>
    </div>
  );
}

export default function Technologies() {
  const [technologies, setTechnologies] = useState([]);
  const [loading,      setLoading]      = useState(true);

  const titleRef = useReveal();
  const gridRef  = useReveal(0.05);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await api.get('/technologies');
        setTechnologies(response.data?.length ? response.data : FALLBACK_TECHS);
      } catch {
        setTechnologies(FALLBACK_TECHS);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-28">

      <div ref={titleRef} className="reveal">
        <SectionTitle
          tag="Technologies"
          title="Tools in my stack"
          subtitle="Technologies I use to build functional and well-structured web applications."
          center
        />
      </div>

      {loading ? (
        <Loader text="Loading stack..." />
      ) : (
        <div ref={gridRef} className="reveal">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 ">
            {technologies.map(tech => (
              <TechCard key={tech.id} tech={tech} />
            ))}
          </div>
        </div>
      )}

      {/* Frase de cierre */}
      <div className="mt-16 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400 font-mono">
          That's all.. for now
        </p>
      </div>
    </div>
  );
}
