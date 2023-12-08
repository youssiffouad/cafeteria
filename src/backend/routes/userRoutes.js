const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.post("/add", usersController.addUser);
router.post("/authenticateUser", usersController.authenticateUser);

// Add other vendor-related routes here

module.exports = router;
