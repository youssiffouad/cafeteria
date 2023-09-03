const db = require("./db");
class Category {
  //function to add new category
  static AddCategory = (name, callback) => {
    db.run(`insert into Categories (name) values (?)`, [name], (err) => {
      if (err) {
        callback(err);
        return;
      } else {
        const catID = this.lastID;
        callback(null, {
          message: "category added successfully",
          cat_id: catID,
        });
      }
    });
  };

  //method to view all categories
  static viewCategories = (callback) => {
    db.all(`select c.id ,c.name from Categories c`, (err, rows) => {
      if (err) {
        callback(err);
      } else {
        callback(null, rows);
      }
    });
  };
}
module.exports = Category;
