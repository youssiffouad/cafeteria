const db = require("./db");

class Product {
  //function to add new product
  static addProduct(
    name,
    vendor_id,
    cat_id,
    selling_price,
    buying_price,
    quantity,
    callback
  ) {
    db.run("pragma foreign_keys=on");
    db.run(
      `INSERT INTO Products (name, vendor_id,category_id, selling_price,buying_price, quantity) VALUES (?,?, ?, ?,?, ?)`,
      [name, vendor_id, cat_id, selling_price, buying_price, quantity],
      function (err) {
        if (err) {
          console.error(err);
          callback(err);
        } else {
          callback(null, {
            message: "Product added successfully",
            prod_id: this.lastID,
          });
        }
      }
    );
  }
  //function to view all products with vendor details
  static viewProducts(callback) {
    db.all(
      `select p.name as prodname, p.id,c.name as catname,
       p.selling_price,p.buying_price,p.quantity, v.name as vendorname from Products p join Vendors v join Categories c 
        on v.id=p.vendor_id and c.id=p.category_id`,
      (err, rows) => {
        if (err) {
          callback(err);
        } else {
          callback(null, rows);
        }
      }
    );
  }
  //function to view products of certain category
  static filterCategoryProduct = (catid, callback) => {
    db.all(
      `select p.name ,p.selling_price,p.buying_price, p.id from Products p where p.category_id= ? `,
      [catid],
      (err, rows) => {
        if (err) {
          callback(err);
        } else {
          console.log(`the received catid is ${catid}`);
          callback(null, rows);
        }
      }
    );
  };

  //function to get selling price of certain product
  static getSellingPrice(productID) {
    return new Promise((res, rej) => {
      const sql = `SELECT selling_price FROM Products WHERE id = ?`;
      db.get(sql, productID, function (err, row) {
        if (err) {
          console.log(`failed to get selling price of${productID}`, err);
          rej(err);
        } else {
          console.log(
            `successfully got the selling price ${row.selling_price}`
          );
          res(row.selling_price);
        }
      });
    });
  }

  // Function to update product quantity in the Products table
  static async updateProductQuantity(productID, quantity) {
    await new Promise((resolve, reject) => {
      db.run(
        `UPDATE Products SET quantity = quantity + ? WHERE id = ?`,
        [quantity, productID],
        function (err) {
          if (err) {
            console.error(
              `failed to update product ${productID} with quantity ${quantity}`,
              err
            );
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  // Add other product-related methods here
}

module.exports = Product;
