const db = require("./db");
const Component_Component = require("../models/Component_Component");

class Component {
  // Add a new component
  // static addComponent(name, numberOfUnits, pricePerUnit) {
  //   return new Promise((resolve, reject) => {
  //     const sql = `
  //       INSERT INTO Components (name, number_of_units, price_per_unit)
  //       VALUES (?, ?, ?)
  //     `;
  //     const params = [name, numberOfUnits, pricePerUnit];

  //     db.run(sql, params, function (err) {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         const componentId = this.lastID;
  //         resolve({
  //           message: "Component added successfully",
  //           component_id: componentId,
  //         });
  //       }
  //     });
  //   });
  // }

  // Add a new component --------the compoentList contains child_component_id  &  mapping_value   &  price_per_unit
  static async addComponent(
    name,
    numberOfUnits,
    pricePerUnit,
    componentsList,
    vendor_id
  ) {
    try {
      db.serialize(async () => {
        db.run("BEGIN");
        let sql;
        let params;
        if (componentsList) {
          let cost = Component.calculateCost(componentsList);
          sql = `INSERT INTO Components (name,number_of_units, price_per_unit,vendor_id,isNested) VALUES (?, ?, ?,?,?)`;
          params = [name, numberOfUnits, cost, vendor_id, 1];
        } else {
          sql = `INSERT INTO Components (name, number_of_units, price_per_unit,vendor_id,isNested) VALUES (?, ?,?, ?,?)`;
          params = [name, numberOfUnits, pricePerUnit, vendor_id, 0];
        }

        const result = await new Promise((res, rej) => {
          db.run(sql, params, function (err) {
            if (err) {
              rej(err);
              console.log("ya raby 3la rl errrrrrrorrrrrrrr", err);
            } else res(this);
          });
        });

        console.log(result);
        const componentId = result.lastID;
        if (componentsList)
          await Component.performMapping(componentId, componentsList);

        db.run("COMMIT");

        return {
          message: "Component added successfully",
          component_id: componentId,
        };
      });
    } catch (err) {
      db.run("ROLLBACK");
      console.error("Error in transaction:", err);
      throw err;
    }
  }

  //perform mapping between the composed component and its constituents components on adding new nested component
  static async performMapping(parent_component_id, componentsList) {
    try {
      return await Promise.all(
        componentsList.map(async (ele) => {
          console.log(
            ele.child_component_id,
            parent_component_id,
            ele.mapping_value
          );
          return await Component_Component.addComponentComponent(
            parent_component_id,
            ele.child_component_id,
            ele.mapping_value
          );
        })
      );
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  //calculate component cost
  static calculateCost = (componentsList) => {
    let cost = componentsList.reduce(
      (prev, curr) => prev + curr.price_per_unit / curr.mapping_value,
      0
    );
    return cost;
  };

  // View all components
  static viewComponents() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT c.id, c.name, c.number_of_units, c.price_per_unit, c.vendor_id FROM Components c`;

      db.all(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          console.log(rows);
          resolve(rows);
        }
      });
    });
  }

  //fn to get no of units for certain component
  static getNoOfUnits(componentId) {
    return new Promise((res, rej) => {
      const sql = `select number_of_units from Components where id=?`;
      db.get(sql, [componentId], function (err, row) {
        if (err) {
          console.log(err);
          rej(err);
        } else {
          console.log(row.number_of_units);
          res(row);
        }
      });
    });
  }

  // Update component name by ID
  static updateComponentName(componentId, newName) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE Components
        SET name = ?
        WHERE id = ?
      `;
      const params = [newName, componentId];

      db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            message: "Component name updated successfully",
            component_id: componentId,
          });
        }
      });
    });
  }

  // Update number of units of component by ID
  static updateComponentNumberOfUnits(componentId, newNumberOfUnits) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE Components
        SET number_of_units = ?
        WHERE id = ?
      `;
      const params = [newNumberOfUnits, componentId];

      db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            message: "Component number of units updated successfully",
            component_id: componentId,
          });
        }
      });
    });
  }

  // Update price per unit of component by ID
  static updateComponentPricePerUnit(componentId, newPricePerUnit) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE Components
        SET price_per_unit = ?
        WHERE id = ?
      `;
      const params = [newPricePerUnit, componentId];

      db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            message: "Component price per unit updated successfully",
            component_id: componentId,
          });
        }
      });
    });
  }

  // Delete component by ID
  static deleteComponent(componentId) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM Components WHERE id = ?`;
      const params = [componentId];

      db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            message: "Component deleted successfully",
            component_id: componentId,
          });
        }
      });
    });
  }
}

module.exports = Component;
