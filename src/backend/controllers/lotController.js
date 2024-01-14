const Lot = require("../models/Lot");
const addOrdinaryLot = require("../businessLogic/addOrdinaryLot");
const addComponentLot = require("../businessLogic/addComponentLot");

//calling of function to add new ordinary(product)lot
exports.addOrdinaryLot = async (req, res) => {
  try {
    const {
      productID,
      quantity,
      cost,
      paidAmount,
      received_date,
      payment_method,
    } = req.body;
    const response = await addOrdinaryLot(
      productID,
      quantity,
      cost,
      paidAmount,
      received_date,
      payment_method
    );
    res.status(200).json(response);
  } catch (err) {
    console.log("failed to add new ordinary lot", err);
    res
      .status(500)
      .json({ error: "internal server error failed to add ordinary lot" });
  }
};

//controller to add new component lot
exports.addComponentLot = async (req, res) => {
  try {
    const {
      quantity,
      cost,
      paidAmount,
      received_date,
      payment_method,
      component_id,
    } = req.body;
    const response = await addComponentLot(
      quantity,
      cost,
      paidAmount,
      received_date,
      payment_method,
      component_id
    );
    res.status(200).json(response);
  } catch (err) {
    console.log("failed to add new component lot", err);
    res
      .status(500)
      .json({ error: "internal server error failed to add new component lot" });
  }
};

//calling of fn to delete lot(either product lot or component lot)
exports.deleteProductLot = async (req, res) => {
  try {
    const { Lotid } = req.body;
    const result = await Lot.deleteProductLot(Lotid);
    res.status(200).json(result);
  } catch (err) {
    console.log("failed to delete product lot ", err);
    res
      .status(500)
      .json({ error: "internal server error failed to delete product lot" });
  }
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
