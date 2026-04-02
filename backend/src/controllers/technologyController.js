// src/controllers/technologyController.js
// Controlador de tecnologías

const TechnologyModel = require('../models/technologyModel');

const TechnologyController = {
  // GET /api/technologies
  async getAll(req, res) {
    try {
      const technologies = await TechnologyModel.getAll();
      res.json({ success: true, data: technologies });
    } catch (error) {
      console.error('Error al obtener tecnologías:', error.message);
      res.status(500).json({ success: false, message: 'Error al obtener tecnologías' });
    }
  },

  // POST /api/technologies
  async create(req, res) {
    try {
      const { name, logo_url } = req.body;
      if (!name) {
        return res.status(400).json({ success: false, message: 'El nombre es obligatorio' });
      }
      const tech = await TechnologyModel.create({ name, logo_url });
      res.status(201).json({ success: true, data: tech });
    } catch (error) {
      console.error('Error al crear tecnología:', error.message);
      res.status(500).json({ success: false, message: 'Error al crear tecnología' });
    }
  },
};

module.exports = TechnologyController;
