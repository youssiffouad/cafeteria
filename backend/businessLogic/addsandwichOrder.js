const Component = require("../models/component");
const db = require("../models/db");
const Order = require("../models/order");
const OrderItems=require("../models/orderItems");
const Sandwich_Component = require("../models/sandwich_component");
const addsandwichOrder = async (
  price,
  payment_method,
  customer_id,
  order_date,
  sandwich_id,
  noOfSandwiches
) => {
  return new Promise(async (resolve, reject) => {
    try {
      db.serialize(async () => {
        await new Promise((res, rej) => {
          db.run("begin", (err) => {
            if (err) rej(err);
            else res();
          });
        });
        //step1- insert sandwich into the orders table
        const response = await Order.insertSandwichOrder(
          price,
          payment_method,
          customer_id,
          order_date,
          sandwich_id
        );
        const order_id=response?.order_id;
        //step 1(b)- insert into order items table the qauntity of the sandwiches 
        OrderItems.insertSandwichOrderItem(order_id,sandwich_id,noOfSandwiches);

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
            const newNumberOfUnits = number_of_units - (1 / mapping_value) *noOfSandwiches;
            console.log(number_of_units, mapping_value);

            //step4-  update component number of units
            await Component.updateComponentNumberOfUnits(
              comp,
              newNumberOfUnits
            );
            console.log("added sandwich successfully");
          })
        );
        await new Promise((res, rej) => {
          db.run("commit", (err) => {
            if (err) {
              db.run("rollback");
              rej(err);
            } else res();
          });
        });
        resolve({ message: "added the sandwich order successfully", response });
      });
    } catch (err) {
      console.log("failed to add sandwich", err);
      db.run("rollback");
      reject(err);
    }
  });
};
module.exports = addsandwichOrder;
