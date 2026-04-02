// src/controllers/messageController.js
// Controlador para mensajes de contacto

const MessageModel = require('../models/messageModel');

const MessageController = {
  // POST /api/contact
  async create(req, res) {
    try {
      const { name, email, message } = req.body;

      // Validaciones
      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          message: 'Nombre, email y mensaje son obligatorios',
        });
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Email inválido' });
      }

      const saved = await MessageModel.create({ name, email, message });
      res.status(201).json({
        success: true,
        message: '¡Mensaje recibido! Te responderé pronto.',
        data: saved,
      });
    } catch (error) {
      console.error('Error al guardar mensaje:', error.message);
      res.status(500).json({ success: false, message: 'Error al enviar el mensaje' });
    }
  },

  // GET /api/contact (mensajes recibidos)
  async getAll(req, res) {
    try {
      const messages = await MessageModel.getAll();
      res.json({ success: true, data: messages });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener mensajes' });
    }
  },
};

module.exports = MessageController;
