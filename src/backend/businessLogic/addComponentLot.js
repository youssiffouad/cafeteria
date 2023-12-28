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
      const rem = cost - paidAmount;
      //step1- insert into lot table
      const lotID = await Lot.insertComponentLot(
        quantity,
        cost,
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
      await Vendor.changeVendoerOwedMoney(1, lotID, rem); // Use lotID and rem variables
    });
  } catch (err) {
    console.log("error while adding componetLot", err);
    throw err;
  }
};
module.exports = addComponentLot;
