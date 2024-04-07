const Category = require("../models/category");

Category.AddCategory("trial3", (err, result) => {
  console.log(result);
});
Category.viewCategories((err, rows) => {
  console.log(rows);
});
