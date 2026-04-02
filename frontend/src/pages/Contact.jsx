// src/pages/Contact.jsx
// Formulario de contacto — envía datos al backend y los guarda en PostgreSQL

import { useState } from 'react';
import api from '../utils/api';
import { useReveal } from '../hooks/useReveal';
import { SectionTitle } from '../components/ui/index.jsx';

const INITIAL_FORM = { name: '', email: '', message: '' };

function ContactInfo({ icon, title, value, href }) {
  const Tag = href ? 'a' : 'div';
  return (
    <Tag
      {...(href ? { href, target: '_blank', rel: 'noreferrer' } : {})}
      className="flex items-start gap-4 p-5 rounded-2xl
        bg-white dark:bg-slate-800
        border border-slate-200 dark:border-slate-700
        hover:border-blue-300 dark:hover:border-blue-600
        hover:shadow-md transition-all duration-300 group cursor-pointer"
    >
      <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/30
        text-blue-600 dark:text-blue-400
        group-hover:bg-blue-600 group-hover:text-white
        dark:group-hover:bg-blue-600 transition-all duration-300 shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">{title}</p>
        <p className="text-sm font-medium text-slate-900 dark:text-white">{value}</p>
      </div>
    </Tag>
  );
}

export default function Contact() {
  const [form,     setForm]     = useState(INITIAL_FORM);
  const [status,   setStatus]   = useState(null); // 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const titleRef = useReveal();
  const formRef  = useReveal();
  const infoRef  = useReveal();

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus('error');
      setErrorMsg('Por favor completá todos los campos.');
      return;
    }
    try {
      setStatus('loading');
      await api.post('/contact', form);
      setStatus('success');
      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Error al enviar el mensaje. Intentá de nuevo.');
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-xl text-sm
    bg-white dark:bg-slate-800
    border border-slate-300 dark:border-slate-600
    text-slate-900 dark:text-white
    placeholder-slate-400 dark:placeholder-slate-500
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    transition-all duration-200`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-28">

      <div ref={titleRef} className="reveal">
        <SectionTitle
          tag="Contacto"
          title="Hablemos"
          subtitle="¿Tenés un proyecto en mente? ¿Querés colaborar o simplemente charlar? Mandame un mensaje."
        />
      </div>

      <div className="grid lg:grid-cols-5 gap-12">

        {/* ── Formulario (col 3/5) ──────────────────────────── */}
        <div ref={formRef} className="reveal lg:col-span-3">
          <div className="p-8 rounded-2xl bg-white dark:bg-slate-800
            border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-6">
              Envíame un mensaje
            </h3>

            {/* Mensaje de éxito */}
            {status === 'success' && (
              <div className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20
                border border-green-200 dark:border-green-700
                flex items-center gap-3 text-green-700 dark:text-green-400">
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm font-medium">¡Mensaje enviado! Te responderé pronto. 🚀</p>
              </div>
            )}

            {/* Mensaje de error */}
            {status === 'error' && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20
                border border-red-200 dark:border-red-700
                flex items-center gap-3 text-red-700 dark:text-red-400">
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm">{errorMsg}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
              {/* Nombre */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Tu nombre completo"
                  className={inputClass}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className={inputClass}
                  required
                />
              </div>

              {/* Mensaje */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Mensaje *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Contame sobre tu proyecto o en qué puedo ayudarte..."
                  className={`${inputClass} resize-none`}
                  required
                />
              </div>

              {/* Botón */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 px-6 rounded-xl font-medium text-white
                  bg-blue-600 hover:bg-blue-700
                  shadow-lg shadow-blue-600/30
                  disabled:opacity-60 disabled:cursor-not-allowed
                  transition-all duration-200 active:scale-[0.98]
                  flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar mensaje
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* ── Info de contacto (col 2/5) ───────────────────── */}
        <div ref={infoRef} className="reveal animate-delay-200 lg:col-span-2 flex flex-col gap-4">

          <ContactInfo
            href="mailto:tu@email.com"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
            title="Email"
            value="tu@email.com"
          />

          <ContactInfo
            href="https://linkedin.com/in/tuusuario"
            icon={
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            }
            title="LinkedIn"
            value="linkedin.com/in/tuusuario"
          />

          <ContactInfo
            href="https://github.com/tuusuario"
            icon={
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            }
            title="GitHub"
            value="github.com/tuusuario"
          />

          {/* Disponibilidad */}
          <div className="p-5 rounded-2xl bg-blue-50 dark:bg-blue-900/20
            border border-blue-200 dark:border-blue-700 mt-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse-slow" />
              <span className="text-sm font-semibold text-slate-900 dark:text-white">
                Disponible para proyectos
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Actualmente acepto proyectos freelance y estoy abierto a propuestas de trabajo
              remoto o híbrido.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
