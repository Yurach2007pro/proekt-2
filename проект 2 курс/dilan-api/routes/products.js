const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
    const products = await Product.find().lean();
    res.send(products);
});

router.post('/', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.send(product);
});

module.exports = router;