const lot = require("../../models/Lot");
lot.viewLots((err, rows) => {
  if (err) {
    console.log("error viewin g all lots test", err);
  } else {
    console.log(rows);
  }
});
