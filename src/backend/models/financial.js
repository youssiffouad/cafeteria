const db = require("./db");

class Finance {
  // Function to view all finance data

  static viewFinance(callback) {
    db.all(
      `
      SELECT f.cash, f.owed, f.debt, f.productsInStockValue,f.revenue ,f.profit from Financial f `,
      (err, rows) => {
        if (err) {
          callback(err);
        } else {
          console.log(`a7aaaaaaaaaaaaaaaaaaaaaaaaaa`);
          console.log(rows);
          callback(null, rows);
        }
      }
    );
  }

  //function to reset all financial data
  static resetFinance(callback) {
    db.serialize(() => {
      // Update Vendors table
      db.run(`UPDATE Vendors SET owedmoney = 0`, [], (error) => {
        if (error) {
          console.log(error);
          callback(error);
          return;
        }
      });

      // Update Lots table
      db.run(`UPDATE Lots SET remaining_payment = 0`, [], (error) => {
        if (error) {
          console.log(error);
          callback(error);
          return;
        }
      });

      // Update Customers table
      db.run(`UPDATE Customers SET debt = 0`, [], (error) => {
        if (error) {
          console.log(error);
          callback(error);
          return;
        }
      });

      // Update Financial table
      db.run(
        `UPDATE Financial SET cash = 0, owed = 0, debt = 0, productsInStockValue =0, revenue = 0, profit = 0`,
        [],
        (error) => {
          if (error) {
            console.log(error);
            callback(error);
            return;
          }
        }
      );

      // Invoke the callback function to indicate that the reset is complete
      callback(null, { message: "order added successfully" });
    });
  }
}

module.exports = Finance;
