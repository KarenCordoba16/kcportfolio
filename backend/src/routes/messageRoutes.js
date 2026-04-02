// src/routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/messageController');

router.post('/', MessageController.create);
router.get('/', MessageController.getAll);

module.exports = router;
