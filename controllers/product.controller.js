const { getProducts, createProduct, updateProduct, deleteProduct } = require('../models/productModel');

async function getProductsController(req, res) {
   try {
      const { pageNumber, pageSize } = req.query;
      const products = await getProducts(pageNumber, pageSize);
      res.status(200).json(products);
   } catch (error) {
      next(error);
   }
}

async function createProductController(req, res) {
   try {
      const { name, desc, price, discount, stock } = req.body;
      const product = await createProduct(name, desc, price, discount, stock);
      res.status(201).json(product);
   } catch (error) {
      next(error);
   }
}

async function updateProductController(req, res) {
   try {
      const { productId } = req.params;
      const { name, desc, price, discount, stock } = req.body;
      const updatedProduct = await updateProduct(productId, name, desc, price, discount, stock);
      res.status(200).json(updatedProduct);
   } catch (error) {
      next(error);
   }
}

async function deleteProductController(req, res) {
   try {
      const { productId } = req.params;
      await deleteProduct(productId);
      res.status(204).send();
   } catch (error) {
      next(error);
   }
}

module.exports = {
   getProductsController,
   createProductController,
   updateProductController,
   deleteProductController,
};
