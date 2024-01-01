const Order = require("../models/order");
const Sandwich_Component = require("../models/sandwich_component");
const Component = require("../models/component");
const db = require("../models/db");

//remove the sandwich order from the orders table , get component ids of the sandwich ,
// get no of units and mapping values , update component no of units
const deleteSandwichOrder = async (orderId) => {
  try {
    db.serialize(async () => {
      db.run("begin");
      //step1-get sandwich id of certain order
      const sandwich_id = await Order.getSandwichIdFromOrderId(orderId);

      //step2- get components ids of certain sandwich
      const componentIds = await Sandwich_Component.getComponentIds(
        sandwich_id
      );

      //step3- get no of units and mapping values
      await Promise.all(
        componentIds.map(async (comp) => {
          const number_of_units = await Component.getNoOfUnits(comp);
          const mapping_value = await Sandwich_Component.getMappingValue(
            comp,
            sandwich_id
          );
          const newNumberOfUnits = number_of_units - 1 / mapping_value;
          console.log(number_of_units, mapping_value);

          //step4-  update component number of units
          await Component.updateComponentNumberOfUnits(comp, newNumberOfUnits);
          console.log("added sandwich successfully");
        })
      );

      //step5- delete sandwich from orders table
      Order.deleteOrderRow(orderId, function (err) {
        if (err) {
          console.log("failed to delete order row", err);
          throw err;
        }
      });
      db.run("commit");
    });
  } catch (err) {
    db.run("rollback");
    console.log("failed to delete sandwich order", err);
    throw err;
  }
};
module.exports = deleteSandwichOrder;
