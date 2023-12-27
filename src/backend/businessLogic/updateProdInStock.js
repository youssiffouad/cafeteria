const Finance = require("../models/financial");
const Product = require("../models/Product");

// Function to update productsInStockValue in the Financial table
async function updateProductInStockValue(productID, quantity) {
  try {
    //step1- get selling price of the product
    const sellingPrice = await Product.getSellingPrice(productID);
    const addedValue = sellingPrice * quantity;
    console.log(`added value is ${addedValue}`);

    //step 2- insert the new value into producinstock in financial table
    await Finance.updateProdInStocKCakue(addedValue);
  } catch (error) {
    console.error("failed to update prodInStockValue", error);
  }
}

module.exports = updateProductInStockValue;
