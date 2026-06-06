const { body, validationResult } = require('express-validator');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

exports.registerRules = [
  body('username').trim().isLength({ min: 3 }).withMessage('username must be at least 3 characters'),
  body('email').isEmail().withMessage('invalid email'),
  body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters'),
  body('role').isIn(['seller', 'buyer']).withMessage('role must be seller or buyer'),
  handleValidation,
];

exports.productRules = [
  body('title').trim().notEmpty().withMessage('title is required'),
  body('price').isFloat({ min: 0 }).withMessage('price must be a positive number'),
  handleValidation,
];