const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().lean();
        res.send(products);
    } catch(err) {
        res.status(500).send('Ошибка сервера');
    }
};

exports.addToCart = async (req, res) => {
    const productId = req.params.productId;
    // Здесь добавляем товар в корзину текущего пользователя
    // Либо создаем новый заказ, либо обновляем существующий
    res.send({message: 'Товар добавлен в корзину'});
};