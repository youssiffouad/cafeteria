const Lot = require("../models/Lot");
const addOrdinaryLot = require("../businessLogic/addOrdinaryLot");
const addComponentLot = require("../businessLogic/addComponentLot");

//calling of function to add new ordinary(product)lot
exports.addOrdinaryLot = async (req, res) => {
  const {
    productID,
    quantity,
    cost,
    paidAmount,
    received_date,
    payment_method,
  } = req.body;
  await addOrdinaryLot(
    productID,
    quantity,
    cost,
    paidAmount,
    received_date,
    payment_method
  );
};

//controller to add new component lot
exports.addComponentLot = async (req, res) => {
  const {
    quantity,
    cost,
    paidAmount,
    received_date,
    payment_method,
    component_id,
  } = req.body;
  await addComponentLot(
    quantity,
    cost,
    paidAmount,
    received_date,
    payment_method,
    component_id
  );
};

//calling of fn todelete lot
exports.deletLot = (req, res) => {
  const { Lotid } = req.body;
  Lot.deleteLot(Lotid, (err, result) => {
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
      res.status(200).json(lots);
    }
  });
};

//calling of fn to view all lots
exports.viewLots = (req, res) => {
  Lot.viewLots((err, lotrecords) => {
    if (err) {
      console.error(err);

      res
        .status(500)
        .json({ error: "Internal Server Error failed to get all lots" });
    } else {
      res.status(200).json(lotrecords);
    }
  });
};

//calling of fn to insatll payment of certain lot
exports.installLot = async (req, res) => {
  const { lot_id } = req.body;
  console.log(
    `yalahahahahahahahahahahwywywywywywywywywhahahahaywywywywywywywhahahawyywywywywyw${lot_id}`
  );
  await Lot.installLot(lot_id);
};
// Add other lot-related controller methods here
