// src/models/projectModel.js
// Modelo de datos para proyectos — consultas SQL a PostgreSQL

const pool = require('../config/database');

const ProjectModel = {
  // Obtener todos los proyectos con sus tecnologías
  async getAll() {
    const query = `
      SELECT
        p.id, p.title, p.description,
        p.image_url, p.project_url, p.github_url,
        p.created_at,
        COALESCE(
          JSON_AGG(
            JSON_BUILD_OBJECT('id', t.id, 'name', t.name, 'logo_url', t.logo_url)
          ) FILTER (WHERE t.id IS NOT NULL),
          '[]'
        ) AS technologies
      FROM projects p
      LEFT JOIN project_technologies pt ON p.id = pt.project_id
      LEFT JOIN technologies t ON pt.technology_id = t.id
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  // Obtener un proyecto por ID
  async getById(id) {
    const query = `
      SELECT
        p.id, p.title, p.description,
        p.image_url, p.project_url, p.github_url,
        p.created_at,
        COALESCE(
          JSON_AGG(
            JSON_BUILD_OBJECT('id', t.id, 'name', t.name, 'logo_url', t.logo_url)
          ) FILTER (WHERE t.id IS NOT NULL),
          '[]'
        ) AS technologies
      FROM projects p
      LEFT JOIN project_technologies pt ON p.id = pt.project_id
      LEFT JOIN technologies t ON pt.technology_id = t.id
      WHERE p.id = $1
      GROUP BY p.id
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  // Crear un nuevo proyecto
  async create({ title, description, image_url, project_url, github_url }) {
    const query = `
      INSERT INTO projects (title, description, image_url, project_url, github_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const result = await pool.query(query, [title, description, image_url, project_url, github_url]);
    return result.rows[0];
  },

  // Actualizar un proyecto
  async update(id, { title, description, image_url, project_url, github_url }) {
    const query = `
      UPDATE projects
      SET title = $1, description = $2, image_url = $3,
          project_url = $4, github_url = $5
      WHERE id = $6
      RETURNING *
    `;
    const result = await pool.query(query, [title, description, image_url, project_url, github_url, id]);
    return result.rows[0];
  },

  // Eliminar un proyecto
  async delete(id) {
    await pool.query('DELETE FROM project_technologies WHERE project_id = $1', [id]);
    const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  },

  // Asignar tecnologías a un proyecto
  async addTechnologies(projectId, technologyIds) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query('DELETE FROM project_technologies WHERE project_id = $1', [projectId]);
      for (const techId of technologyIds) {
        await client.query(
          'INSERT INTO project_technologies (project_id, technology_id) VALUES ($1, $2)',
          [projectId, techId]
        );
      }
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  },
};

module.exports = ProjectModel;
