const Rank = require("../models/rank");

//calling of fn to add new rank
exports.addRank = (req, res) => {
  const { name } = req.body;
  Rank.AddRank(name, (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Internal server error: Failed to add rank" });
    } else {
      res.status(200).json(result);
    }
  });
};

//calling of fn to view all ranks
exports.viewRanks = (req, res) => {
  Rank.viewRanks((err, rankrecords) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "failed to view all ranks internal server error" });
    } else {
      res.status(200).json(rankrecords);
      console.log(`here are the ranks ${rankrecords}`);
    }
  });
};
