const Lot = require("../models/Lot");
const Component = require("../models/component");
const db = require("../models/db");

const Finance = require("../models/financial");
const Vendor = require("../models/Vendor");
const addComponentLot = async (
  quantity,
  cost,
  paidAmount,
  received_date,
  payment_method,
  component_id
) => {
  return new Promise((res, rej) => {
    try {
      db.serialize(async () => {
        await new Promise((res, rej) => {
          db.run("BEGIN", (err) => {
            if (err) {
              rej(err);
            } else res();
          });
        });
        const rem = cost - paidAmount;
        //step1- insert into lot table
        const lotID = await Lot.insertComponentLot(
          quantity,
          cost,
          paidAmount,
          received_date,
          payment_method,
          component_id
        );

        //step2- increase component number of units(get no of units )
        const noOfUnits = await Component.getNoOfUnits(component_id);
        console.log("here is the old no of units", noOfUnits);
        const newNumberOfUnits = parseFloat(noOfUnits) + parseFloat(quantity);
        console.log("here is the new no of units", newNumberOfUnits);
        await Component.updateComponentNumberOfUnits(
          component_id,
          newNumberOfUnits
        );

        //step 3-change financial,product and vendor status

        await Finance.changeCashVlaue(-paidAmount);
        await Finance.updatemyDebt(cost - paidAmount);
        await Vendor.changeVendoerOwedMoney(1, lotID, rem); // Use lotID and rem variables
        await new Promise((res, rej) => {
          db.run("COMMIT", (err) => {
            if (err) rej(err);
            else res();
          });
        });
        res({ message: "component lot added successfully", lotid: lotID });
      });
    } catch (err) {
      db.run("rollback", () => {
        console.log("i rolled back adding component lot");
      });
      console.log("error while adding componetLot", err);
      throw err;
    }
  });
};
module.exports = addComponentLot;
