const express = require('express')
const { handleAddProductToCart, handleUpdateCartItems, handleFetchCartItems, handleDeleteCartItems } = require("../controllers/cartControllers")

const router = express.Router();

router.post("/addProductToCart", handleAddProductToCart)
router.get("/getProductFromCart/:userId", handleFetchCartItems)

module.exports = router;