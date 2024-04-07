const sqlite3 = require("sqlite3").verbose();
const Table = require("cli-table");

const db = require("../models/db");

// Function to display a table
function displayTable(query, tableName) {
  db.all(query, (err, rows) => {
    if (err) {
      console.error(err);
    } else {
      const table = new Table({
        head: [tableName],
        colWidths: [180],
      });

      rows.forEach((row) => {
        table.push([JSON.stringify(row)]);
      });

      console.log(table.toString());
    }
  });
}

// Display each table
displayTable("SELECT * FROM Vendors", "Vendors");
displayTable("SELECT * FROM Components", "Components");
displayTable("SELECT * FROM Sandwiches", "Sandwiches");
displayTable("SELECT * FROM Sandwich_Component", "Sandwich_Component");
displayTable("SELECT * FROM Categories", "Categories");
displayTable("SELECT * FROM Products", "Products");
displayTable("SELECT * FROM Lots", "Lots");
displayTable("SELECT * FROM Customers", "Customers");
displayTable("SELECT * FROM Ranks", "Ranks");
displayTable("SELECT * FROM Orders", "Orders");
displayTable("SELECT * FROM OrderItems", "OrderItems");
displayTable("SELECT * FROM Financial", "Financial");
displayTable("SELECT * FROM Users", "Users");

// Close the database connection
db.close();
