const PostgresModel = require('../postgres/postgres.model');

class CategoryModel extends PostgresModel {
  async createCategory(name) {
    const SQL = 'INSERT INTO categories (name) VALUES ($1) RETURNING *';
    return this.fetch(SQL, name);
  }

  async getCategoryById(id) {
    const SQL = 'SELECT * FROM categories WHERE id = $1';
    return this.fetch(SQL, id);
  }

  async updateCategory(id, name) {
    const SQL = 'UPDATE categories SET name = $1 WHERE id = $2 RETURNING *';
    return this.fetch(SQL, name, id);
  }

  async deleteCategory(id) {
    const SQL = 'DELETE FROM categories WHERE id = $1 RETURNING *';
    return this.fetch(SQL, id);
  }

  async createSubcategory(categoryId, name) {
    const SQL = 'INSERT INTO subcategories (category_id, name) VALUES ($1, $2) RETURNING *';
    return this.fetch(SQL, categoryId, name);
  }

  async getSubcategoryById(id) {
    const SQL = 'SELECT * FROM subcategories WHERE id = $1';
    return this.fetch(SQL, id);
  }

  async updateSubcategory(id, name) {
    const SQL = 'UPDATE subcategories SET name = $1 WHERE id = $2 RETURNING *';
    return this.fetch(SQL, name, id);
  }

  async deleteSubcategory(id) {
    const SQL = 'DELETE FROM subcategories WHERE id = $1 RETURNING *';
    return this.fetch(SQL, id);
  }

  async getSubcategoriesByCategory(categoryId) {
    const SQL = 'SELECT * FROM subcategories WHERE category_id = $1';
    return this.fetch(SQL, categoryId);
  }
}

module.exports = new CategoryModel();
