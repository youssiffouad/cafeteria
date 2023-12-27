const Component = require("../models/component");
const db = require("../models/db");
const Order = require("../models/order");

const Sandwich_Component = require("../models/sandwich_component");
const addsandwichOrder = async (
  price,
  payment_method,
  customer_id,
  order_date,
  sandwich_id
) => {
  try {
    db.serialize(async () => {
      //step1- insert sandwich into the orders table
      await Order.insertSandwichOrder(
        price,
        payment_method,
        customer_id,
        order_date,
        sandwich_id
      );

      //step2- get components ids of certain sandwich
      const componentIds = await Sandwich_Component.getComponentIds(
        sandwich_id
      );

      //step3- for every component get numberOfUnits and mapping value & updateCompNoOfUnits
      await Promise.all(
        componentIds.map(async (comp) => {
          const number_of_units = await Component.getNoOfUnits(comp);
          const mapping_value = await Sandwich_Component.getMappingValue(
            comp,
            sandwich_id
          );
          const newNumberOfUnits = number_of_units - 1 / mapping_value;
          console.log(number_of_units, mapping_value);
          await Component.updateComponentNumberOfUnits(comp, newNumberOfUnits);
          console.log("added sandwich successfully");
        })
      );
    });
  } catch (err) {
    console.log("failed to add sandwich", err);
  }
};
module.exports = addsandwichOrder;
