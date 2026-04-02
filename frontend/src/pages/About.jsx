// src/pages/About.jsx
// Sección "Sobre mí" con descripción y habilidades

import { useReveal } from '../hooks/useReveal';
import { SectionTitle } from '../components/ui/index.jsx';

const SKILLS = [
  { category: 'Frontend',   items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'] },
  { category: 'Backend',    items: ['Node.js', 'Express', 'Python', 'REST APIs'] },
  { category: 'Base de datos', items: ['PostgreSQL', 'MongoDB', 'Redis', 'SQL'] },
  { category: 'DevOps & Sec',  items: ['Docker', 'Linux', 'Git', 'Pentesting básico'] },
];

const TIMELINE = [
  {
    year: '2024 — presente',
    title: 'Full Stack Developer',
    desc: 'Desarrollo de aplicaciones web completas. Implementación de arquitecturas seguras y escalables.',
  },
  {
    year: '2023',
    title: 'Seguridad Informática',
    desc: 'Formación en ciberseguridad: análisis de vulnerabilidades, redes y seguridad en aplicaciones web.',
  },
  {
    year: '2022',
    title: 'Desarrollo Backend',
    desc: 'Especialización en Node.js, APIs REST, bases de datos relacionales y no relacionales.',
  },
  {
    year: '2021',
    title: 'Inicio en programación',
    desc: 'Primeros pasos con JavaScript, HTML/CSS y los fundamentos del desarrollo web.',
  },
];

function SkillCategory({ category, items }) {
  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-800
      border border-slate-200 dark:border-slate-700
      hover:border-blue-300 dark:hover:border-blue-600
      hover:shadow-md transition-all duration-300">
      <h3 className="text-sm font-mono font-semibold text-blue-600 dark:text-blue-400 mb-3 tracking-wide uppercase">
        {category}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map(item => (
          <span key={item}
            className="px-3 py-1 rounded-lg text-xs font-medium
              bg-slate-50 dark:bg-slate-700
              text-slate-700 dark:text-slate-300
              border border-slate-200 dark:border-slate-600">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  const titleRef    = useReveal();
  const bioRef      = useReveal();
  const skillsRef   = useReveal();
  const timelineRef = useReveal();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-28">

      <div ref={titleRef} className="reveal">
        <SectionTitle
          tag="Sobre mí"
          title="Desarrollador apasionado por la tecnología y la seguridad"
          subtitle="Combino el desarrollo Full Stack con el pensamiento de seguridad para construir aplicaciones robustas."
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-16">

        {/* ── Bio + objetivo ────────────────────────────────── */}
        <div ref={bioRef} className="reveal flex flex-col gap-6">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              Soy un desarrollador Full Stack con pasión por crear soluciones digitales que
              no solo funcionen perfectamente, sino que también sean seguras desde su diseño.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
              Mi enfoque integra las mejores prácticas de desarrollo con un pensamiento orientado
              a la seguridad informática. Cada línea de código que escribo contempla posibles
              vectores de ataque y cómo mitigarlos.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
              Actualmente enfocado en el ecosistema JavaScript (React + Node.js), bases de datos
              relacionales con PostgreSQL, y en ampliar mis conocimientos en ciberseguridad ofensiva
              y defensiva.
            </p>
          </div>

          {/* Objetivo profesional */}
          <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/20
            border border-blue-200 dark:border-blue-700">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🎯</span>
              <h3 className="font-semibold text-slate-900 dark:text-white">Objetivo profesional</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Integrarme a un equipo de desarrollo donde pueda aportar valor construyendo
              aplicaciones seguras y de alta calidad, mientras continúo creciendo en el área
              de seguridad informática aplicada al desarrollo.
            </p>
          </div>

          {/* Datos rápidos */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '📍', label: 'Ubicación',   value: 'Argentina' },
              { icon: '💼', label: 'Disponible',  value: 'Remoto / Híbrido' },
              { icon: '🎓', label: 'Formación',   value: 'Autodidacta + cursos' },
              { icon: '🌐', label: 'Idiomas',     value: 'Español, Inglés' },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-start gap-3 p-4 rounded-xl
                bg-white dark:bg-slate-800
                border border-slate-200 dark:border-slate-700">
                <span className="text-xl mt-0.5">{icon}</span>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Timeline ──────────────────────────────────────── */}
        <div ref={timelineRef} className="reveal">
          <h3 className="text-sm font-mono font-semibold text-blue-600 dark:text-blue-400
            mb-6 tracking-widest uppercase">
            Trayectoria
          </h3>
          <div className="relative flex flex-col gap-0">
            {/* Línea vertical */}
            <div className="absolute left-4 top-4 bottom-4 w-px bg-slate-200 dark:bg-slate-700" />

            {TIMELINE.map((item, idx) => (
              <div key={idx} className="relative flex gap-6 pb-8 last:pb-0">
                {/* Punto en la línea */}
                <div className="relative z-10 w-8 h-8 rounded-full bg-blue-600
                  flex items-center justify-center shrink-0 shadow-md shadow-blue-600/30">
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                </div>
                <div className="flex flex-col gap-1 pb-2">
                  <span className="text-xs font-mono text-blue-600 dark:text-blue-400">{item.year}</span>
                  <h4 className="font-semibold text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Skills grid ───────────────────────────────────────── */}
      <div ref={skillsRef} className="reveal mt-16">
        <h3 className="text-sm font-mono font-semibold text-blue-600 dark:text-blue-400
          mb-6 tracking-widest uppercase">
          Tecnologías que manejo
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILLS.map(skill => (
            <SkillCategory key={skill.category} {...skill} />
          ))}
        </div>
      </div>
    </div>
  );
}
