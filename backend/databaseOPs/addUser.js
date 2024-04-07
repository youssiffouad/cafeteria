// Import the addUser function
const addUser = require("../models/users").adduser; // Adjust the path as needed
const changePass = require("../models/users").changePassword;

// Example data for the new user
const userData = {
  name: "Admin",
  password: "STCCAFETERIA", // Replace with the actual name
  role: "Admin", // Replace with the actual role
};

// // Call the addUser function
// addUser(userData.name, userData.password, userData.role)
//   .then((result) => {
//     console.log("User added successfully:", result);
//   })
//   .catch((error) => {
//     console.error("Error adding user:", error);
//   });

//call change password function
changePass(1, "12345")
  .then((result) => console.log("pass changes successfully", result))
  .catch((err) => console.log("error changing password", err));
