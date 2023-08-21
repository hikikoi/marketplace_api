const express = require('express');
const cartController = require('./cart.controller');
const authMiddleware = require('../../middleware/auth.middleware');
const ValidationMiddleware = require('../../middleware/validation.middleware')
const CART_DTO = require('./dtos/cart.dto')

const router = express.Router();


router.get('/cart',authMiddleware.authenticate, cartController.getCartItems);
router.post('/cart/add',authMiddleware.authenticate,ValidationMiddleware(CART_DTO), cartController.addToCart);
router.delete('/cart/remove',authMiddleware.authenticate, cartController.removeFromCart);

module.exports = router;