const db = require("./db");

class Component {
  // Add a new component
  static addComponent(name, numberOfUnits, pricePerUnit) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO Components (name, number_of_units, price_per_unit)
        VALUES (?, ?, ?)
      `;
      const params = [name, numberOfUnits, pricePerUnit];

      db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          const componentId = this.lastID;
          resolve({
            message: "Component added successfully",
            component_id: componentId,
          });
        }
      });
    });
  }

  // View all components
  static viewComponents() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT c.id, c.name, c.number_of_units, c.price_per_unit FROM Components c`;

      db.all(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
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
