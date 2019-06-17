const express = require('express');
const router = express.Router();
//auth middleware
const { ensureUser } = require('../middleware/auth');
const { admin } = require('../middleware/admin');
const {
  createBrand,
  createWood,
  getWoods,
  getBrands,
  addProduct,
  getProductById,
  getProductByOrder,
  getProductsByFilters
} = require('../handler/productHandler');

/**********CATEGORIES************* */
//Brand Routes
router.post('/brand', ensureUser, admin, createBrand);
router.get('/brands', getBrands);
//woods routes
router.post('/wood', ensureUser, admin, createWood);
router.get('/woods', getWoods);
/**********PRODUCTS************* */
//api/product/article
router.post('/article', ensureUser, admin, addProduct);
//api/product/article_by_id?id=5b2d38217d75e2cdcb31cf05&type=single
router.get('/articles_by_id', getProductById);
///article?sortBy=createdAt&order=desc&limit=4
///article?sortBy=sold&order=desc&limit=4
router.get('/articles', getProductByOrder);

//api/product/shop
router.post('/shop', getProductsByFilters);

module.exports = router;
