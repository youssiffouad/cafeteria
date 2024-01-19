const Lot = require("../models/Lot");
const Product = require("../models/Product");
const db = require("../models/db");
const Finance = require("../models/financial");
const Vendor = require("../models/Vendor");
const updateProductInStockValue = require("./updateProdInStock");
//function to delete product lot
const deleteProductLot = async (lotid) => {
  return new Promise((resolve, reject) => {
    try {
      db.serialize(async () => {
        await new Promise((res, rej) => {
          db.run("begin", function (err) {
            if (err) {
              console.log("failed to start txn of deleting product lot", err);
              rej(err);
            } else {
              console.log(
                "succesfully started the txn of deleting product lot"
              );
              res();
            }
          });
        });
        //1- get product id from lotid
        const productID = await Lot.getProductId(lotid);
        //2- get current quantity of the lot
        const quantity = await Lot.getQuantity(lotid);
        //3- we must get cost and remaining payment to get the paid amount
        const rem = await Lot.getRemainingPayment(lotid);
        const cost = await Lot.getCost(lotid);
        const paidAmount = cost - rem;
        //4- decrease the product quantity
        await Product.updateProductQuantity(productID, -quantity);
        //5- decrease product in stock value
        await updateProductInStockValue(productID, -quantity);
        //6-decrease vendor owed money
        //-----(a)-get vendor id from lotid
        const vendor_id = await Vendor.getVendorIdFromLotId(0, lotid);
        await Vendor.changeVendoerOwedMoney(-rem, vendor_id);
        //7- increase cash value and decrease debt value
        await Finance.changeCashVlaue(paidAmount);
        await Finance.updatemyDebt(paidAmount - cost);
        //8- delete the lot row from the lots table
        await Lot.removeLotRow(lotid);
        await new Promise((res, rej) => {
          db.run("commit", (err) => {
            if (err) {
              console.log("failed to commit txn of deleting product lot", err);
              db.run("rollback");
              rej(err);
            } else {
              console.log(
                "succesfully committed the txn of deleting product lot"
              );
              res();
            }
          });
        });
        resolve({ message: "product lot deleted successfully", lotid });
      });
    } catch (err) {
      console.log("error while deleting product lot", err);
      db.run("rollback");
      reject(err);
    }
  });
};
module.exports = deleteProductLot;
