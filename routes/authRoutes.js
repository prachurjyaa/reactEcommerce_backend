const express = require('express');
const { register, signin } = require('../controllers/authController');
const { registerRules, signinRules, handleValidationErrors } = require('../validators/authValidator');

const router = express.Router();

router.post('/register', registerRules, handleValidationErrors, register);
router.post('/signin', signinRules, handleValidationErrors, signin);

module.exports = router;