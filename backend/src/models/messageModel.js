// src/models/messageModel.js
// Modelo de datos para mensajes de contacto

const pool = require('../config/database');

const MessageModel = {
  // Guardar un mensaje de contacto
  async create({ name, email, message }) {
    const result = await pool.query(
      'INSERT INTO messages (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [name, email, message]
    );
    return result.rows[0];
  },

  // Obtener todos los mensajes (para panel admin futuro)
  async getAll() {
    const result = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
    return result.rows;
  },
};

module.exports = MessageModel;
