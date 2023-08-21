const express = require('express');
const productController = require('./product.controller');
const authMiddleware = require('../../middleware/auth.middleware');
const ValidationMiddleware = require('../../middleware/validation.middleware');
const CREATE_PRODUCT_DTO = require('./dtos/createProduct.dto');
const UPDATE_PRODUCT_DTO = require('./dtos/updateProduct.dto');

const router = express.Router();

router.get('/products/search', authMiddleware.authenticate, productController.searchProducts);
router.get('/products/:page', authMiddleware.authenticate, productController.getProducts);
router.get('/product/:id', authMiddleware.authenticate, productController.getProduct);
router.post('/products',  authMiddleware.authenticate,ValidationMiddleware(CREATE_PRODUCT_DTO), productController.createProduct);
router.put('/product/:id', authMiddleware.authenticate, ValidationMiddleware(UPDATE_PRODUCT_DTO), productController.updateProduct);
router.delete('/product/:id', authMiddleware.authenticate, productController.deleteProduct);

module.exports = router;
