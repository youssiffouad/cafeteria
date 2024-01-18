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
          console.log("failed to get owed money of the vendor");
          rej(err);
        } else {
          res(row.owedmoney);
        }
      });
    });
  };

  //fn to change vendor owedmoney

  //installQuantity is added to the current owed money
  //vendor id is the id of which whose owed money will change
  static changeVendoerOwedMoney = async (newValue, vendorid) => {
    try {
      await new Promise((res, rej) => {
        const sql = `UPDATE Vendors SET owedmoney =owedmoney+ ? WHERE id = ?`;
        const params = [newValue, vendorid];
        db.run(sql, params, (err) => {
          if (err) {
            console.error("failed to change vendor owed money", err);
            rej(err);
          } else {
            res();
          }
        });
      });
      console.log(`the new vendor owed money value ${newValue}`);
      console.log(`the vendorid is ${vendorid}`);
    } catch (err) {
      console.log("i caught the error while changing vendor oqed money", err);
      throw err;
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
