const express = require("express");
const router = express.Router();
const sandwichController = require("../controllers/sandwichController");

router.post("/addSandwich", sandwichController.addSandwich);
router.post("/deleteSandwich", sandwichController.deleteSandwich);
router.all("/viewSandwiches", sandwichController.viewSandwiches);

module.exports = router;
