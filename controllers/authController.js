console.log('authController loaded');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

console.log('User module:', User);

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username dan password harus diisi' });
  }

  User.findByUsername(username, (err, user) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const payload = {
      id: user.id,
      username: user.username,
      role: user.role
    };

    const secretKey = process.env.JWT_SECRET_KEY || 'default_jwt_secret_key';
    const token = jwt.sign(payload, secretKey, { expiresIn: '1d' });

    return res.status(200).json({
      message: 'Login successful',
      token,
      role: user.role,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
  });
};