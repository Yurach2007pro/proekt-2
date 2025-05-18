require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.use('/users', usersRoutes);
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));