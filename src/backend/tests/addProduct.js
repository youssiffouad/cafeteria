const { addProduct } = require("../models/Product");
const Product = require("../models/Product");

Product.addProduct("rozblban", 1, 1, 20, 15, 0, (err, res) => {
  console.log(res);
});

Product.viewProducts((err, rows) => {
  console.log("from test", rows);
});
