const productModel = require('./product.model');
const NotFoundException = require('../../errors/notFound.exception');
const BadRequestException = require('../../errors/badRequest.exception');

class ProductController {
  async createProduct(req, res) {
    const { name, price, subcategory_id } = req.body;

      const existingProduct = await productModel.getProductByName(name);
      if (existingProduct.length > 0) {
        throw new BadRequestException('Product with this name already exists');
      }

      const existingSubcategory = await productModel.getSubcategoryById(subcategory_id);
      if (existingSubcategory.length === 0) {
        throw new NotFoundException('Subcategory not found');
      }

      const newProduct = await productModel.createProduct(name, price, subcategory_id);
      return res.status(201).json(newProduct[0])
  }

  async getProduct(req, res) {
    const productId = req.params.id;

      const product = await productModel.getProductById(productId);
      if (!product.length) {
        throw new NotFoundException('Product not found');
      }

      return res.json(product[0]);
  }

  async updateProduct(req, res) {
    const productId = req.params.id;
    const { name, price } = req.body;

      const updatedProduct = await productModel.updateProduct(productId, name, price);
      if (!updatedProduct.length) {
        throw new NotFoundException('Product not found');
      }

      return res.json(updatedProduct[0])
  }

  async deleteProduct(req, res) {
    const productId = req.params.id;

      const deletedProduct = await productModel.deleteProduct(productId);
      if (!deletedProduct.length) {
        throw new NotFoundException('Product not found');
      }

      return res.json({ message: 'Product deleted successfully' });
  }

  async getProducts(req, res, next) {
    const page = req.params.page || 1;

    try {
      const products = await productModel.getProductsByPage(page);
      return res.json(products);
    } catch (error) {
      next(error); 
    }
  }

  async searchProducts(req, res) {
    const { query, page } = req.query;

      const products = await productModel.searchProducts(query, page || 1);
      return res.json(products);
  }
}

module.exports = new ProductController();
