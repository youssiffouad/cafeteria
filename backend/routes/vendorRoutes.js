const express = require("express");
const router = express.Router();
const vendorController = require("../controllers/vendorController");

router.post("/add", vendorController.addVendor);
router.get("/view", vendorController.viewVendors);

// Add other vendor-related routes here

module.exports = router;
