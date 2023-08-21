const categoryModel = require('./category.model');
const NotFoundException = require('../../errors/notFound.exception')

class CategoryController {
  async createCategory(req, res) {
    const { name } = req.body;

      const newCategory = await categoryModel.createCategory(name);
      return res.status(201).json(newCategory[0]);
  }

  async getCategory(req, res) {
    const categoryId = req.params.id;

      const category = await categoryModel.getCategoryById(categoryId);
      if (!category.length) {
        throw new NotFoundException('Category not found');
      }

      return res.json(category[0]);
  }

  async updateCategory(req, res) {
    const categoryId = req.params.id;
    const { name } = req.body;

      const updatedCategory = await categoryModel.updateCategory(categoryId, name);
      if (!updatedCategory.length) {
        throw new NotFoundException('Category not found');
      }

      return res.json(updatedCategory[0]);
  }

  async deleteCategory(req, res) {
    const categoryId = req.params.id;

      const deletedCategory = await categoryModel.deleteCategory(categoryId);
      if (!deletedCategory.length) {
        throw new NotFoundException('Category not found');
      }

      return res.json({ message: 'Category deleted successfully' });
  }

  async createSubcategory(req, res) {
    const categoryId = req.params.category_id;
    const { name } = req.body;

      const newSubcategory = await categoryModel.createSubcategory(categoryId, name);
      return res.status(201).json(newSubcategory[0]);s
  }

  async getSubcategory(req, res) {
    const subcategoryId = req.params.id;

      const subcategory = await categoryModel.getSubcategoryById(subcategoryId);
      if (!subcategory.length) {
        throw new NotFoundException('Subcategory not found');
      }

      return res.json(subcategory[0]);
  }

  async updateSubcategory(req, res) {
    const subcategoryId = req.params.id;
    const { name } = req.body;

      const updatedSubcategory = await categoryModel.updateSubcategory(subcategoryId, name);
      if (!updatedSubcategory.length) {
        throw new NotFoundException('Subcategory not found');
      }

      return res.json(updatedSubcategory[0]);
  }

  async deleteSubcategory(req, res) {
    const subcategoryId = req.params.id;

      const deletedSubcategory = await categoryModel.deleteSubcategory(subcategoryId);
      if (!deletedSubcategory.length) {
         throw new NotFoundException("Subcategory not found");
      }

      return res.json({ message: 'Subcategory deleted successfully' });
  }

  async getSubcategoriesByCategory(req, res) {
    const categoryId = req.params.category_id;

      const subcategories = await categoryModel.getSubcategoriesByCategory(categoryId);
      return res.json(subcategories);
  }
}

module.exports = new CategoryController();
