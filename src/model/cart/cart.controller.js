const cartModel = require('./cart.model');

class CartController {
  async addToCart(req, res) {
    const userId = req.user.id;
    const productId = req.body.product_id;

      const addedToCart = await cartModel.addToCart(userId, productId);
      return res.status(201).json(addedToCart[0]);
  }

  async removeFromCart(req, res) {
    const userId = req.user.id;
    const productId = req.body.product_id;

      const removedFromCart = await cartModel.removeFromCart(userId, productId);
      return res.json({ message: 'Product removed from cart successfully' });
  }

  async getCartItems(req, res) {
    const userId = req.user.id;

      const cartItems = await cartModel.getCartItems(userId);
      return res.json(cartItems);
  }
}

module.exports = new CartController();
