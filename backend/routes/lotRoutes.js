const express = require("express");

const router = express.Router();

const lotController = require("../controllers/lotController");

router.post("/addordinaryLot", lotController.addOrdinaryLot);
router.post("/addcomponentLot", lotController.addComponentLot);
router.post("/filterdate", lotController.viewFilterDateLots);
router.post("/install", lotController.installLot);
router.post("/deleteProductLot", lotController.deleteProductLot);
router.post("/deleteComponentLot", lotController.deleteComponentLot);
router.get("/view", lotController.viewLots);

// Add other lot-related routes here

module.exports = router;
