const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const pengumumanRoutes = require('./routes/pengumumanRoutes');
const produkRoutes = require('./routes/produkRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// CORS config
const corsOptions = {
  origin: ['http://localhost:5173'],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Backend Mokan Kitchen API',
    version: '1.0.0',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/pengumuman', pengumumanRoutes);
app.use('/api/produk', produkRoutes);

// Error Handler
app.use(errorHandler);

module.exports = app;
