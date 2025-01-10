const express = require('express')
const { upload } = require('../cloudinary');
// const { handleAddProduct, handleUpdateProduct, handleGetAllProducts, handleGetAProduct, handleDeleteProduct } = require('../controllers/productControllers')
const { handleAddProduct } = require('../controllers/productControllers')
const router = express.Router();

router.post('/add-product', upload.fields([{name: 'image1'}, {name:'image2'}]), handleAddProduct)
// router.post('/update-product', handleUpdateProduct)
// router.post('/get-all-products', handleGetAllProducts)
// router.post('/get-product/:id', handleGetAProduct)
// router.post('/delete-product', handleDeleteProduct)

module.exports = router