// src/models/technologyModel.js
// Modelo de datos para tecnologías

const pool = require('../config/database');

const TechnologyModel = {
  // Obtener todas las tecnologías
  async getAll() {
    const result = await pool.query('SELECT * FROM technologies ORDER BY name ASC');
    return result.rows;
  },

  // Obtener tecnología por ID
  async getById(id) {
    const result = await pool.query('SELECT * FROM technologies WHERE id = $1', [id]);
    return result.rows[0];
  },

  // Crear tecnología
  async create({ name, logo_url }) {
    const result = await pool.query(
      'INSERT INTO technologies (name, logo_url) VALUES ($1, $2) RETURNING *',
      [name, logo_url]
    );
    return result.rows[0];
  },
};

module.exports = TechnologyModel;
