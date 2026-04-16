// src/pages/About.jsx
// Sección "Sobre mí" con descripción y habilidades

import { useReveal } from '../hooks/useReveal';
import { SectionTitle } from '../components/ui/index.jsx';
import { FaMapPin, FaBriefcase, FaGraduationCap, FaGlobe } from "react-icons/fa";


const SKILLS = [
  { category: 'Frontend', items: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Python', 'Django', 'REST APIs'] },
  { category: 'Databases', items: ['MySQL', 'MongoDB', 'PostgreSQL'] },
  { category: 'Tools', items: ['Git', 'Figma', 'Postman'] },
];

const TIMELINE = [
  {
    year: '2025 — Present',
    title: 'Full Stack Developer',
    desc: 'Development of full stack web applications using React on the frontend and JavaScript on the backend. Focused on practical projects and continuous improvement.',
  },
  {
    year: '2025',
    title: 'Collaborative Project (Nextalent)',
    desc: 'Development of a web platform as part of a team to connect young professionals with companies through internship opportunities.',
  },
  {
    year: '2024',
    title: 'Web Development Training',
    desc: 'Learning JavaScript, React, and the fundamentals of frontend and backend development.',
  },
  {
    year: '2023',
    title: 'Collaborative Project (DentCorp)',
    desc: 'Team development of a platform for scheduling appointments for a dental clinic.',
  },
  {
    year: '2023',
    title: 'Systems Analyst',
    desc: 'Completion of academic training focused on understanding systems, logic, and problem-solving.',
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
          tag="About me"
          title="Developer passionate about technology"
          subtitle="I build full stack web applications focused on functionality, clarity, and user experience."
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-16">

        {/* ── Bio + objetivo ────────────────────────────────── */}
        <div ref={bioRef} className="reveal flex flex-col gap-6">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              I'm a Full Stack Developer focused on building functional, clear, and well-structured web applications. I enjoy creating practical solutions that solve real-world problems.
            </p>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
              I primarily work with JavaScript and React on the frontend, and Python with Django on the backend, developing complete applications from concept to implementation.
            </p>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
              I am continuously learning, strengthening my technical skills and improving my ability to build high-quality software.
            </p>
          </div>

          {/* Objetivo profesional */}
          <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/20
            border border-blue-200 dark:border-blue-700">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🎯</span>
                <h3 className="font-semibold text-slate-900 dark:text-white">Objective</h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  I am looking to join a development team where I can continue growing as a developer, contribute with practical solutions, and gain experience in real-world environments.
                </p>
            </div>
          </div>

          {/* Datos rápidos */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <FaMapPin color='red'/>, label: 'Location', value: 'Argentina' },
              { icon: <FaBriefcase  color='brown'/>, label: 'Availability', value: 'Remote / Hybrid' },
              { icon: <FaGraduationCap color='black' />, label: 'Education', value: 'Systems Analyst' },
              { icon: <FaGlobe color='gray'/>, label: 'Languages', value: 'Spanish, English' },
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
            Career
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
          Technologies I work with
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
