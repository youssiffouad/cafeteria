const Vendor = require("../models/Vendor");

Vendor.addVendor("hamada2", "01050105235", (err, res) => {
  console.log(res);
});

Vendor.viewVendors((err, rows) => {
  console.log(rows);
});
