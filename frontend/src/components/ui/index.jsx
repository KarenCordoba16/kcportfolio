// src/components/ui/Button.jsx
// Botón reutilizable con variantes

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-600/25',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white',
    ghost:   'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}

// ── Badge ─────────────────────────────────────────────────────
export function Badge({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
      bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 ${className}`}>
      {children}
    </span>
  );
}

// ── SectionTitle ──────────────────────────────────────────────
export function SectionTitle({ tag, title, subtitle, center = false }) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      {tag && (
        <span className="inline-block mb-3 text-xs font-mono font-semibold tracking-widest uppercase
          text-blue-600 dark:text-blue-400">
          {tag}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl text-lg leading-relaxed
          ${center ? 'mx-auto' : ''}">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ── Loader ────────────────────────────────────────────────────
export function Loader({ text = 'Cargando...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-10 h-10 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      <p className="text-sm text-slate-500 dark:text-slate-400 font-mono">{text}</p>
    </div>
  );
}

// ── ErrorMessage ──────────────────────────────────────────────
export function ErrorMessage({ message }) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20
      border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400">
      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p className="text-sm">{message}</p>
    </div>
  );
}
