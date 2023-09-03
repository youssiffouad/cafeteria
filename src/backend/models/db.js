const sqlite3 = require("sqlite3").verbose();

const path = require("path");
const dbpath = path.join(__dirname, "../cafeteria");
const db = new sqlite3.Database(dbpath);
// Enable foreign key constraints
db.run("PRAGMA foreign_keys = ON;", function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log("Foreign key constraints enabled");
  }
});

module.exports = db;
