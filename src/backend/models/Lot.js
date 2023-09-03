const db = require("./db");

class Lot {
  //function to add new lot
  static addLot(productID, quantity, cost, received_date, callback) {
    console.log(productID);
    if (!productID) {
      const error = new Error("productID is sent null");
      console.error(error);
      callback(error);
      return;
    }
    db.serialize(() => {
      db.run("PRAGMA foreign_keys = ON;");
      db.run(
        `INSERT INTO Lots (product_id, quantity, cost, received_date) VALUES (?, ?, ?, ?)`,
        [productID, quantity, cost, received_date],
        function (err) {
          if (err) {
            console.error(err);
            callback(err);
          } else {
            const lotID = this.lastID;
            console.log("lot added");

            db.run(
              `UPDATE Products SET quantity = quantity + ? WHERE id=?`,
              [quantity, productID],
              function (err) {
                if (err) {
                  console.error(err);
                  callback(err);
                } else {
                  console.log("Quantity updated");

                  callback(null, {
                    message: "Lot added successfully",
                    lot_id: lotID,
                  });
                }
              }
            );
          }
        }
      );
    });
  }

  //function to view all lots in certain interval with product name
  static viewFilterDateLots = (startdate, enddate, callback) => {
    db.all(
      `select l.id,l.cost, l.received_date,l.quantity ,p.name as prodname from Lots l join Products p on p.id=l.product_id
      where l.received_date between ? and ? `,
      [startdate, enddate],
      (err, rows) => {
        if (err) {
          callback(err);
        } else {
          callback(null, rows);
        }
      }
    );
  };
  //function to view all lots with product names with category_name
  static viewLots(callback) {
    db.all(
      `select l.id,l.cost, l.received_date,l.quantity ,p.name as prodname,c.name as catname
       from Lots l join Products p join Categories c on p.id=l.product_id and c.id=p.category_id`,
      (err, rows) => {
        if (err) {
          callback(err);
        } else {
          callback(null, rows);
        }
      }
    );
  }
  // Add other lot-related methods here
}

module.exports = Lot;
