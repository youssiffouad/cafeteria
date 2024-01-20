const express = require("express");
const router = express.Router();
const componentController = require("../controllers/componentController");

router.post("/addcomponent", componentController.addComponent);
router.all("/viewcomponent", componentController.viewComponents);
router.post("/deletecomponent", componentController.deleteComponent);
router.post(
  "/updateComponentPricePerUnit",
  componentController.updateComponentPricePerUnit
);
module.exports = router;
