const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("cafeteria");

// Add sandwich_id column to Orders table
db.run(`
  ALTER TABLE Orders
  ADD COLUMN sandwich_id INTEGER
`);

// Add foreign key constraint for sandwich_id in Orders table
db.run(`
  ALTER TABLE Orders
  ADD FOREIGN KEY (sandwich_id) REFERENCES Sandwiches(id)
`);

// Add component_id and received_quantity columns to Lots table
db.run(`
  ALTER TABLE Lots
  ADD COLUMN component_id INTEGER
`);

// Add foreign key constraint for component_id in Lots table
// db.run(`
//   ALTER TABLE Lots
//   ADD COLUMN received_quantity INTEGER,
//   ADD FOREIGN KEY (component_id) REFERENCES Components(id)
// `);

// db.close();
