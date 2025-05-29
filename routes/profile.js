const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.post('/', profileController.getProfile);

router.get('/', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized: User not found in token' });
  }

  res.json({
    message: 'Profil berhasil diambil dari token',
    user: req.user
  });
});

module.exports = router;
