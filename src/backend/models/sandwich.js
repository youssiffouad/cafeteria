const db = require("./db");
const Sandwich_Component = require("./sandwich_component");
const dbPromise = require("bluebird").promisifyAll(db); // Or any other promise library

class Sandwich {
  //->>>>>>>>>>>>>>function bnt lazena readablity fel daya3 bec we use db.run() with callbacks without PROMISELIBRARY<<<<<<<<<<<<<<<//
  //|              |||||||||||||||||||||||||||||||||||||||||||||||||||||

  //  // Add a new sandwich
  // static addSandwich(name, componentsList, sellingPrice) {
  //     return new Promise((resolve, reject) => {
  //       db.run("BEGIN TRANSACTION", (err) => {
  //         if (err) {
  //           reject(err);
  //           return;
  //         }

  //         try {
  //           let cost = Sandwich.calculateCost(componentsList);
  //           const sql = `INSERT INTO Sandwiches (name, cost, selling_price) VALUES (?, ?, ?)`;
  //           const params = [name, cost, sellingPrice];

  //           db.run(sql, params, async (err) => {
  //             if (err) {
  //               db.run("ROLLBACK", (err) => {
  //                 if (err) {
  //                   console.error("Error rolling back transaction:", err);
  //                 }
  //               });
  //               reject(err);
  //               return;
  //             }

  //             const sandwichId = this.lastID;

  //             // Await performMapping within the callback
  //             try {
  //               await Sandwich.performMapping(sandwichId, componentsList);

  //               db.run("COMMIT", (err) => {
  //                 if (err) {
  //                   console.error("Error committing transaction:", err);
  //                   reject(err);
  //                 } else {
  //                   resolve({
  //                     message: "Sandwich added successfully",
  //                     sandwich_id: sandwichId,
  //                   });
  //                 }
  //               });
  //             } catch (err) {
  //               db.run("ROLLBACK", (err) => {
  //                 if (err) {
  //                   console.error("Error rolling back transaction:", err);
  //                 }
  //               });
  //               reject(err);
  //             }
  //           });
  //         } catch (err) {
  //           db.run("ROLLBACK", (err) => {
  //             if (err) {
  //               console.error("Error rolling back transaction:", err);
  //             }
  //           });
  //           reject(err);
  //         }
  //       });
  //     });
  //   }
  //_________________________________________________________________________________________________________________________

  //>>>>>>>>>>providing same add sandwich fn with promise library<<<<<<<<<<<<<<<<

  // Add a new sandwich
  static async addSandwich(name, componentsList, sellingPrice) {
    try {
      db.serialize(async () => {
        db.run("BEGIN TRANSACTION");

        let cost = Sandwich.calculateCost(componentsList);
        const sql = `INSERT INTO Sandwiches (name, cost, selling_price) VALUES (?, ?, ?)`;
        const params = [name, cost, sellingPrice];
        let result;
        db.run(sql, params, (err) => {
          if (err) {
            console.log("error inserting new sandwich into sandwiches table");
            throw err;
          } else {
            result = this;
          }
        });

        console.log(result);
        const sandwichId = result.lastID;
        await Sandwich.performMapping(sandwichId, componentsList);

        db.run("commit");

        return {
          message: "Sandwich added successfully",
          sandwich_id: sandwichId,
        };
      });
    } catch (err) {
      db.run("rollback");
      console.error("Error in transaction:", err);
      throw err;
    }
  }

  //perform mapping between the sadwich and its components on adding new sandwich
  static async performMapping(sandwich_id, componentsList) {
    try {
      return await Promise.all(
        componentsList.map(async (ele) => {
          console.log(ele.component_id, sandwich_id, ele.mapping_value);
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
    let cost = componentsList.reduce(
      (prev, curr) => prev + curr.price_per_unit / curr.mapping_value,
      0
    );
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
      GROUP_CONCAT(c.name) AS component_names,
      GROUP_CONCAT(sc.mapping_value) AS mapping_values
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
      const sql = `DELETE FROM Sandwiches WHERE id = ?`;
      const params = [sandwichId];

      db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          Sandwich_Component.deleteAllComponents(sandwichId);
          resolve({
            message: "Sandwich deleted successfully",
            sandwich_id: sandwichId,
          });
        }
      });
    });
  }
}

module.exports = Sandwich;
