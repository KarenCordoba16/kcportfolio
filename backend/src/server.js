// src/server.js
// Punto de entrada del servidor Express

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const projectRoutes = require('./routes/projectRoutes');
const technologyRoutes = require('./routes/technologyRoutes');
const messageRoutes = require('./routes/messageRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middlewares ────────────────────────────────────────────────────────────────

// CORS — permite solicitudes desde el frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Rutas de la API ────────────────────────────────────────────────────────────
app.use('/api/projects', projectRoutes);
app.use('/api/technologies', technologyRoutes);
app.use('/api/contact', messageRoutes);

// Ruta de salud — útil para verificar que el servidor está activo
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API funcionando correctamente 🚀', timestamp: new Date() });
});

// Rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint no encontrado' });
});

// Manejador global de errores (debe ir al final)
app.use(errorHandler);

// ── Iniciar servidor ───────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📌 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📡 API disponible en http://localhost:${PORT}/api\n`);
});
