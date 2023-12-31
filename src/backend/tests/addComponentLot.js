const addcompLot = require("../businessLogic/addComponentLot");
const db = require("../models/db");
const Lot = require("../models/Lot");
addcompLot(1, 200, 0, new Date(2023, 1, 1), "cash", 3);
Lot.viewLots((err, rows) => {
  if (err) {
    console.log(err);
  } else {
    console.log(rows);
  }
});

db.all(`select * from Lots `, function (err, rows) {
  if (err) {
    console.log(err);
  } else {
    console.log("here are the lots w no pbm", rows);
  }
});
