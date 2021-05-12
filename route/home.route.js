var express = require('express');
var router = express.Router();
var homeController = require('../controller/home.controller')

router.get('/', homeController.index)
router.get('/product-detail', homeController.productDetail)
router.get('/category', homeController.productByCat)
router.get('/cart',homeController.requireAuth,homeController.checkCUS, homeController.cart)
router.get('/add-to-cart',homeController.requireAuth,homeController.checkCUS, homeController.addtocart)
router.get('/remove-cart-item',homeController.requireAuth,homeController.checkCUS, homeController.removeCartItem)
router.get('/checkout',homeController.requireAuth,homeController.checkCUS, homeController.checkout)
router.get('/login', homeController.login)
router.post('/login', homeController.postLogin)
router.get('/logout', homeController.logout)

module.exports = router