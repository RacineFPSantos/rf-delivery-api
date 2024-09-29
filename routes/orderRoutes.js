const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

//Get all orders
router.get('/', async ( req, res )=> {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({  message: err.message });
  }
});

//Update order status
router.patch(':id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if(!order) 
      return res.status(404).json({ message: 'Order not found' });

    order.status = req.body.status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;