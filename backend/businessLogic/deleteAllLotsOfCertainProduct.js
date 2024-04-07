const Lot = require("../models/Lot");
const deleteProductLot = require("./deleteProductLot");
const db = require("../models/db");

//function to delete all lots of certain product
async function deleteLotsOfProduct(productId) {
  try {
    //step1-get all lots of certain productt
    const lotIds = await Lot.getLotsOfProduct(productId);
    console.log("here are hte lot ids", lotIds);
    await Promise.all(
      lotIds.map(async (lotid) => await deleteProductLot(lotid.id))
    );
  } catch (err) {
    throw err;
  }
}

//function to delete certain Product(u have to delete its lots also)
exports.deleteProduct = async (prod_id) => {
  return new Promise(async (res, rej) => {
    await deleteLotsOfProduct(prod_id);
    const sql = "delete from Products where id = ?";
    db.run(sql, prod_id, function (err) {
      if (err) {
        console.log("failed to delte Product with certain id", prod_id);
        rej(err);
      } else {
        console.log("successfully deleted the  product with id", prod_id);
        res({ message: "successfully deleted the  product" });
      }
    });
  });
};
