// src/config/database.js
// Configuración de la conexión a PostgreSQL usando el módulo pg

const { Pool } = require('pg');
require('dotenv').config();

// Pool de conexiones — reutiliza conexiones para mejor performance
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'portfolio_db',
  max: 10,                   // máximo de conexiones en el pool
  idleTimeoutMillis: 30000,  // cerrar conexiones inactivas tras 30s
  connectionTimeoutMillis: 2000,
});

// Verificar conexión al arrancar
pool.on('connect', () => {
  console.log('✅ Conectado a PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ Error en el pool de PostgreSQL:', err.message);
});

module.exports = pool;
