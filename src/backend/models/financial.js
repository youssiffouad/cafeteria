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
          callback(null, rows);
        }
      }
    );
  }

  //function to update productInStockvlaue
  static updateProdInStocKCakue(addedValue) {
    return new Promise((res, rej) => {
      const sql = `update Financial  SET productsInStockValue = productsInStockValue + ? `;
      db.run(sql, addedValue, function (err) {
        if (err) {
          console.log(
            "failed to updateProduct In Stock value in financial table",
            err
          );
          rej(err);
        } else {
          console.log("successfully updated the product in stock value");
          res();
        }
      });
    });
  }

  //function to change cash value
  static changeCashVlaue = async (amount) => {
    try {
      await new Promise((resolve, reject) => {
        db.run(
          `
    UPDATE Financial
    SET cash = cash + ${amount}
    WHERE id = 1;
  `,
          (err) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              resolve(null);
            }
          }
        );
      });
    } catch (err) {
      console.error(err);
    }
  };

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

  //fn to update debt
  static updatemyDebt = async (addedDebt) => {
    return new Promise((res, rej) => {
      db.run(`update financial set debt =debt +${addedDebt}`, (err) => {
        if (err) {
          console.error(err);
          rej(err);
        } else {
          console.log(`my debt updated successfully`);
          res(null);
        }
      });
    });
  };
}

module.exports = Finance;
