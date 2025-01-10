const express = require('express')
const { upload } = require('../cloudinary');
const { handleAddProduct, handleUpdateProduct, handleGetAllProducts, handleGetAProduct, handleDeleteProduct } = require('../controllers/productControllers')
const router = express.Router();

router.post('/add-product', upload.fields([{name: 'image1'}, {name:'image2'}]), handleAddProduct);
router.put('/update-product/:id', upload.fields([{name: 'image1'}, {name:'image2'}]), handleUpdateProduct);
router.get('/get-all-products', handleGetAllProducts);
router.get('/get-product/:id', handleGetAProduct);
router.delete('/delete-product/:id', handleDeleteProduct);

module.exports = router