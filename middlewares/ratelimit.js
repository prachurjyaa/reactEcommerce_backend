const rateLimit = require('express-rate-limit');

// Strict limiter for auth routes (prevent brute force attacks)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10, // Max 10 requests per IP per 15 minutes
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  ipv6Subnet: 56,
  message: 'Too many authentication attempts, please try again later.',
  skipSuccessfulRequests: false // Count all requests, even successful ones
});

// Lenient limiter for product routes
const productLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Max 100 requests per IP per 15 minutes
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  ipv6Subnet: 56,
  message: 'Too many requests, please try again later.'
});

module.exports = { authLimiter, productLimiter };