const PostgresModel = require('../postgres/postgres.model');

class ProductModel extends PostgresModel {

  async getProductByName(name) {
    const SQL = 'SELECT * FROM products WHERE name = $1';
    return this.fetch(SQL, name);
  }

  async getSubcategoryById(id) {
    const SQL = 'SELECT * FROM subcategories WHERE id = $1';
    return this.fetch(SQL, id);
  }

  async createProduct(name, price, subcategoryId) {
    const SQL = 'INSERT INTO products (name, price, subcategory_id) VALUES ($1, $2, $3) RETURNING *';
    return this.fetch(SQL, name, price, subcategoryId);
  }

  async getProductById(id) {
    const SQL = 'SELECT * FROM products WHERE id = $1';
    return this.fetch(SQL, id);
  }

  async updateProduct(id, name, price) {
    const SQL = 'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *';
    return this.fetch(SQL, name, price, id);
  }

  async deleteProduct(id) {
    const SQL = 'DELETE FROM products WHERE id = $1 RETURNING *';
    return this.fetch(SQL, id);
  }

  async getProductsByPage(page) {
    const itemsPerPage = 10;
    const offset = (page - 1) * itemsPerPage;
    const SQL = 'SELECT * FROM products ORDER BY id ASC LIMIT $1 OFFSET $2';
    return this.fetch(SQL, itemsPerPage, offset);
  }

  async getProductsByCategoryPage(categoryId, page) {
    const itemsPerPage = 10;
    const offset = (page - 1) * itemsPerPage;
    const SQL = 'SELECT * FROM products WHERE subcategory_id = $1 LIMIT $2 OFFSET $3';
    return this.fetch(SQL, categoryId, itemsPerPage, offset);
  }

  async searchProducts(query, page) {
    const itemsPerPage = 10;
    const offset = (page - 1) * itemsPerPage;
    const SQL = `
      SELECT * FROM products
      WHERE name ILIKE $1
      LIMIT $2 OFFSET $3
    `;
    return this.fetch(SQL, `%${query}%`, itemsPerPage, offset);
  }
}

module.exports = new ProductModel();
