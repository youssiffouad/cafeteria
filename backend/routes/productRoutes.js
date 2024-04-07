const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/add", productController.addProduct);
router.get("/view", productController.viewProducts);
router.post("/filtercategory", productController.filterCategoryProducts);
router.post("/delete", productController.deleteProduct);

// Add other product-related routes here

module.exports = router;
