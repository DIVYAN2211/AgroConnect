// routes/order.js
const express = require('express');
const router = express.Router();
const Order = require('../models/order'); // Define this model

router.post('/place-order', async (req, res) => {
  try {
    const { name, email, location, cartItems, totalPrice } = req.body;
    const newOrder = new Order({ name, email, location, cartItems, totalPrice });
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to place order', error });
  }
});

router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error });
  }
});

module.exports = router;
