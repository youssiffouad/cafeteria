const lot = require("../../models/Lot");
lot.viewLots((err, rows) => {
  if (err) {
    console.log("error viewing all lots test", err);
  } else {
    console.log("here are hte lots", rows);
  }
});
