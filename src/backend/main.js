const sqlite3 = require("sqlite3").verbose();

// Create a new database connection
const db = new sqlite3.Database("cafeteria");
db.run("PRAGMA foreign_keys = ON;", function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log("Foreign key constraints enabled");
  }
});

// Create Vendors table
db.run(`
  CREATE TABLE IF NOT EXISTS Vendors (
    id INTEGER PRIMARY KEY,
    name TEXT,
    phone TEXT
  )
`);

// Create Categories table
db.run(`
  CREATE TABLE IF NOT EXISTS Categories (
    id INTEGER PRIMARY KEY,
    name TEXT
  )
`);

// Create Products table
db.run(`
  CREATE TABLE IF NOT EXISTS Products (
    id INTEGER PRIMARY KEY,
    name TEXT,
    vendor_id INTEGER,
    category_id INTEGER,
    selling_price REAL,
    quantity INTEGER,
    FOREIGN KEY (vendor_id) REFERENCES Vendors(id),
    FOREIGN KEY (category_id) REFERENCES Categories(id)
  )
`);

// Create Lots table
db.run(`
  CREATE TABLE IF NOT EXISTS Lots (
    id INTEGER PRIMARY KEY,
    product_id INTEGER,
    quantity INTEGER,
    cost REAL,
    received_date TEXT,
    FOREIGN KEY (product_id) REFERENCES Products(id)
  )
`);

// Create Customers table
db.run(`
  CREATE TABLE IF NOT EXISTS Customers (
    id INTEGER PRIMARY KEY,
    name TEXT,
    rank_id INTEGER,
    FOREIGN KEY (rank_id) REFERENCES Ranks(id)
  )
`);

// Create Ranks table
db.run(`
  CREATE TABLE IF NOT EXISTS Ranks (
    id INTEGER PRIMARY KEY,
    name TEXT
  )
`);

// Create Orders table
db.run(`
  CREATE TABLE IF NOT EXISTS Orders (
    id INTEGER PRIMARY KEY,
    price REAl,
    customer_id INTEGER,
    order_date TEXT,

    FOREIGN KEY (customer_id) REFERENCES Customers(id)  ON DELETE CASCADE
  )
`);

// Create OrderItems table
db.run(`
  CREATE TABLE IF NOT EXISTS OrderItems (
    id INTEGER PRIMARY KEY,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    FOREIGN KEY (order_id) REFERENCES Orders(id)  ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(id)
  )
`);

// delete a table
// const tableName = "Orders";

// // Delete the table
// db.run(`DROP TABLE IF EXISTS ${tableName}`, (err) => {
//   if (err) {
//     console.error("Error deleting table:", err);
//     return;
//   }

//   console.log(`Table '${tableName}' has been deleted.`);
// });

// Empty a table
// const tablename = "Categories";
//  db.run(`DELETE FROM ${tablename}`, function (err) {
//    if (err) {
//      console.error(err);
//    } else {
//      console.log(`Table ${tablename} emptied successfully`);
//   }
//  });

// Verify table creation
db.serialize(() => {
  db.all(`SELECT name FROM sqlite_master WHERE type='table'`, (err, rows) => {
    if (err) {
      console.error(err);
    } else {
      rows.forEach((row) => {
        console.log(row.name);
      });
    }
  });
});

// Close the database connection
db.close();
