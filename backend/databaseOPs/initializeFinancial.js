const db = require("../models/db");
const initializeFinance = async () => {
  return new Promise((res, rej) => {
    const sql =
      "insert into Financial( cash ,owed ,debt ,productsInStockValue ,revenue , profit ) values(?,?,?,?,?,?)";
    const params = [0, 0, 0, 0, 0, 0];
    db.run(sql, params, function (err) {
      if (err) {
        console.log("failed to initialize financial", err);
        rej(err);
      } else {
        console.log("succfully initialized financial");
        res({ message: "succfully initialized financial" });
      }
    });
  });
};
initializeFinance();
