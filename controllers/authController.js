const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const mail = require('../utils/gmail');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
  try {
    const { name, password, email, role } = req.body;
    
    const existingUser = await User.findOne({ name });
    if (existingUser) return res.status(409).json({ message: 'User already exists' });
    
    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(409).json({ message: 'Email already in use' });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, password: hashedPassword, email, role });
    
    mail(email, name).catch(err => console.error('email failed:', err.message));
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    
    const user = await User.findOne({ name });
    if (!user) return res.status(401).json({ message: 'Invalid name or password' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid name or password' });
    
    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '7d' }
    );
    
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};