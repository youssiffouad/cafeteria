const Lot = require("../models/Lot");
const Component = require("../models/component");
const addComponentLot = async (
  productID,
  quantity,
  cost,
  received_date,
  payment_method,
  component_id
) => {
  try {
    //step1- insert into lot table
    Lot.insertComponentLot(
      productID,
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
  } catch (err) {}
};
