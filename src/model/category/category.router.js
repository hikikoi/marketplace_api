const express = require('express');
const categoryController = require('./category.controller');
const authMiddleware = require('../../middleware/auth.middleware');
const ValidationMiddleware = require('../../middleware/validation.middleware');
const CATEGORY_DTO = require('./dtos/category.dto');

const router = express.Router();

router.get('/categories/:id',authMiddleware.authenticate, categoryController.getCategory);
router.post('/categories',authMiddleware.authenticate,ValidationMiddleware(CATEGORY_DTO), categoryController.createCategory);
router.put('/categories/:id',authMiddleware.authenticate, ValidationMiddleware(CATEGORY_DTO), categoryController.updateCategory);
router.delete('/categories/:id',authMiddleware.authenticate, categoryController.deleteCategory);

router.get('/subcategories/:id',authMiddleware.authenticate, categoryController.getSubcategory);
router.get('/subcategories/category/:category_id',authMiddleware.authenticate, ValidationMiddleware(CATEGORY_DTO), categoryController.getSubcategoriesByCategory);
router.post('/categories/:category_id/subcategories',authMiddleware.authenticate, categoryController.createSubcategory);
router.put('/subcategories/:id',authMiddleware.authenticate, ValidationMiddleware(CATEGORY_DTO), categoryController.updateSubcategory);
router.delete('/subcategories/:id',authMiddleware.authenticate, categoryController.deleteSubcategory);

module.exports = router;
