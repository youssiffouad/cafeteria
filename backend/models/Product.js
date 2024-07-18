const deleteLotsOfProduct = require("../businessLogic/deleteAllLotsOfCertainProduct");
const db = require("./db");
const Lot = require("./Lot");
const EventEmitter = require("../utils/EventEmitter");
const eventEmitter = new EventEmitter();
console.log("step1 i created event object");

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
          //emit event of adding new product
          eventEmitter.emit("productAdded", {
            description: "تم اضافة منتج جديد",
            name,
            selling_price,
            buying_price,
          });
          console.log(`step 3 i emitted event to execute listeners`);
          if (callback)
            callback(null, {
              message: "Product added successfully",
              prod_id: this.lastID,
            });
        }
      }
    );
  }
  static on(argevent, arglistener) {
    eventEmitter.on(argevent, arglistener);
    console.log(
      `step 2 i added listener ${arglistener} to certain event ${argevent}`
    );
  }

  //function to delete all Products of certain categories
  static deleteAllProdOfCertainCategory = async (catid) => {
    return new Promise((res, rej) => {
      const sql = "delete from Products where category_id =?";
      db.run(sql, [catid], function (err) {
        if (err) {
          console.log("failed to delete all products of certain category");
          rej(err);
        } else {
          console.log("successfully deleted all Products of category", catid);
          res({ message: "successfully deleted all Products of category" });
        }
      });
    });
  };
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
  //function to get buying price of certain product
  static getBuyingPrice(productID) {
    return new Promise((res, rej) => {
      const sql = `SELECT buying_price FROM Products WHERE id = ?`;
      db.get(sql, productID, function (err, row) {
        if (err) {
          console.log(`failed to get buying price of${productID}`, err);
          rej(err);
        } else {
          console.log(`successfully got the buying price ${row.buying_price}`);
          res(row.buying_price);
        }
      });
    });
  }

  //function to update selling price of product
  static updateSellingPrice = async (selling_price, productId) => {
    return new Promise((res, rej) => {
      const sql = "update Products set selling_price =? where id =? ";
      const params = [selling_price, productId];
      db.run(sql, params, function (err) {
        if (err) {
          console.log("failed to update seeling price of the product");
          rej(err);
        } else {
          console.log("successfully updated selling price of the product");
          res();
        }
      });
    });
  };

  //function to update Product Buying Price
  static updateBuyingPrice = async (buying_price, productId) => {
    return new Promise((res, rej) => {
      const sql = "update Products set buying_price =? where id =? ";
      const params = [buying_price, productId];
      db.run(sql, params, function (err) {
        if (err) {
          console.log("failed to update buying price of product");
          rej(err);
        } else {
          console.log("successfully updated buying price of product");
          res();
        }
      });
    });
  };
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
