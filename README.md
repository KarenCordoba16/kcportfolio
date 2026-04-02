# 🚀 Portfolio Full Stack Developer

Portfolio web profesional y moderno construido con **React + Vite + Tailwind** en el frontend y **Node.js + Express + PostgreSQL** en el backend.

---

## ✨ Características

- **Frontend** moderno con React 18, Vite y Tailwind CSS
- **Backend** REST API con Node.js y Express (arquitectura MVC)
- **Base de datos** PostgreSQL con relaciones N:M
- **Modo oscuro** persistido en localStorage
- **Totalmente responsive** — mobile, tablet y desktop
- **Animaciones suaves** con IntersectionObserver
- **CORS** configurado para desarrollo y producción
- **Variables de entorno** para configuración segura

---

## 🗂️ Estructura del proyecto

```
portfolio/
├── frontend/               # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/     # Navbar, Footer
│   │   │   └── ui/         # Botones, Cards, Badges, etc.
│   │   ├── hooks/          # useReveal (scroll animations)
│   │   ├── pages/          # Home, About, Projects, Technologies, Contact
│   │   └── utils/          # Instancia de Axios
│   ├── index.html
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/                # Node.js + Express
│   └── src/
│       ├── config/         # Conexión a PostgreSQL
│       ├── controllers/    # Lógica de negocio
│       ├── models/         # Consultas SQL
│       ├── routes/         # Definición de endpoints
│       ├── middleware/      # Error handler
│       └── server.js       # Entrada del servidor
│
└── database/
    └── schema.sql          # Tablas + datos de ejemplo
```

---

## ⚙️ Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- [npm](https://npmjs.com/) v9 o superior
- [PostgreSQL](https://www.postgresql.org/) v14 o superior

---

## 🛠️ Instalación y puesta en marcha

### 1. Clonar el repositorio

```bash
git clone https://github.com/tuusuario/portfolio.git
cd portfolio
```

### 2. Configurar la base de datos

```bash
# Conectarse a PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE portfolio_db;
\q

# Ejecutar el script SQL
psql -U postgres -d portfolio_db -f database/schema.sql
```

### 3. Configurar el backend

```bash
cd backend
cp .env.example .env
# Editar .env con tus credenciales de PostgreSQL
npm install
npm run dev
```

El servidor estará disponible en `http://localhost:3001`

### 4. Configurar el frontend

```bash
cd ../frontend
cp .env.example .env
npm install
npm run dev
```

El sitio estará disponible en `http://localhost:5173`

---

## 🌐 Endpoints de la API

| Método | Endpoint              | Descripción                        |
|--------|-----------------------|------------------------------------|
| GET    | /api/health           | Estado del servidor                |
| GET    | /api/projects         | Listar todos los proyectos         |
| GET    | /api/projects/:id     | Obtener proyecto por ID            |
| POST   | /api/projects         | Crear proyecto                     |
| PUT    | /api/projects/:id     | Actualizar proyecto                |
| DELETE | /api/projects/:id     | Eliminar proyecto                  |
| GET    | /api/technologies     | Listar tecnologías                 |
| POST   | /api/technologies     | Crear tecnología                   |
| POST   | /api/contact          | Enviar mensaje de contacto         |
| GET    | /api/contact          | Listar mensajes recibidos          |

---

## 🗄️ Esquema de base de datos

```sql
projects            -- Proyectos del portfolio
technologies        -- Tecnologías/stack
project_technologies -- Relación N:M proyectos ↔ tecnologías
messages            -- Mensajes del formulario de contacto
```

---

## 🎨 Personalización

Editá estos archivos para personalizar el portfolio:

| Archivo | Qué personalizar |
|---------|-----------------|
| `frontend/src/pages/Home.jsx` | Nombre, título, descripción |
| `frontend/src/pages/About.jsx` | Bio, skills, timeline |
| `frontend/src/pages/Contact.jsx` | Email, redes sociales |
| `frontend/src/components/layout/Footer.jsx` | Links y redes |
| `database/schema.sql` | Proyectos y tecnologías de ejemplo |
| `frontend/tailwind.config.js` | Colores y fuentes |

---

## 🚀 Deploy

### Frontend (Vercel / Netlify)

```bash
cd frontend
npm run build
# Subir la carpeta dist/
```

### Backend (Railway / Render / VPS)

```bash
cd backend
# Asegurarse de configurar las variables de entorno en el panel del proveedor
npm start
```

---

## 🛡️ Variables de entorno

### Backend (`backend/.env`)

```env
PORT=3001
NODE_ENV=production
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=portfolio_db
FRONTEND_URL=https://tu-portfolio.com
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=https://tu-api.com/api
```

---

## 🧰 Stack tecnológico

**Frontend:** React 18 · Vite · Tailwind CSS · React Router · Axios

**Backend:** Node.js · Express · PostgreSQL · pg · dotenv · cors

**Herramientas:** Git · ESLint · Nodemon

---

## 📄 Licencia

MIT © Tu Nombre

---

> Construido con ❤️ y mucho ☕
