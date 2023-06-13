const { getProductsController } = require('../controllers/product.controller');
const authenticate = require('../middlewares/authentication');
const authorize = require('../middlewares/authorization');

const productRouter = require('express').Router();

productRouter.get('/', getProductsController);
productRouter.post('/', authenticate, authorize(['PRODUCT.CREATE', 'PRODUCT.*']));
productRouter.put('/', authenticate, authorize(['PRODUCT.UPDATE', 'PRODUCT.*']));
productRouter.delete('/', authenticate, authorize(['PRODUCT.DELETE', 'PRODUCT.*']));

module.exports = productRouter;
