// src/routes/indexRouter.js
const router = require('express').Router(); //* получаем экземпляр роутинга из библиотеки

const formatResponse = require('../utils/formatResponse'); //* подтягиваем утилиту для унификации ответа по 404
const authRouter = require('./auth.router');
const backetRouter = require('./bucketRouter');
const routerProduct = require('./ProductRouter');
const UserRouter = require('./user.router');


router.use('/auth', authRouter);
router.use('/product',routerProduct)
router.use('/user', UserRouter)
router.use('/bucket', backetRouter)
  
//! Обработка всех запросов на несуществующие маршруты (меняем стандартный ответ от express
router.use((req, res) => {
  res.status(404).json(formatResponse(404, 'Not found'));
});

module.exports = router;