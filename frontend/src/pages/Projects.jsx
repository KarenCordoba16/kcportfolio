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
            title: 'Nextalent',
            description: 'Web platform developed in a team to connect young professionals with companies through internship opportunities. Focused on usability and real-world application.',
            image_url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
            // project_url: '#',
            github_url: 'https://github.com/Fran1107/NexTalent-Front',
            technologies: [
              { id: 1, name: 'React',      logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
              { id: 2, name: 'Node.js',    logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
              { id: 3, name: 'MongoDB', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
            ],
          },
          {
            id: 2,
            title: 'Dentcorp',
            description: 'Web application developed in a team for managing dental appointments, allowing users to schedule and organize visits efficiently.',
            image_url: 'https://media.istockphoto.com/id/2214939121/photo/business-team-analyzing-financial-data-on-digital-tablets-during-a-meeting.jpg?s=1024x1024&w=is&k=20&c=U1kt5uKz7Wdq4dDDnYFW0nH5dLtmHvzQNEYg0RJPqeI=',
            // project_url: '#',
            github_url: 'https://github.com/GastonCamu/DentCorp',
            technologies: [
              { id: 4, name: 'Python', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
              { id: 5, name: 'JavaScript',  logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
              { id: 6, name:'MySQL',   logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
            ],
          },
          {
            id: 3,
            title: 'Study App',
            description: 'Personal project in development focused on organizing study materials, creating summaries, and improving information accessibility.',
            image_url: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&q=80',
            // project_url: '#',
            github_url: 'https://github.com/KarenCordoba16/',
            technologies: [
              { id: 2, name: 'Node.js',    logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
              { id: 6, name: 'PostgreSQL', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
              { id: 4, name: 'Python',     logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
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
          tag="Projects"
          title="Building my projects"
          subtitle="A selection of personal and professional projects that showcase my experience in full-stack development."
        />
      </div>

      {/* Aviso de backend desconectado */}
      {/* {error && (
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
      )} */}

      {loading ? (
        <Loader text="Loading projects..." />
      ) : (
        <div ref={gridRef} className="reveal">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {projects.length === 0 && !error && (
            <div className="text-center py-20 text-slate-500 dark:text-slate-400">
              <p className="text-lg">No projects available jet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
