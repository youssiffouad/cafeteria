const cafeteriaFinance = require("./financial");

const db = require("./db");

class Customer {
  //fn to add new customer
  static AddCustomer(name, rankId, callback) {
    db.run(
      `INSERT INTO Customers (name, rank_id,debt) VALUES (?, ?,?)`,
      [name, rankId, 0],
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
      `SELECT c.name as custname, c.id,c.debt ,r.name as rankname FROM Customers c 
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

  //function to install orders  of certain customer
  static installCustDebt(installQuan, custId, callback) {
    // Get the customer's debt
    db.get("SELECT debt FROM Customers WHERE id = ?", [custId], (err, row) => {
      if (err) {
        console.error("Failed to fetch customer debt:", err);
        callback(err);
        return;
      }

      const debt = row.debt;

      // Update the customer's debt
      db.run(
        "UPDATE Customers SET debt = ? WHERE id = ?",
        [debt - installQuan, custId],
        (err) => {
          if (err) {
            console.error("Failed to update customer debt:", err);
            callback(err);
            return;
          }

          console.log("Customer debt successfully updated");
          cafeteriaFinance.setOwed(cafeteriaFinance.getOwed() - installQuan); //decremnt owed money to me
          cafeteriaFinance.setCash(cafeteriaFinance.getCash() + installQuan); //increment cash with me

          callback(null);
        }
      );
    });
  }
}

module.exports = Customer;
