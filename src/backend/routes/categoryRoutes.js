const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/categoryController");

router.post("/add", CategoryController.addCategory);
router.get("/view", CategoryController.viewCategories);

module.exports = router;
