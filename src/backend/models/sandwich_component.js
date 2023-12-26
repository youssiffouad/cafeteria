const db = require("./db");
class Sandwich_Component {
  //adding new mapping between a sandwich and a component
  static addSandwichComponent(component_id, sandwich_id, mapping_value) {
    return new Promise((res, rej) => {
      const sql = ` insert into Sandwich_Component(component_id,sandwich_id,mapping_value) values(?,?,?) `;
      const params = [component_id, sandwich_id, mapping_value];
      db.run(sql, params, function (err) {
        if (err) {
          rej(err);
        } else {
          const sandwich_component_id = this.lastID;
          res({
            message: `mapping between sandwich ${sandwich_id} and component ${component_id} successfully`,
            addedsandwich_component_id: sandwich_component_id,
          });
        }
      });
    });
  }

  //view all SandwichComponents
  static ViewSandwichComponents() {
    return new Promise((res, rej) => {
      const sql = `select * from Sandwich_Component`;
      db.all(sql, function (err, rows) {
        if (err) {
          rej(err);
        } else {
          res(rows);
        }
      });
    });
  }

  //fn to get component ids of certain sandwich
  static getComponentIds(sandwichId) {
    return new Promise((res, rej) => {
      const sql = `select sc.component_id from Sandwich_Component sc where sc.sandwich_id =? `;
      db.all(sql, [sandwichId], function (err, rows) {
        if (err) {
          console.log("failed to get the components of hte sandwich", err);
          rej(err);
        } else {
          res(rows);
        }
      });
    });
  }

  //fn to get mapping value of certain component and sandwich
  static getMappingValue(component_id, sandwich_id) {
    return new Promise((res, rej) => {
      const sql = `select mapping_value from Sandwich_Component where component_id = ? and sandwich_id =? `;
      const params = [component_id, sandwich_id];
      db.get(sql, params, function (err, row) {
        if (err) {
          console.log(err);
          rej(err);
        } else {
          console.log(row);
          res(row);
        }
      });
    });
  }

  //deleting mapping between sandwich and component , (removing a component from a sandwich)
  static deleteCertianComponentINsandwich(component_id, sandwich_id) {
    return new Promise((res, rej) => {
      const sql = `delete from Sandwich_Component where component_id =? and sandwich_id =?   `;
      const params = [component_id, sandwich_id];
      db.run(sql, params, function (err) {
        if (err) {
          rej(err);
        } else {
          res({
            message: `successfully deleted the mapping between sandwich ${sandwich_id} and component ${component_id}`,
          });
        }
      });
    });
  }

  //delete all sandwich components(this should be called only on deleting a sandwich)
  static deleteAllComponents(sandwich_id) {
    return new Promise((res, rej) => {
      const sql = `delete from Sandwich_Component where sandwich_id=?`;
      const params = [sandwich_id];
      db.run(sql, params, function (err) {
        if (err) {
          rej(err);
        } else {
          res({
            message: `succesfully deleteed the components of the sandwich ${sandwich_id}`,
          });
        }
      });
    });
  }
}

module.exports = Sandwich_Component;
