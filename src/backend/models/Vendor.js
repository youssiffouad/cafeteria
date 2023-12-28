const db = require("./db");

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

  //fn to change vendor owedmoney (it should take a paramter to determine wether it is product lot or component lot)---> 0 for product,,,,, 1 for component
  static changeVendoerOwedMoney = async (type, lotid, remainingPayment) => {
    try {
      const vendorid = await Vendor.getVendorIdFromLotId(type, lotid);
      console.log(`the vendorid is ${vendorid}`);

      db.run(
        `UPDATE Vendors SET owedmoney =owedmoney+ ${remainingPayment} WHERE id = ${vendorid}`,
        (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`the remaining payment equals ${remainingPayment}`);
            console.log(`the vendorid is ${vendorid}`);
            updatemyDebt(remainingPayment, (err) => {
              if (err) {
                console.error(err);
              }
            });
          }
        }
      );
    } catch (error) {
      console.error(error);
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
              console.log(row);
              console.log(row.vendor_id);
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
              console.log("here is the vendor id of hte compoennt lot", row);
              resolve(row);
            }
          }
        );
      }
    });
  }
  // Add other vendor-related methods here
}

module.exports = Vendor;
