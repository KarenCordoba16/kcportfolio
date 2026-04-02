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
  ('TypeScript',  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'),
  ('JavaScript',  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'),
  ('Python',      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'),
  ('Docker',      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'),
  ('Git',         'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'),
  ('Express',     'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg'),
  ('MongoDB',     'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg'),
  ('Linux',       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg'),
  ('Tailwind',    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg')
ON CONFLICT (name) DO NOTHING;

-- Proyectos de ejemplo
INSERT INTO projects (title, description, image_url, project_url, github_url) VALUES
(
  'E-Commerce Full Stack',
  'Plataforma de comercio electrónico completa con autenticación JWT, carrito de compras, pasarela de pagos con Stripe y panel de administración. Arquitectura de microservicios con Docker.',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
  'https://demo.ejemplo.com',
  'https://github.com/tuusuario/ecommerce'
),
(
  'Sistema de Monitoreo de Red',
  'Dashboard en tiempo real para monitoreo de infraestructura de red. Detecta intrusiones, analiza tráfico y genera alertas. Integrado con Wireshark y scripts de análisis de seguridad.',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
  'https://monitor.ejemplo.com',
  'https://github.com/tuusuario/network-monitor'
),
(
  'API REST con Autenticación',
  'API RESTful completa con autenticación JWT, roles y permisos, rate limiting, documentación Swagger y tests automatizados con Jest. Desplegada en AWS con CI/CD.',
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
  'https://api.ejemplo.com/docs',
  'https://github.com/tuusuario/rest-api'
)
RETURNING id;

-- Relacionar proyectos con tecnologías
-- Proyecto 1 (E-Commerce): React, Node.js, PostgreSQL, Docker
INSERT INTO project_technologies (project_id, technology_id)
SELECT p.id, t.id
FROM projects p, technologies t
WHERE p.title = 'E-Commerce Full Stack'
  AND t.name IN ('React', 'Node.js', 'PostgreSQL', 'Docker', 'TypeScript');

-- Proyecto 2 (Monitoreo): Python, Linux, PostgreSQL, Docker
INSERT INTO project_technologies (project_id, technology_id)
SELECT p.id, t.id
FROM projects p, technologies t
WHERE p.title = 'Sistema de Monitoreo de Red'
  AND t.name IN ('Python', 'Linux', 'PostgreSQL', 'Docker');

-- Proyecto 3 (API): Node.js, Express, PostgreSQL, Docker
INSERT INTO project_technologies (project_id, technology_id)
SELECT p.id, t.id
FROM projects p, technologies t
WHERE p.title = 'API REST con Autenticación'
  AND t.name IN ('Node.js', 'Express', 'PostgreSQL', 'Docker', 'JavaScript');
