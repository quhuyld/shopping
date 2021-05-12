var express = require('express');
var router = express.Router();
var adminController = require('../controllers/admin.controller')

var multer  = require('multer')
var upload = multer({ dest: './public/uploads/' })

router.get('/pro',adminController.requireAuth,adminController.checkAdmin, adminController.index)
router.get('/cat',adminController.requireAuth,adminController.checkAdmin, adminController.cat)
router.get('/user',adminController.requireAuth,adminController.checkAdmin, adminController.user)
router.get('/add-user',adminController.requireAuth,adminController.checkAdmin, adminController.addUser)
router.post('/add-user',adminController.requireAuth,adminController.checkAdmin, adminController.postAddUser)
router.get('/edit-user',adminController.requireAuth,adminController.checkAdmin, adminController.editUser)
router.get('/delete-user',adminController.requireAuth,adminController.checkAdmin, adminController.deleteUser)
router.post('/edit-user',adminController.requireAuth,adminController.checkAdmin, adminController.postEditUser)
router.get('/add-product',adminController.requireAuth,adminController.checkAdmin, adminController.addPro)
router.get('/add-cat',adminController.requireAuth,adminController.checkAdmin, adminController.addCat)
router.post('/add-cat',adminController.requireAuth,adminController.checkAdmin, adminController.postAddCat)
router.get('/edit-cat',adminController.requireAuth,adminController.checkAdmin, adminController.editCat)
router.post('/edit-cat',adminController.requireAuth,adminController.checkAdmin, adminController.postEditCat)
router.get('/edit-product',adminController.requireAuth,adminController.checkAdmin, adminController.editPro)
router.post('/add-product',adminController.requireAuth,adminController.checkAdmin, upload.single('file'), adminController.postAddPro)
router.post('/edit-product',adminController.requireAuth,adminController.checkAdmin, upload.single('file'), adminController.postEditPro)
router.get('/delete-product',adminController.requireAuth,adminController.checkAdmin, adminController.delete)
router.get('/delete-cat',adminController.requireAuth,adminController.checkAdmin, adminController.deleteCat)
router.get('/order',adminController.requireAuth,adminController.checkAdmin, adminController.order)
router.get('/order-details',adminController.requireAuth,adminController.checkAdmin, adminController.orderDetails)
router.get('/logout', adminController.logout)
module.exports = router