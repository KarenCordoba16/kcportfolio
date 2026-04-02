// src/routes/technologyRoutes.js
const express = require('express');
const router = express.Router();
const TechnologyController = require('../controllers/technologyController');

router.get('/', TechnologyController.getAll);
router.post('/', TechnologyController.create);

module.exports = router;
