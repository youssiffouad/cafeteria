const Product = require("../models/Product");

// Product.addProduct("rozblban", 1, 3, 20, 15, 0, (err, res) => {
//   console.log(res);
// });

Product.viewProducts((err, rows) => {
  console.log("from test", rows);
});
