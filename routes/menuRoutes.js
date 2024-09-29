const express = require('express');
const Menu = require('../models/Menu');
const { auth, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

//Get all menu items (Clientes e Restaurantes)
router.get('/', auth, async (req, res) => {
  try {
    const menu = await Menu.find();
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Add new menu item
router.post('/', auth, authorizeRoles('restaurants'), async (req, res) => {
  const menuItem = new Menu({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  });

  try {
    const newMenuItem = await menuItem.save();
    res.status(201).json(newMenuItem);
  } catch ( err ) { 
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
