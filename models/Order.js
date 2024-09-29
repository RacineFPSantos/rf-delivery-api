const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  items: [
    {
      name: String,
      quantity: Number,
    }
  ],
  status: {
    type: String,
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Order', OrderSchema);