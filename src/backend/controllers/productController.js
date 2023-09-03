const Product = require("../models/Product");

//calling of function to add new product
exports.addProduct = (req, res) => {
  const { name, vendor_id, catid, selling_price, quantity } = req.body;
  Product.addProduct(
    name,
    vendor_id,
    catid,
    selling_price,
    quantity,
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json(result);
      }
    }
  );
};

//calling of funstion to view all products
exports.viewProducts = (req, res) => {
  Product.viewProducts((err, products) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "internal server error failed to load Products" });
    } else {
      // console.log("here are the products");
      // console.log(products);
      res.status(200).json(products);
    }
  });
};

//calling of fn to view products of certain categories
exports.filterCategoryProducts = (req, res) => {
  const { catid } = req.body;
  Product.filterCategoryProduct(catid, (err, products) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "failed to filter products" });
    } else {
      console.log(products);
      res.status(200).json(products);
    }
  });
};

// Add other product-related controller methods here
