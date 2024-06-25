const db = require("../models/db");
function clearAllTables() {
  const tables = [
    "Categories",
    "Products",
    "Sandwiches",
    "Components",
    "Lots",
    "Customers",
    "Ranks",
    "Orders",
    "OrderItems",
    "Financial",
    "Users",
    "Sandwich_Component",
    "Component_Component",
    "Vendors",
  ];

  db.serialize(() => {
    try {
      db.run("BEGIN");

      tables.forEach((table) => {
        db.run(`DELETE FROM ${table}`, function (err) {
          if (err) {
            console.error(`Error deleting records from ${table}:`, err);
          } else {
            console.log(`Records deleted from ${table} successfully`);
          }
        });
      });

      db.run("COMMIT");
    } catch (err) {
      db.run("ROLLBACK");
      console.error("Error clearing tables:", err);
    } finally {
      db.close();
    }
  });
}

module.exports = clearAllTables;

// Uncomment and run the following line to execute the function
clearAllTables();
