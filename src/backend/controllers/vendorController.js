const Vendor = require("../models/Vendor");

//calling of vendor method to add new vendor
exports.addVendor = (req, res) => {
  const { name, phone } = req.body;
  Vendor.addVendor(name, phone, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(result);
    }
  });
};

//calling of vendor method to view all vendors
exports.viewVendors = (req, res) => {
  Vendor.viewVendors((err, vendors) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Internal Server error faled to get vendors" });
    } else {
      // console.log("here are the vendors");
      // console.log(vendors);
      res.status(200).json(vendors);
    }
  });
};

// Add other vendor-related controller methods here
