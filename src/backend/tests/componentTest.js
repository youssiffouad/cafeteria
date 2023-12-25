const Component = require("../models/component");
const testAddcomponent = async (
  name,
  numberOfUnits,
  pricePerUnit,
  complist
) => {
  const response = await Component.addComponent(
    name,
    numberOfUnits,
    pricePerUnit,
    complist
  );
  console.log("heeeeeeeeeeeeereeeeeeeeeeeee  is", response);
};
const testViewComponents = async () => {
  const response = await Component.viewComponents();
  console.log(response);
};

testViewComponents();
