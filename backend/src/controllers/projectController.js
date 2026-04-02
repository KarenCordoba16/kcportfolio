// src/controllers/projectController.js
// Controlador de proyectos — lógica de negocio separada de las rutas

const ProjectModel = require('../models/projectModel');

const ProjectController = {
  // GET /api/projects
  async getAll(req, res) {
    try {
      const projects = await ProjectModel.getAll();
      res.json({ success: true, data: projects });
    } catch (error) {
      console.error('Error al obtener proyectos:', error.message);
      res.status(500).json({ success: false, message: 'Error al obtener proyectos' });
    }
  },

  // GET /api/projects/:id
  async getById(req, res) {
    try {
      const project = await ProjectModel.getById(req.params.id);
      if (!project) {
        return res.status(404).json({ success: false, message: 'Proyecto no encontrado' });
      }
      res.json({ success: true, data: project });
    } catch (error) {
      console.error('Error al obtener proyecto:', error.message);
      res.status(500).json({ success: false, message: 'Error al obtener proyecto' });
    }
  },

  // POST /api/projects
  async create(req, res) {
    try {
      const { title, description, image_url, project_url, github_url, technology_ids } = req.body;

      // Validaciones básicas
      if (!title || !description) {
        return res.status(400).json({ success: false, message: 'Título y descripción son obligatorios' });
      }

      const project = await ProjectModel.create({ title, description, image_url, project_url, github_url });

      // Asociar tecnologías si se enviaron
      if (technology_ids && technology_ids.length > 0) {
        await ProjectModel.addTechnologies(project.id, technology_ids);
      }

      const fullProject = await ProjectModel.getById(project.id);
      res.status(201).json({ success: true, data: fullProject });
    } catch (error) {
      console.error('Error al crear proyecto:', error.message);
      res.status(500).json({ success: false, message: 'Error al crear proyecto' });
    }
  },

  // PUT /api/projects/:id
  async update(req, res) {
    try {
      const { title, description, image_url, project_url, github_url, technology_ids } = req.body;
      const updated = await ProjectModel.update(req.params.id, { title, description, image_url, project_url, github_url });

      if (!updated) {
        return res.status(404).json({ success: false, message: 'Proyecto no encontrado' });
      }

      if (technology_ids) {
        await ProjectModel.addTechnologies(updated.id, technology_ids);
      }

      const fullProject = await ProjectModel.getById(updated.id);
      res.json({ success: true, data: fullProject });
    } catch (error) {
      console.error('Error al actualizar proyecto:', error.message);
      res.status(500).json({ success: false, message: 'Error al actualizar proyecto' });
    }
  },

  // DELETE /api/projects/:id
  async delete(req, res) {
    try {
      const deleted = await ProjectModel.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Proyecto no encontrado' });
      }
      res.json({ success: true, message: 'Proyecto eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar proyecto:', error.message);
      res.status(500).json({ success: false, message: 'Error al eliminar proyecto' });
    }
  },
};

module.exports = ProjectController;
