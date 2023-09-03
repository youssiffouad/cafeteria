const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/add", orderController.addOrder);

router.get("/view", orderController.viewOrders);
router.post("/filterdate", orderController.filterOrdersDate);
router.post("/filtercust", orderController.filterOrderCust);
router.post("/filtercustand date", orderController.filterOrderCustandDate);
router.post("/delete", orderController.deleteOrder);

module.exports = router;
