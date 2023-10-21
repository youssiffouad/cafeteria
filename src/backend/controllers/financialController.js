const cafeteriaFinance = require("../models/financial");

// Function to view all orders with corresponding orderitem
exports.viewFinanace = (req, res) => {
  cafeteriaFinance.viewFinance((err, financialdata) => {
    if (err) {
      console.error("Failed to retrieve financialdata:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.log(financialdata);
      res.status(200).json(financialdata);
    }
  });
};
