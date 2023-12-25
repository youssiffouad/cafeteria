const db = require("./db");

class Component_Component {
  // Adding new mapping between a parent component and a child component
  static addComponentComponent(
    parent_component,
    child_component,
    mapping_value
  ) {
    return new Promise((res, rej) => {
      const sql = `
        INSERT INTO Component_Component(parent_component, child_component, mapping_value)
        VALUES (?, ?, ?)
      `;
      const params = [parent_component, child_component, mapping_value];
      console.log("here are hte params", params);
      db.run(sql, params, function (err) {
        if (err) {
          rej(err);
        } else {
          const component_component_id = this.lastID;
          res({
            message: `Mapping between parent component ${parent_component} and child component ${child_component} successfully added`,
            added_component_component_id: component_component_id,
          });
        }
      });
    });
  }

  // View all Component_Components
  static viewComponentComponents() {
    return new Promise((res, rej) => {
      const sql = `SELECT * FROM Component_Component`;
      db.all(sql, function (err, rows) {
        if (err) {
          rej(err);
        } else {
          res(rows);
        }
      });
    });
  }

  // Deleting mapping between parent component and child component
  static deleteComponentComponent(parent_component, child_component) {
    return new Promise((res, rej) => {
      const sql = `
        DELETE FROM Component_Component
        WHERE parent_component = ? AND child_component = ?
      `;
      const params = [parent_component, child_component];
      db.run(sql, params, function (err) {
        if (err) {
          rej(err);
        } else {
          res({
            message: `Successfully deleted mapping between parent component ${parent_component} and child component ${child_component}`,
          });
        }
      });
    });
  }

  // Delete all child components (this should be called only when deleting a parent component)
  static deleteAllChildComponents(parent_component) {
    return new Promise((res, rej) => {
      const sql = `DELETE FROM Component_Component WHERE parent_component = ?`;
      const params = [parent_component];
      db.run(sql, params, function (err) {
        if (err) {
          rej(err);
        } else {
          res({
            message: `Successfully deleted all child components of parent component ${parent_component}`,
          });
        }
      });
    });
  }
}

module.exports = Component_Component;
