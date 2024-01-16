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

  //function to delete certain customer
  static deleteCustomer = async (customerid) => {
    return new Promise((res, rej) => {
      const sql = "delete from Customers where id= ?";
      db.run(sql, customerid, function (err) {
        if (err) {
          console.log("an error occured while deletin the customer");
          rej(err);
        } else {
          console.log("succssfully deelted hte customer");
          res({ message: "succssfully deelted hte customer", customerid });
        }
      });
    });
  };

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

  //function to update debt of certain customer
  static changeDebtOfCustomer = async (custid, addedValue) => {
    return new Promise((res, rej) => {
      console.log("here is the added vlaue to cust debt ", addedValue);
      const sql = "update Customers set debt =debt + ? where id =?";
      const params = [addedValue, custid];
      db.run(sql, params, function (err) {
        if (err) {
          console.log("failed to update debt of customer", err);
          rej(err);
        } else {
          console.log("successfully updateed the debt of hte customer");
          res({ message: "successfully updateed the debt of hte customer" });
        }
      });
    });
  };
}

module.exports = Customer;
