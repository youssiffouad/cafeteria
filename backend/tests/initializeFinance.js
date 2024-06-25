const Finance = require("../models/financial");

const db = require("../models/db");
db.run(
  "insert into Financial ( cash , owed ,debt , productsInStockValue , revenue , profit) values (?,?,?,?,?,?)",
  [0, 0, 0, 0, 0, 0],
  function (err) {
    if (err) {
      console.log("error from initialize finance", err);
    } else {
      console.log(this.lastID);
    }
  }
);
Finance.viewFinance((err, rows) => {
  console.log(rows);
});
