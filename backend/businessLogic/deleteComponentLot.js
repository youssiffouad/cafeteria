const lot = require("../models/Lot");
const component = require("../models/component");
const db = require("../models/db");
const Finance = require("../models/financial");
const deleteComponentLot = async (lotid) => {
  return new Promise((resolve, reject) => {
    try {
      db.serialize(async () => {
        await new Promise((res, rej) => {
          db.run("begin", function (err) {
            if (err) {
              console.log("failed to start txn of deleting component lot");
              rej(err);
            } else {
              console.log(
                "successfully started the txn of deleting component lot"
              );
              res();
            }
          });
        });
        //1-get component id from lotid
        const component_id = await lot.getComponentId(lotid);

        //2-get component current no of units fro certain component
        const currNoOfUnits = await component.getNoOfUnits(component_id);
        console.log("here is the curr no of units", currNoOfUnits);

        //3- get the quantity of the lot because that is the value that would
        //   be decremented  from the component no of units
        const decrementedQuantity = await lot.getQuantity(lotid);
        console.log(
          "here is the qunatity to be decremnented",
          decrementedQuantity
        );

        const newNumberOfUnits = currNoOfUnits - decrementedQuantity;
        console.log("here is te new no of units", newNumberOfUnits);

        //4-decrease component curr no of units by decremented Quantity
        await component.updateComponentNumberOfUnits(
          component_id,
          newNumberOfUnits
        );

        //5- change cash value
        //5(a)- get cost of lot
        const cost = await lot.getCost(lotid);
        console.log("the cost of hte lot is", cost);
        //5(b)- get remaining payment of lot
        const reamining_payment = await lot.getRemainingPayment(lotid);
        console.log("the remaining payment of the lot is", reamining_payment);

        const paidAmount = cost - reamining_payment;
        console.log("the paid ampount equals", paidAmount);
        await Finance.changeCashVlaue(paidAmount);

        //6- remove lot row from lots table
        await lot.removeLotRow(lotid);
        await new Promise((res, rej) => {
          db.run("commit", (err) => {
            if (err) {
              console.log("failed to commit txn of deleting component lot");
              db.run("rollback");
              rej(err);
            } else {
              console.log("successfully committed the txn");
              res();
            }
          });
        });
        resolve({ message: "component lot deleted successfully", lotid });
      });
    } catch (err) {
      console.log("failed to delete compoennt lot");
      db.run("rollback");
      reject(err);
    }
  });
};

module.exports = deleteComponentLot;
