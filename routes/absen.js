const express = require('express');
const router = express.Router();
const absenController = require('../controllers/absenController');

router.post('/submit', absenController.submitAbsen);
router.get('/', absenController.getAbsen);

module.exports = router;