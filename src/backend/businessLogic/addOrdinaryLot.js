const db = require("../models/db");
const Finance = require("../models/financial");
const Lot = require("../models/Lot");
const Product = require("../models/Product");
const Vendor = require("../models/Vendor");

const addOrdinaryLot = async (
  productID,
  quantity,
  cost,
  paidAmount,
  received_date,
  payment_method
) => {
  try {
    db.serialize(async () => {
      //step1- insert the ordinary lot into lots table
      const lotID = await Lot.insertOrdinaryLot(
        productID,
        quantity,
        cost,
        received_date,
        payment_method
      );

      //step2- update product, finance and vendors
      await Product.updateProductQuantity(productID, quantity);
      await updateProductInStockValue(productID, quantity);
      await Finance.changeCashVlaue(-paidAmount);
      await Vendor.changeVendoerOwedMoney(lotID, rem); // Use lotID and rem variables
    });
  } catch (err) {
    console.log("failed to add ordinary lot", err);
    throw err;
  }
};
