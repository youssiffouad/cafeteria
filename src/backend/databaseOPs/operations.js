// Import the addUser function
const addUser = require("../models/users").adduser; // Adjust the path as needed

// Example data for the new user
const userData = {
  name: "Admin",
  password: "STCCAFETERIA", // Replace with the actual name
  role: "Admin", // Replace with the actual role
};

// Call the addUser function
addUser(userData.name, userData.password, userData.role)
  .then((result) => {
    console.log("User added successfully:", result);
  })
  .catch((error) => {
    console.error("Error adding user:", error);
  });
