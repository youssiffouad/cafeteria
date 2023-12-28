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
    phone TEXT,
    owedmoney REAL
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
    buying_price REAL,
    quantity INTEGER,
    FOREIGN KEY (vendor_id) REFERENCES Vendors(id),
    FOREIGN KEY (category_id) REFERENCES Categories(id)
  )
`);

//create Sanwiches table
db.run(`
create table if not exists Sandwiches (
  id    integer primary key,
  name     text not null ,
  cost     real  not null ,
  selling_price       real not null 

);
`);

//create Components table
db.run(`
create table if not exists Components (
   id     integer primary key,
   name      text not null ,
   number_of_units      real not null,
   price_per_unit    real not null,
   vendor_id integer ,
   isNested boolean not null ,
   foreign key(vendor_id) references Vendors(id)
  
)
`);

// Create Lots table
db.run(`
  CREATE TABLE IF NOT EXISTS Lots (
    id INTEGER PRIMARY KEY,
    product_id INTEGER,
    quantity INTEGER,
    cost REAL,
    remaining_payment REAL,
    received_date TEXT,
    payment_method TEXT,
    is_component boolean,
    component_id integer,
    foreign key (component_id) references Components(id)
    FOREIGN KEY (product_id) REFERENCES Products(id)
  )
`);

// Create Customers table
db.run(`
  CREATE TABLE IF NOT EXISTS Customers (
    id INTEGER PRIMARY KEY,
    name TEXT,
    rank_id INTEGER,
    debt REAL,
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
    payment_method REAL,
    customer_id INTEGER,
    order_date TEXT,
is_sandwich boolean,
sandwich_id integer ,
foreign key(sandwich_id) references Sandwiches(id),

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

// Create financial table
db.run(`
  CREATE TABLE IF NOT EXISTS Financial (
    id INTEGER PRIMARY KEY,
    cash REAL,
    owed REAL,
    debt REAL,
    productsInStockValue REAL,
    revenue REAL,
    profit REAL
  );

`);

//create users table
db.run(` 
create table if not exists Users(
  id            integer primary key,
  customer_id   integer ,
  name          text ,
  role          text ,
  password      text ,
  FOREIGN KEY (customer_id) references Customers(id) on delete cascade
);
`);

//create sandwich_component table
db.run(`
create table if not exists  Sandwich_Component(
  component_id      integer not null,
  sandwich_id       integer not null,
  mapping_value     real not null, 
  primary key(component_id,sandwich_id),
  foreign key(sandwich_id) references Sandwiches(id),
  foreign key(component_id) references Components(id)
);`);

//create Component_Component table
db.run(`
create table if not exists Component_Component(
  parent_component    integer not null,
  child_component     integer not null,
  mapping_value     real not null, 
  primary key(parent_component,child_component),
  foreign key(child_component) references Components(id),
  foreign key(parent_component) references Components(id)

);
`);

// db.run(`  INSERT OR REPLACE INTO Financial (id, cash, owed, debt, productsInStockValue, revenue, profit)
// VALUES (1, 0, 0, 0, 0, 0, 0);`);

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
