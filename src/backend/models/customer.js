const db = require("./db");

class Customer {
  //fn to add new customer
  static AddCustomer(name, rankId, callback) {
    db.run(
      `INSERT INTO Customers (name, rank_id) VALUES (?, ?)`,
      [name, rankId],
      (err) => {
        if (err) {
          callback(err);
          return;
        } else {
          console.log("check");
          console.log(name);
          console.log(rankId);
          const customerId = this.lastID;
          callback(null, {
            message: "Customer added successfully",
            customer_id: customerId,
          });
        }
      }
    );
  }

  //fn to view all customers with  their ranks
  static viewAll(callback) {
    db.all(
      `SELECT c.name as custname, c.id ,r.name as rankname FROM Customers c 
      join Ranks r on r.id=c.rank_id
   
    `,
      (err, rows) => {
        if (err) {
          callback(err);
        } else {
          callback(null, rows);
        }
      }
    );
  }

  //fn to filter customers of certain rank
  static filterByRank(rankId, callback) {
    db.all(
      `SELECT c.name as custname, c.id  FROM Customers c 
    where c.rank_id= ?
    `,
      [rankId],
      (err, rows) => {
        if (err) {
          callback(err);
        } else {
          callback(null, rows);
        }
      }
    );
  }
}

module.exports = Customer;
