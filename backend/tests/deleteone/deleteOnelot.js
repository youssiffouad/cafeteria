const lot = require("../../models/Lot");
lot.deleteLot(36, (err, msg) => {
  if (err) {
    console.log(err);
  } else {
    console.log(msg);
  }
});
