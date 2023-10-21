const express = require("express");

const router = express.Router();

const lotController = require("../controllers/lotController");

router.post("/add", lotController.addLot);
router.post("/filterdate", lotController.viewFilterDateLots);
router.post("/install", lotController.installLot);
router.post("/delete", lotController.deletLot);
router.get("/view", lotController.viewLots);

// Add other lot-related routes here

module.exports = router;
