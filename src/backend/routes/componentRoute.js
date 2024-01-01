const express = require("express");
const router = express.Router();
const componentController = require("../controllers/componentController");

router.post("/addcomponent", componentController.addComponent);
router.post("/deletecomponent", componentController.deleteComponent);
module.exports = router;
