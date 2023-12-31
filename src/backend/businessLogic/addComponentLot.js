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
  try {
    db.serialize(async () => {
      db.run("BEGIN", () => {
        console.log(" is started the txn of adding new compoent lot");
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
      const newNumberOfUnits = noOfUnits + quantity;
      Component.updateComponentNumberOfUnits(component_id, newNumberOfUnits);

      //step 3-change financial,product and vendor status

      await Finance.changeCashVlaue(-paidAmount);
      await Finance.updatemyDebt(cost - paidAmount);
      await Vendor.changeVendoerOwedMoney(1, lotID, rem); // Use lotID and rem variables
      db.run("COMMIT", () => {
        console.log("i commited hte txn of adding component lot");
      });
    });
  } catch (err) {
    db.run("rollback", () => {
      console.log("i rolled back adding component lot");
    });
    console.log("error while adding componetLot", err);
    throw err;
  }
};
module.exports = addComponentLot;
