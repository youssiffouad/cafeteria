const db = require("../models/db");
const Finance = require("../models/financial");
const Lot = require("../models/Lot");
const Product = require("../models/Product");
const Vendor = require("../models/Vendor");
const updateProductInStockValue = require("../businessLogic/updateProdInStock");

const addOrdinaryLot = async (
  productID,
  quantity,
  cost,
  paidAmount,
  received_date,
  payment_method
) => {
  try {
    const rem = cost - paidAmount;
    db.run("BEGIN TRANSACTION", function (err) {
      console.log("i stttttttttttaaaaaaaaarted the transaction");
    });
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
    db.run("COMMIT", function (err) {
      console.log(
        "i coooooooooooooooommmmiiiiiiiiiittteeeeeeeeeeedddddddddddddd the transaction"
      );
    });
  } catch (err) {
    db.run("ROLLBACK", function (err) {
      console.log(
        "i roooooooooolllllllllllllllleeeeeeeeeeedddddddd baaaaaaaaaack the transaction"
      );
    });
    console.log("failed to add ordinary lot", err);
    throw err;
  }
};
module.exports = addOrdinaryLot;
