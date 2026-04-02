// src/pages/Projects.jsx
// Sección de proyectos — consume el API backend

import { useState, useEffect } from 'react';
import api from '../utils/api';
import { useReveal } from '../hooks/useReveal';
import { SectionTitle, Loader, ErrorMessage } from '../components/ui/index.jsx';
import ProjectCard from '../components/ui/ProjectCard';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  const titleRef = useReveal();
  const gridRef  = useReveal(0.05);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/projects');
        setProjects(response.data || []);
      } catch (err) {
        setError(err.message);
        // Datos de ejemplo para cuando el backend no está disponible
        setProjects([
          {
            id: 1,
            title: 'E-Commerce Full Stack',
            description: 'Plataforma de comercio electrónico con autenticación JWT, carrito de compras y pasarela de pagos Stripe. Arquitectura de microservicios con Docker.',
            image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
            project_url: '#',
            github_url: '#',
            technologies: [
              { id: 1, name: 'React',      logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
              { id: 2, name: 'Node.js',    logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
              { id: 3, name: 'PostgreSQL', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
            ],
          },
          {
            id: 2,
            title: 'Sistema de Monitoreo de Red',
            description: 'Dashboard en tiempo real para monitoreo de infraestructura. Detecta intrusiones y analiza tráfico con alertas automáticas.',
            image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
            project_url: '#',
            github_url: '#',
            technologies: [
              { id: 4, name: 'Python', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
              { id: 5, name: 'Linux',  logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
              { id: 6, name: 'Docker', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
            ],
          },
          {
            id: 3,
            title: 'API REST con Auth',
            description: 'API RESTful completa con JWT, roles, rate limiting, documentación Swagger y tests con Jest. Desplegada con CI/CD en AWS.',
            image_url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
            project_url: '#',
            github_url: '#',
            technologies: [
              { id: 2, name: 'Node.js',    logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
              { id: 3, name: 'PostgreSQL', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
              { id: 6, name: 'Docker',     logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
            ],
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-28">

      <div ref={titleRef} className="reveal">
        <SectionTitle
          tag="Proyectos"
          title="Lo que he construido"
          subtitle="Una selección de proyectos personales y profesionales que muestran mi experiencia en desarrollo Full Stack y seguridad."
        />
      </div>

      {/* Aviso de backend desconectado */}
      {error && (
        <div className="mb-8">
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20
            border border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-400 text-sm flex gap-3">
            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Backend no disponible. Mostrando datos de ejemplo. Conecta el servidor para ver proyectos reales.</span>
          </div>
        </div>
      )}

      {loading ? (
        <Loader text="Cargando proyectos..." />
      ) : (
        <div ref={gridRef} className="reveal">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {projects.length === 0 && !error && (
            <div className="text-center py-20 text-slate-500 dark:text-slate-400">
              <p className="text-lg">No hay proyectos disponibles aún.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
