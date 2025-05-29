console.log('>>> FILE routes/teskelas.js berhasil dibaca');
const express = require('express');
const router = express.Router();
const kelasController = require('../controllers/kelasController');

router.get('/', (req, res, next) => {
  console.log('[ROUTE] GET /api/kelas triggered');
  next();
}, kelasController.getKelasByGuru);

module.exports = router;