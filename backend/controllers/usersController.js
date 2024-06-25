// controllers/usersController.js
const Users = require("../models/users");

exports.addUser = async (req, res) => {
  try {
    const { customer_id, name, password, role } = req.body;
    const result = await Users.adduser(customer_id, name, password, role);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding user" });
  }
};

exports.authenticateUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    console.log(name, password);
    const result = await Users.authenticateUser(name, password);

    if (result && result.token) {
      // Authentication successful
      res.status(200).json({ token: result.token });
    } else if (result && result.passerror === "Invalid password") {
      // Incorrect password
      res.status(401).json({ passerror: result.passerror });
    } else if (result && result.usererror === "Invalid username") {
      // User not found
      res.status(401).json({ usererror: result.usererror });
    } else {
      // Handle other cases or return a generic error
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
