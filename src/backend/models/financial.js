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
}

module.exports = Finance;
