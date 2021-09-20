const express = require('express');
const catchAsync = require("../utils/catchAsync");
const {isLoggedIn, isAuthor, validateProduct} = require('../middleware')
const router = express.Router();
const products = require('../controllers/products')


router.route('/')
    .get(catchAsync(products.index))
    .post(isLoggedIn, validateProduct, catchAsync(products.createProduct))

router.get('/new', isLoggedIn, products.renderNewForm)

router.route('/:id')
    .get(isLoggedIn,catchAsync(products.showProduct))
    .put(isAuthor,validateProduct, catchAsync(products.updateProduct))
    .delete(isLoggedIn, isAuthor,catchAsync(products.deleteProduct))

router.get('/:id/edit', isLoggedIn, isAuthor,catchAsync(products.renderEditForm))

module.exports = router;