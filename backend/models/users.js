const db = require("./db");

const jwt = require("jsonwebtoken");
function logCurrentLineNumber() {
  const error = new Error();
  const stackLines = error.stack.split("\n");
  // Extract the line number from the fourth line of the stack trace
  const lineNumber = stackLines[3].trim().split(":")[1];
  console.log(`Current line number: ${lineNumber}`);
}

logCurrentLineNumber();

const generateAuthToken = (userId, username, role) => {
  const secretKey = "secretcafeteria"; // Replace with your actual secret key
  return jwt.sign({ userId, username, role }, secretKey, { expiresIn: "1h" });
};

const comparePassword = async (enteredPassword, hashedPassword) => {
  try {
    return enteredPassword === hashedPassword;
  } catch (error) {
    console.error(error);
    console.log("MAFEEEEEEEEEEEEEEESH MOSHKLA LIEEEEEEEEEEER");
    return false; // Handle error or return false for unsuccessful comparison
  }
};
class Users {
  //fn to add new user
  static async adduser(name, password, role) {
    try {
      return new Promise((res, rej) => {
        db.run(
          ` insert into Users (name,password,role) values ('${name}', '${password}', '${role}')`,
          function (err) {
            if (err) {
              console.error(err);
              rej(err);
            } else {
              res({ message: "user added successfully", user_id: this.lastID });
            }
          }
        );
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  //fn to notifyUser
  static async notifyUser(data) {
    try {
      console.log("i am the user i am notified with data", data);
    } catch (err) {
      console.log("an error occured", err);
    }
  }

  //fn to authenticate user
  static async authenticateUser(name, password) {
    // Check if username exists
    try {
      console.log(name, password);
      return new Promise((res, rej) => {
        db.get(
          `select * from Users where name = ? `,
          [name],
          async (err, userdata) => {
            if (err) {
              console.error(err);
              rej(err);
            } else {
              // Check if the user exists
              if (userdata) {
                // Check if the password is correct
                const passwordMatch = await comparePassword(
                  password,
                  userdata.password
                );
                if (passwordMatch) {
                  // Authentication successful
                  const token = generateAuthToken(
                    userdata.id,
                    userdata.username,
                    userdata.role
                  );
                  res({ token, user_id: userdata.id });
                } else {
                  // Incorrect password
                  res({ passerror: "Invalid password" });
                }
              } else {
                // User not found
                res({ usererror: "Invalid username" });
              }
            }
          }
        );
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  //fn to change password
  static async changePassword(userId, newPassword) {
    try {
      return new Promise((res, rej) => {
        db.run(
          `UPDATE Users SET password = ? WHERE id = ?`,
          [newPassword, userId],
          function (err) {
            if (err) {
              console.error(err);
              rej(err);
            } else {
              if (this.changes > 0) {
                res({ message: "Password changed successfully" });
              } else {
                rej({ message: "User not found or password unchanged" });
              }
            }
          }
        );
      });
    } catch (error) {
      console.error("error in changing password", error);
      throw error;
    }
  }
}
module.exports = Users;
