// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  location: String,
  cartItems: Array,
  totalPrice: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
