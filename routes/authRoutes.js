const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const user = require('../models/user');
const router = express.Router();

//Register a new user (client or restaurant)
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) 
      return res.status(400).json({ message: 'Usuário já existe'});

    const user = new User({ name, email, password, role });
    await user.save();

    const token = jwt.sign({
        id: user._id,
        role: user.role 
      }, 
      process.env.JWT_SECRET, 
      { 
        expiresIn: '1h',
      });
    
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if(!user) 
      return res.status(400).json({ message: 'Credenciais inválidas.'});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) 
      return res.status(400).json({ message: 'Credenciais inválidas.'});

    const token = jwt.sign({
      id: user._id,
      role: user.role 
    }, 
    process.env.JWT_SECRET, 
    { 
      expiresIn: '1h',
    });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;