const db = require("./db");
const finance = require("../models/financial");

class Vendor {
  //function to add new vendor
  static addVendor(name, phone, callback) {
    db.run(
      `INSERT INTO Vendors (name, phone,owedmoney) VALUES (?, ?,?)`,
      [name, phone, 0],
      function (err) {
        if (err) {
          console.error(err);
          callback(err);
        } else {
          callback(null, {
            message: "Vendor added successfully",
            vendor_id: this.lastID,
          });
        }
      }
    );
  }
  //method to view all vendors
  static viewVendors(callback) {
    db.all(
      `select v.id,v.name ,v.owedmoney, v.phone from Vendors v `,
      (err, rows) => {
        if (err) {
          callback(err);
        } else {
          callback(null, rows);
        }
      }
    );
  }

  //function to get owed money of certain vendor
  static getOwedMoneyOfvendor = async (vendorId) => {
    return new Promise((res, rej) => {
      const sql = `SELECT owedmoney FROM Vendors WHERE id = ?`;
      db.get(sql, vendorId, function (err, row) {
        if (err) {
          rej(err);
        } else {
          res(row.owed_money);
        }
      });
    });
  };

  //fn to change vendor owedmoney (it should take a paramter to determine wether it is product lot or component lot)---> 0 for product,,,,, 1 for component
  static changeVendoerOwedMoney = async (type, lotid, remainingPayment) => {
    try {
      console.log("before getting hte wrong one");
      const vendorid = await Vendor.getVendorIdFromLotId(type, lotid);
      console.log("after getting hte wrong one");
      console.log(`the vendorid is ${vendorid}`);

      db.run(
        `UPDATE Vendors SET owedmoney =owedmoney+ ${remainingPayment} WHERE id = ${vendorid}`,
        (err) => {
          if (err) {
            console.error(err);
            // db.run("ROLLBACK");
          } else {
            console.log(`the remaining payment equals ${remainingPayment}`);
            console.log(`the vendorid is ${vendorid}`);
            finance.updatemyDebt(remainingPayment, (err) => {
              if (err) {
                console.error(err);
              }
            });
          }
        }
      );
    } catch (error) {
      console.error("a problem exists", error);
      throw error;
    }
  };

  //function to return vendorid of lot ,,,it should recive the type of lot whether component(1) or product(0)
  static getVendorIdFromLotId(type, lotId) {
    return new Promise((resolve, reject) => {
      if (type === 0) {
        db.get(
          "SELECT vendor_id FROM Products JOIN Lots ON Products.id = Lots.product_id WHERE Lots.id = ?",
          [lotId],
          (err, row) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              console.log("here is the vendor id of hte compoennt lot", row);
              resolve(row.vendor_id);
            }
          }
        );
      } else {
        db.get(
          "SELECT vendor_id FROM Components JOIN Lots ON Components.id = Lots.component_id WHERE Lots.id = ?",
          [lotId],
          (err, row) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              if (row != null || row != undefined) {
                console.log("here is the vendor id of hte compoennt lot", row);
                resolve(row.vendor_id);
              } else {
                reject(
                  new Error(
                    `the vendor id of componentLot ${lotId} is undefined or null`
                  )
                );
              }
            }
          }
        );
      }
    });
  }

  // Add other vendor-related methods here
}

module.exports = Vendor;
