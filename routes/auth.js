const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Endpoint POST login
router.post('/login', authController.login);

module.exports = router;