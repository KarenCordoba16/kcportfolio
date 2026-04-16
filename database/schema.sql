-- ============================================================
--  PORTFOLIO DATABASE — Script SQL para PostgreSQL
--  Crea las tablas y carga datos de ejemplo
-- ============================================================

-- Crear base de datos (ejecutar como superusuario si es necesario)
-- CREATE DATABASE portfolio_db;
-- \c portfolio_db

-- ── Extensiones ──────────────────────────────────────────────
-- pgcrypto para gen_random_uuid() si se quisiera usar UUIDs
-- CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── Tabla: projects ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR(200) NOT NULL,
  description TEXT         NOT NULL,
  image_url   TEXT,
  project_url TEXT,
  github_url  TEXT,
  created_at  TIMESTAMP DEFAULT NOW()
);

-- ── Tabla: technologies ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS technologies (
  id       SERIAL PRIMARY KEY,
  name     VARCHAR(100) NOT NULL UNIQUE,
  logo_url TEXT
);

-- ── Tabla: project_technologies (relación N:M) ───────────────
CREATE TABLE IF NOT EXISTS project_technologies (
  project_id    INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  technology_id INTEGER REFERENCES technologies(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, technology_id)
);

-- ── Tabla: messages ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS messages (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(150) NOT NULL,
  email      VARCHAR(255) NOT NULL,
  message    TEXT         NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================
--  SEED DATA — Datos de ejemplo para desarrollo
-- ============================================================

-- Tecnologías con logos de devicons (CDN público)
INSERT INTO technologies (name, logo_url) VALUES
  ('React',       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'),
  ('Node.js',     'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'),
  ('PostgreSQL',  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg'),
  ('JavaScript',  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'),
  ('Python',      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'),
  ('Git',         'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'),
  ('Express',     'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg'),
  ('MongoDB',     'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg'),
  ('Tailwind',    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg'),
  ('Figma',       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg'),
  ('Vite',        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg'),
  ('Postman',     'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg'),
  ('Django',      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg'),
  ('MySQL',        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg')
ON CONFLICT (name) DO NOTHING;

-- Proyectos de ejemplo
INSERT INTO projects (title, description, image_url, project_url, github_url) VALUES
(
  'Nextalent',
  'Web platform developed in a team to connect young professionals with companies through internship opportunities. Focused on usability and real-world application.',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
  NULL,
  'https://github.com/Fran1107/NexTalent-Front'
),
(
  'DentCorp',
  'Web application developed in a team for managing dental appointments, allowing users to schedule and organize visits efficiently.',
  'https://media.istockphoto.com/id/2214939121/photo/business-team-analyzing-financial-data-on-digital-tablets-during-a-meeting.jpg?s=1024x1024&w=is&k=20&c=U1kt5uKz7Wdq4dDDnYFW0nH5dLtmHvzQNEYg0RJPqeI=',
  NULL,
  'https://github.com/GastonCamu/DentCorp'
),
(
  'Study App',
  'Personal project in development focused on organizing study materials, creating summaries, and improving information accessibility.',
  'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&q=80',
  NULL,
  'https://github.com/KarenCordoba16/'
)
RETURNING id;

-- Relacionar proyectos con tecnologías
-- Proyecto 1 (Nextalent): React, Javascript, MongoDB
INSERT INTO project_technologies (project_id, technology_id)
SELECT p.id, t.id
FROM projects p, technologies t
WHERE p.title = 'Nextalent'
  AND t.name IN ('React', 'JavaScript', 'MongoDB');

-- Proyecto 2 (DentCorp): Python, Django, MySQL
INSERT INTO project_technologies (project_id, technology_id)
SELECT p.id, t.id
FROM projects p, technologies t
WHERE p.title = 'DentCorp'
  AND t.name IN ('Python', 'Django', 'MySQL');

-- Proyecto 3 (App de estudio): React, Javascript, PostgreSQL
INSERT INTO project_technologies (project_id, technology_id)
SELECT p.id, t.id
FROM projects p, technologies t
WHERE p.title = 'Study App'
  AND t.name IN ('React', 'JavaScript', 'Python', 'PostgreSQL');
