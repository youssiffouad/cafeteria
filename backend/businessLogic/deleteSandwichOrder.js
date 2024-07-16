const Order = require("../models/order");
const Sandwich_Component = require("../models/sandwich_component");
const Component = require("../models/component");
const OrderItems=require("../models/orderItems")
const db = require("../models/db");

//remove the sandwich order from the orders table , get component ids of the sandwich ,
// get no of units and mapping values , update component no of units
const deleteSandwichOrder = async (orderId) => {
  return new Promise((resolve, reject) => {
    try {
      db.serialize(async () => {
        try{
          await new Promise((res, rej) => {
            db.run("begin", function (err) {
              if (err) {
                console.log("failed to start the transaction", err);
                rej();
              } else {
                console.log("started hte transaction");
                res();
              }
            });
          });
          //step1-get sandwich id of certain order
          const sandwich_id = await Order.getSandwichIdFromOrderId(orderId);
  
          //step2- get components ids of certain sandwich
          const componentIds = await Sandwich_Component.getComponentIds(
            sandwich_id
          );
  
          //step3- get no of units and mapping values
          try{
            await Promise.all(
              componentIds.map(async (comp) => {
                try{
                  const number_of_units = await Component.getNoOfUnits(comp);
                const mapping_value = await Sandwich_Component.getMappingValue(
                  comp,
                  sandwich_id
                );
                //get number of sandwiches in the order
                const noOfSandwiches= await OrderItems.getQuantityByOrderId(orderId);
                const newNumberOfUnits = number_of_units +(1 / mapping_value)*noOfSandwiches ;
                console.log(newNumberOfUnits, mapping_value);
    
                //step4-  update component number of units
                await Component.updateComponentNumberOfUnits(
                  comp,
                  newNumberOfUnits
                );
                }catch(err){
                  console.log("i caught the erroroorororororo",err);
                  throw err;
                }
                
              })
            );
          }catch(err){
            console.log("i caught the erroroorororororo2222222222222222222",err);
            throw err;
          }
            
         
          
          //step5- delete sandwich from orders table
          await Order.deleteOrderRow(orderId);
          await new Promise((res, rej) => {
            db.run("commit", (err) => {
              if (err) {
                console.log("failed ro commit", err);
                db.run("rollback");
                rej(err);
              } else {
                console.log("successfully committed the transcation");
                res();
              }
            });
          });
          console.log("before resolving");
          resolve({ message: "sandwich order deleted successfully", orderId });
        }catch(err){
          console.log("i caught the eroor bfdg rrkmarady");
          reject(err);
        }
      
      });
    } catch (err) {
      db.run("rollback");
      console.log("failed to delete sandwich order", err);
      reject(err);
    }
  });
};
module.exports = deleteSandwichOrder;
