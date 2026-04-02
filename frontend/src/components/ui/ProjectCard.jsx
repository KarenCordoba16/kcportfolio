// src/components/ui/ProjectCard.jsx
// Tarjeta de proyecto con animación hover y tecnologías

export default function ProjectCard({ project }) {
  const { title, description, image_url, project_url, github_url, technologies = [] } = project;

  return (
    <article className="group relative flex flex-col rounded-2xl overflow-hidden
      bg-white dark:bg-slate-800
      border border-slate-200 dark:border-slate-700
      hover:border-blue-300 dark:hover:border-blue-600
      shadow-sm hover:shadow-xl hover:shadow-blue-100 dark:hover:shadow-blue-900/20
      transition-all duration-300 hover:-translate-y-1">

      {/* Imagen */}
      <div className="relative overflow-hidden h-48 bg-slate-100 dark:bg-slate-700">
        {image_url ? (
          <img
            src={image_url}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-12 h-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {/* Overlay en hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 leading-snug
            group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        {/* Tecnologías */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technologies.map(tech => (
              <div key={tech.id}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg
                  bg-slate-50 dark:bg-slate-700/60
                  border border-slate-200 dark:border-slate-600"
                title={tech.name}>
                {tech.logo_url && (
                  <img src={tech.logo_url} alt={tech.name} className="w-4 h-4 object-contain" />
                )}
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Acciones */}
        <div className="flex items-center gap-3 mt-auto pt-2">
          {github_url && (
            <a
              href={github_url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                text-slate-700 dark:text-slate-300
                bg-slate-100 dark:bg-slate-700
                hover:bg-slate-200 dark:hover:bg-slate-600
                transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
          )}
          {project_url && (
            <a
              href={project_url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                text-white bg-blue-600 hover:bg-blue-700
                shadow-md shadow-blue-600/25
                transition-all duration-200 active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Ver demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
