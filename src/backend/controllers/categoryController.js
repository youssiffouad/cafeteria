const Category = require("../models/category");

//calling of function to add new category
exports.addCategory = (req, res) => {
  const { name } = req.body;
  Category.AddCategory(name, (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "internal server error failed to add category" });
    } else {
      res.status(200).json(result);
    }
  });
};

//calling of function to view all categories
exports.viewCategories = (req, res) => {
  Category.viewCategories((err, catrgories) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "internal server error failed to view all categories" });
    } else {
      console.log(catrgories);
      res.status(200).json(catrgories);
    }
  });
};
