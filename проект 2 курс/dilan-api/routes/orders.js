const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.get('/', async (req, res) => {
    const orders = await Order.find({user: req.user._id}).populate('orderItems.product');
    res.send(orders);
});

router.post('/', async (req, res) => {
    const order = new Order(req.body);
    await order.save();
    res.send(order);
});

module.exports = router;