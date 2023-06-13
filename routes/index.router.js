const permissionRouter = require('./permissions.router');
const productRouter = require('./product.router');
const userRouter = require('./user.router');

const mainRouter = require('express').Router();

mainRouter.use('/products', productRouter);
mainRouter.use('/users', userRouter);
mainRouter.use('/permissions', permissionRouter);

module.exports = mainRouter;
