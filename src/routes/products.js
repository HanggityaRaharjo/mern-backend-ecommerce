const express = require('express');

const router = express.Router();

const productsController = require('../controllers/products');

// Store Product
router.post('/product', productsController.storeProduct);

// Get Product
router.get('/products', productsController.getAllProducts);



module.exports = router;
