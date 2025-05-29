const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Authorization Header:', authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Extracted Token:', token);

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY || 'default_jwt_secret_key';
    console.log('Using secretKey:', secretKey);

    const decoded = jwt.verify(token, secretKey);
    console.log('Decoded JWT payload:', decoded);

    req.user = decoded;
    next();
  } catch (error) {
    console.error('JWT verification error:', error.message);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;