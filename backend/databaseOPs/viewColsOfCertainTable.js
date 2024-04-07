const sqlite3 = require("sqlite3").verbose();

// Function to get columns of a table
function getTableColumns(tableName, callback) {
  const db = new sqlite3.Database("cafeteria");

  // Query to get columns of the specified table
  const query = `PRAGMA table_info(${tableName});`;

  db.all(query, (err, rows) => {
    if (err) {
      callback(err, null);
      return;
    }

    const columns = rows.map((row) => row.name);
    callback(null, columns);
  });

  db.close();
}

// Example usage:
getTableColumns("Lots", (err, columns) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log(`Columns of 'Lots':`, columns);
  }
});

getTableColumns("Orders", (err, columns) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log(`Columns of 'Orders':`, columns);
  }
});
