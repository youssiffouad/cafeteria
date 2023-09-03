const Lot = require("../models/Lot");

//calling of function to add new lot
exports.addLot = (req, res) => {
  const { productID, quantity, cost, received_date } = req.body;
  Lot.addLot(productID, quantity, cost, received_date, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(result);
    }
  });
};

//calling of function to view all lots in certain interval
exports.viewFilterDateLots = (req, res) => {
  const { startdate, enddate } = req.body;
  Lot.viewFilterDateLots(startdate, enddate, (err, lots) => {
    if (err) {
      console.error(err);
      res.status(500).json("Internal server errror failed to get lots");
    } else {
      console.log(lots);
      res.status(200).json(lots);
    }
  });
};

//calling of fn to view all lots
exports.viewLots = (req, res) => {
  Lot.viewLots((err, lotrecords) => {
    if (err) {
      console.log("a7a");
      console.error(err);

      res
        .status(500)
        .json({ error: "Internal Server Error failed to get all lots" });
    } else {
      console.log("lot records");
      console.log(lotrecords);
      res.status(200).json(lotrecords);
    }
  });
};
// Add other lot-related controller methods here
