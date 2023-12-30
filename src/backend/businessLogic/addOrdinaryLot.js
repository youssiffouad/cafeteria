const db = require("../models/db");
const Finance = require("../models/financial");
const Lot = require("../models/Lot");
const Product = require("../models/Product");
const Vendor = require("../models/Vendor");
const updateProductInStockValue = require("../businessLogic/updateProdInStock");

const addOrdinaryLot = (
  productID,
  quantity,
  cost,
  paidAmount,
  received_date,
  payment_method
) => {
  try {
    db.serialize(async () => {
      const rem = cost - paidAmount;
      db.run("BEGIN TRANSACTION");
      //step1- insert the ordinary lot into lots table
      const lotID = await Lot.insertOrdinaryLot(
        productID,
        quantity,
        cost,
        paidAmount,
        received_date,
        payment_method
      );

      //step2- update product, finance and vendors
      await Product.updateProductQuantity(productID, quantity);
      await updateProductInStockValue(productID, quantity);
      await Finance.changeCashVlaue(-paidAmount);
      await Vendor.changeVendoerOwedMoney(0, lotID, rem); // Use lotID and rem variables
      db.run("COMMIT");
    });
  } catch (err) {
    db.run("ROLLBACK");
    console.log("failed to add ordinary lot", err);
    throw err;
  }
};
module.exports = addOrdinaryLot;
