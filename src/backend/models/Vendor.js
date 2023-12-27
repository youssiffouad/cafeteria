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

  //fn to change vendor owedmoney
  static changeVendoerOwedMoney = async (lotid, remainingPayment) => {
    try {
      const vendorid = await getVendorIdFromLotId(lotid);
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

  // Add other vendor-related methods here
}

module.exports = Vendor;
