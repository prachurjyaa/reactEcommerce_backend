const express = require('express');
const { getProducts, createProduct, updateProduct, deleteProduct,bulk } = require('../controllers/productController');
const { productLimiter } = require('../middlewares/ratelimit');

const router = express.Router();

router.get('/', getProducts);
router.post('/', productLimiter, createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.post('/bulk', bulk);

module.exports = router;
