const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connection = require('./.config/db');
const { authLimiter, productLimiter } = require('./middlewares/ratelimit');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 3000;

// global middleware
app.use(express.json());
app.use(cors());

// route-specific rate limiting
app.use('/auth', authLimiter); // Strict: 10 requests per 15 minutes
app.use('/products', productLimiter); // Lenient: 100 requests per 15 minutes

// routes
app.use('/products', productRoutes);
app.use('/auth', authRoutes);

// // Allow strict: false for trailing slashes
// app.set('strict routing', false);

// health check
app.get('/', (req, res) => res.json({ msg: 'API running' }));

// 404 handler
app.use((req, res) => res.status(404).json({ msg: 'route not found' }));

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: 'internal server error', error: err.message });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
  connection();
});