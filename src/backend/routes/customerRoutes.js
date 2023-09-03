const express = require("express");
const router = express.Router();
const CustomerController = require("../controllers/customerController");

router.post("/add", CustomerController.addCustomer);
router.post("/filterbyrank", CustomerController.filterbyRank);
router.get("/view", CustomerController.viewAll);

module.exports = router;
