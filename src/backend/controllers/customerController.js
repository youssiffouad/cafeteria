const Customer = require("../models/customer");

exports.addCustomer = (req, res) => {
  const { name, rankId } = req.body;
  console.log(`name is ${name}`);
  console.log(`rank id is ${rankId}`);
  Customer.AddCustomer(name, rankId, (err, result) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Internal server error: Failed to add customer" });
    } else {
      res.status(200).json(result);
    }
  });
};

//calling of fn to view all customers with their ranks
exports.viewAll = (req, res) => {
  Customer.viewAll((err, custrecords) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "internal server error failed to get all customers" });
    } else {
      console.log(custrecords);
      res.status(200).json(custrecords);
    }
  });
};

//calling of fn to filter customers of certain rank
exports.filterbyRank = (req, res) => {
  const { rankid } = req.body;
  Customer.filterByRank(rankid, (err, custrecords) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "internal server error failed to filter customers " });
    } else {
      console.log(custrecords);
      res.status(200).json(custrecords);
    }
  });
};
