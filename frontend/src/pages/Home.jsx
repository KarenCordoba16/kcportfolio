// src/pages/Home.jsx
// Página de inicio — Hero section

import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import { FaReact, FaJs, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiMongodb, SiTailwindcss } from "react-icons/si";

// Código decorativo animado
const CodeSnippet = () => (
  <div className="font-mono text-sm leading-7 select-none">
    <div><span className="text-blue-400">const</span> <span className="text-cyan-300">developer</span> <span className="text-white">=</span> {'{'}</div>
    <div className="pl-4"><span className="text-green-400">name</span><span className="text-white">:</span> <span className="text-amber-300">Karen Cordoba</span><span className="text-white">,</span></div>
    <div className="pl-4"><span className="text-green-400">role</span><span className="text-white">:</span> <span className="text-amber-300">'Full Stack Developer'</span><span className="text-white">,</span></div>
    <div className="pl-4"><span className="text-green-400">stack</span><span className="text-white">: [</span><span className="text-amber-300">'React'</span><span className="text-white">, </span><span className="text-amber-300">'Node.js'</span><span className="text-white">, </span><span className="text-amber-300">'PostgreSQL'</span><span className="text-white">],</span></div>
    <div className="pl-4"><span className="text-green-400">passion</span><span className="text-white">:</span> <span className="text-amber-300">'Dev'</span><span className="text-white">,</span></div>
    <div className="pl-4"><span className="text-green-400">available</span><span className="text-white">:</span> <span className="text-blue-300">true</span></div>
    <div>{'}'}<span className="text-white">;</span></div>
  </div>
);

// Stat destacado
function Stat({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-1 px-6 py-4
      rounded-2xl bg-white dark:bg-slate-800
      border border-slate-200 dark:border-slate-700
      shadow-sm">
      <span className="text-2xl font-bold text-blue-600">{value}</span>
      <span className="text-xs text-slate-500 dark:text-slate-400 text-center leading-tight">{label}</span>
    </div>
  );
}

export default function Home() {
  const heroRef  = useReveal(0.1);
  const codeRef  = useReveal(0.1);
  const statsRef = useReveal(0.15);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* Fondo con patrón de grid */}
      <div className="pointer-events-none" />

      {/* Burbuja de color de fondo */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/5
        rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-blue-400/10 dark:bg-blue-400/5
        rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Texto ──────────────────────────────────────────── */}
          <div ref={heroRef} className="reveal flex flex-col gap-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full
              bg-blue-50 dark:bg-blue-900/30
              border border-blue-200 dark:border-blue-700">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-slow" />
              <span className="text-xs font-mono font-medium text-blue-700 dark:text-blue-300">
                Available for projects
              </span>
            </div>

            {/* Heading */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 dark:text-white">
                Hi, I'm 
                <br />
                <span className="gradient-text">Karen</span>
              </h1>
              <p className="mt-3 text-xl font-semibold text-blue-600 dark:text-blue-400 font-mono">
                Full Stack Developer 
              </p>
              <p className="mt-3 text-l font-extralight text-blue-600 dark:text-blue-400 font-mono">
                System Analyst  
              </p>              
            </div>

            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
              I develop full-stack web applications using JavaScript, with React for the front end and building efficient APIs on the back end. I focus on creating functional, clear, and well-structured solutions.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white
                  bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/30
                  transition-all duration-200 active:scale-95"
              >
                View projects
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium
                  border-2 border-slate-300 dark:border-slate-600
                  text-slate-700 dark:text-slate-300
                  hover:border-blue-600 hover:text-blue-600
                  dark:hover:border-blue-400 dark:hover:text-blue-400
                  transition-all duration-200"
              >
                Contact me
              </Link>
            </div>
          </div>

          {/* ── Editor de código decorativo ────────────────────── */}
          <div ref={codeRef} className="reveal animate-delay-200">
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/20 dark:shadow-black/40
              border border-slate-200 dark:border-slate-700">
              {/* Barra de título del editor */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-3 text-xs text-slate-400 font-mono">developer.js</span>
              </div>
              {/* Código */}
              <div className="bg-slate-900 px-6 py-6">
                <CodeSnippet />
              </div>
            </div>

            {/* Tarjetas flotantes */}
            <div className="flex gap-3 mt-4">
              <div className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-slate-800
                border border-slate-200 dark:border-slate-700 shadow-sm">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Stack principal</p>
                <div className="flex gap-2 text-xl">
                  <FaReact className="text-cyan-400" />
                  <FaJs className="text-yellow-400" />
                  <SiTailwindcss className='text-cyan-500'/>
                  <FaNodeJs className='text-green-600' />
                  <SiNextdotjs className="text-black dark:text-white" />
                  <SiMongodb className="text-green-500" />
                </div>
              </div>
              <div className="flex-1 px-4 py-3 rounded-xl bg-blue-600 shadow-lg shadow-blue-600/30">
                <p className="text-xs text-blue-200 mb-1">Speciality</p>
                <p className="text-sm font-semibold text-white">Full Stack Developer</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats ────────────────────────────────────────────── */}
        <div ref={statsRef} className="reveal animate-delay-400 mt-16
          grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Stat value="Web Apps" label="Full Stack Development" />
          <Stat value="Problem Solving" label="Practical Approach" />
          <Stat value="3+" label="Projects Built" />
          <Stat value="Continuous" label="Learning Mindset" />
        </div>
      </div>
    </section>
  );
}
