const db = require("./db");
const products = require("./Product");
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

  // Method to delete a category by ID
  static deleteCategory = async (id) => {
    try {
      await new Promise((res, rej) => {
        db.run("begin", (err) => {
          if (err) {
            console.log("failed to start txn of deleting category");
            rej(err);
          } else {
            console.log("successuflly started the txn of deleting category");
            res();
          }
        });
      });
      //delete products depending on categories
      await products.deleteAllProdOfCertainCategory(id);
      db.run(`DELETE FROM Categories WHERE id = ?`, [id], function (err) {
        if (err) {
          console.log(
            "error while deleting certain category from categories table"
          );

          throw new Error(err);
        } else {
          console.log(`Category with ID ${id} deleted successfully`, id);
          return;
        }
      });
      await new Promise((res, rej) => {
        db.run("commit", function (err) {
          if (err) {
            console.log("failed to commit of deleting category");
            rej(err);
          } else {
            console.log("successfully commited txn of deleting category");
            res();
          }
        });
      });
      return { message: "successfully deleted category" };
    } catch (err) {
      console.log("failed to delete category", err);
      db.run("rollback");
      throw err;
    }
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
