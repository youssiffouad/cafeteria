const db = require("./db");
const Sandwich_Component = require("./sandwich_component");

class Sandwich {
  // Add a new sandwich
  static async addSandwich(name, componentsList, sellingPrice) {
    return new Promise((resolve, reject) => {
      try {
        db.serialize(async () => {
          await new Promise((res, rej) => {
            db.run("BEGIN TRANSACTION", function (err) {
              if (err) {
                rej(err);
                console.log("failed to start hte txn of adding new sandwich");
              } else {
                console.log(
                  "successfully started the txn of adding new sandwich"
                );
                res();
              }
            });
          });

          let cost = Sandwich.calculateCost(componentsList);
          const sql = `INSERT INTO Sandwiches (name, cost, selling_price) VALUES (?, ?, ?)`;
          const params = [name, cost, sellingPrice];
          let sandwichId = await new Promise((res, rej) => {
            db.run(sql, params, function (err) {
              if (err) {
                console.log(
                  "error inserting new sandwich into sandwiches table"
                );
                db.run("rollback");
                rej(err);
              } else {
                console.log(
                  "here is the this of last id entered into sandwich table",
                  this
                );
                res(this.lastID);
              }
            });
          });

          await Sandwich.performMapping(sandwichId, componentsList);

          await new Promise((res, rej) => {
            db.run("commit", function (err) {
              if (err) {
                db.run("rollback");
                rej(err);
              } else {
                res();
              }
            });
          });

          resolve({
            message: "Sandwich added successfully",
            sandwich_id: sandwichId,
          });
        });
      } catch (err) {
        db.run("rollback");
        console.error("Error in transaction:", err);
        reject(err);
      }
    });
  }

  //perform mapping between the sadwich and its components on adding new sandwich
  static async performMapping(sandwich_id, componentsList) {
    try {
      return await Promise.all(
        componentsList.map(async (ele) => {
          console.log(
            "here are the elements of the compooents list",
            ele.component_id,
            sandwich_id,
            ele.mapping_value
          );
          return await Sandwich_Component.addSandwichComponent(
            ele.component_id,
            sandwich_id,
            ele.mapping_value
          );
        })
      );
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  //calculate sandwich cost
  static calculateCost = (componentsList) => {
    console.log("here is the component list", componentsList);
    let cost = componentsList.reduce(
      (prev, curr) => prev + curr.price_per_unit / curr.mapping_value,
      0
    );
    console.log("the cost equals", cost);
    return cost;
  };

  // View all sandwiches
  static viewSandwiches() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT
      s.id AS sandwich_id,
      s.name AS sandwich_name,
      s.cost AS sandwich_cost,
      s.selling_price AS sandwich_selling_price,
      GROUP_CONCAT(c.id) AS component_ids,
     GROUP_CONCAT(c.name || ':' || sc.mapping_value) AS components_with_mapping
    FROM Sandwiches s
    JOIN Sandwich_Component sc ON s.id = sc.sandwich_id
    JOIN Components c ON sc.component_id = c.id
    GROUP BY s.id`;

      db.all(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Other CRUD methods can be similarly implemented

  static updateSandwichName(sandwichId, newName) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE Sandwiches
        SET name = ?
        WHERE id = ?
      `;
      const params = [newName, sandwichId];

      db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            message: "Sandwich name updated successfully",
            sandwich_id: sandwichId,
          });
        }
      });
    });
  }

  // Update cost of sandwich by ID
  static updateSandwichCost(sandwichId, newCost) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE Sandwiches
        SET cost = ?
        WHERE id = ?
      `;
      const params = [newCost, sandwichId];

      db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            message: "Sandwich cost updated successfully",
            sandwich_id: sandwichId,
          });
        }
      });
    });
  }

  // Update selling_price of sandwich by ID
  static updateSandwichSellingPrice(sandwichId, newSellingPrice) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE Sandwiches
        SET selling_price = ?
        WHERE id = ?
      `;
      const params = [newSellingPrice, sandwichId];

      db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            message: "Sandwich selling price updated successfully",
            sandwich_id: sandwichId,
          });
        }
      });
    });
  }

  // Delete sandwich by ID
  static deleteSandwich(sandwichId) {
    return new Promise((resolve, reject) => {
      try {
        if (sandwichId === undefined || sandwichId === null) {
          const err = new Error("the sent id is null ot undefined");
          reject(err);
        }
        db.serialize(async () => {
          await new Promise((res, rej) => {
            db.run("begin", (err) => {
              if (err) {
                console.log("failed to start txn of deleting Sandwich");
                rej(err);
              } else {
                console.log(
                  "successfully started the txn of deleting sandwich"
                );
                res();
              }
            });
          });

          const sql = `DELETE FROM Sandwiches WHERE id = ?`;
          const params = [sandwichId];

          await Sandwich_Component.deleteAllComponents(sandwichId);
          await new Promise((res, rej) => {
            db.run(sql, params, function (err) {
              if (err) {
                console.log("failed to delete Sandwich row", sandwichId);
                db.run("rollback");
                rej(err);
              } else {
                console.log("successfully deleted the sandwich row");
                res();
              }
            });
          });

          await new Promise((res, rej) => {
            db.run("commit", (err) => {
              if (err) {
                console.log("failed to commit txn of deleting Sandwich");
                db.run("rollback");
                rej(err);
              } else {
                console.log("successfully committed deletion of Sandwich");
                res();
              }
            });
          });

          resolve({
            message: "Sandwich deleted successfully",
            sandwich_id: sandwichId,
          });
        });
      } catch (err) {
        console.error("Error in deleteSandwich:", err);
        reject(err);
      }
    });
  }
}

module.exports = Sandwich;
