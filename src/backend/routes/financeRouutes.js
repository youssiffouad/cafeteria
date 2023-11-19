const express = require("express");
const router = express.Router();
const financialCOntroller = require("../controllers/financialController");

router.get("/view", financialCOntroller.viewFinanace);
router.post("/reset", financialCOntroller.resetFinance);

module.exports = router;
