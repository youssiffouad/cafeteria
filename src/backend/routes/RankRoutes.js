const express = require("express");
const router = express.Router();

const RankController = require("../controllers/rankController");

router.post("/add", RankController.addRank);
router.get("/view", RankController.viewRanks);
module.exports = router;
