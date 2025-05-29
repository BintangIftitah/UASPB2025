require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authMiddleware = require('./middleware/authMiddleware');

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const absenRoutes = require('./routes/absen');
const kelasRoutes = require('./routes/teskelas');

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[REQUEST] ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  console.log('[INFO] Root route accessed');
  res.send('Server is running!');
});

app.use('/api/auth', (req, res, next) => {
  console.log('[ROUTE] Routing to /api/auth');
  next();
}, authRoutes);

app.use('/api/profile', authMiddleware, (req, res, next) => {
  console.log('[ROUTE] Routing to /api/profile');
  next();
}, profileRoutes);

app.use('/api/absen', (req, res, next) => {
  console.log('[ROUTE] Routing to /api/absen');
  next();
}, absenRoutes);

app.use('/api/kelas', (req, res, next) => {
  console.log('[ROUTE] Routing to /api/kelas');
  next();
}, kelasRoutes);

console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[SERVER] Running on http://localhost:${PORT}`);
});