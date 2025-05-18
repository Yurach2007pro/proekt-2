require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const dbConfig = require('./db.config');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB_NAME, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

async function testDBConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
}

testDBConnection();

// Импортируем маршруты
const productRoutes = require('./routes/product.routes');
const authRoutes = require('./routes/auth.routes');

// Настройки middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/products', productRoutes);
app.use('/auth', authRoutes);

// Обрабатываем ошибки
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message
  });
});

// Запускаем сервер
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});