const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const productsController = require('../controllers/products');

// Store Product
router.post('/store', [body('name').isLength({ min: 5 }).withMessage('Input Name Tidak Sesuai'), body('kategori').isLength({ min: 3 }).withMessage('Input Kategori Tidak Sesuai')], productsController.storeProduct);

// Get All Products
router.get('/products', productsController.getAllProducts);

// Get Product where id
router.get('/product/:productId', productsController.getProductById);

// Update Product
router.put('/product/:productId', [body('name').isLength({ min: 5 }).withMessage('Input Name Tidak Sesuai'), body('kategori').isLength({ min: 3 }).withMessage('Input Kategori Tidak Sesuai')], productsController.updateProduct);

// Delete Product
router.delete('/product/:productId', productsController.deleteProduct);

module.exports = router;
