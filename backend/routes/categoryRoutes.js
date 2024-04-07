const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/categoryController");

router.post("/add", CategoryController.addCategory);
router.get("/view", CategoryController.viewCategories);
router.post("/delete", CategoryController.deleteCategory);

module.exports = router;
