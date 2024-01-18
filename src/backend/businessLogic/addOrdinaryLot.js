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
  return new Promise((resolve, reject) => {
    try {
      db.serialize(async () => {
        const rem = cost - paidAmount;
        await new Promise((res, rej) => {
          db.run("BEGIN TRANSACTION", function (err) {
            if (err) {
              console.log("failed to start transaction");
              rej();
            } else {
              console.log("i started the treansaction");
              res();
            }
          });
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
        //step2- update product buying price if not suitable to the lot cost
        //------(a)get product Buying price
        const oldProdBuyingPrice = await Product.getBuyingPrice(productID);
        //-----(b)compare prod Buying price to the lot cost divivded by its number of items
        let newBuyingPrice = cost / quantity;
        console.log(
          "here is the prod Buying price",
          oldProdBuyingPrice,
          "and the cost of lot per no of unit",
          newBuyingPrice
        );
        let BuyingPriceChange = false;
        if (oldProdBuyingPrice !== newBuyingPrice) {
          //------(c)update the prod Buying price
          BuyingPriceChange = true;
          await Product.updateBuyingPrice(newBuyingPrice, productID);
        }
        //step2- update product, finance and vendors
        await Product.updateProductQuantity(productID, quantity);
        await updateProductInStockValue(productID, quantity);
        await Finance.changeCashVlaue(-paidAmount);
        await Finance.updatemyDebt(cost - paidAmount);
        await Vendor.changeVendoerOwedMoney(0, lotID, rem); // Use lotID and rem variables
        await new Promise((res, rej) => {
          db.run("COMMIT", function (err) {
            if (err) {
              console.log("failed to commit");
              db.run("rollback");
              rej();
            } else {
              console.log("i committed the transaction");
              res();
            }
          });
        });
        resolve({
          message: "succesfully added an ordinary lot",
          BuyingPriceChange,
          lotID,
        });
      });
    } catch (err) {
      console.log("failed to add ordinary lot", err);
      db.run("rollback");
      reject(err);
    }
  });
};
module.exports = addOrdinaryLot;
