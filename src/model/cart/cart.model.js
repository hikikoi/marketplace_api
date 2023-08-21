const PostgresModel = require('../postgres/postgres.model');

class CartModel extends PostgresModel {
  async addToCart(userId, productId) {
    const SQL = 'INSERT INTO cart (user_id, product_id) VALUES ($1, $2) RETURNING *';
    return this.fetch(SQL, userId, productId);
  }

  async removeFromCart(userId, productId) {
    const SQL = 'DELETE FROM cart WHERE user_id = $1 AND product_id = $2 RETURNING *';
    return this.fetch(SQL, userId, productId);
  }

  async getCartItems(userId) {
    const SQL = `
      SELECT p.* FROM products p
      JOIN cart c ON p.id = c.product_id
      WHERE c.user_id = $1;
    `;
    return this.fetch(SQL, userId);
  }
}

module.exports = new CartModel();
