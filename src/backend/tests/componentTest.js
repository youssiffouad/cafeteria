const Component = require("../models/component");
const testAddcomponent = async (name, numberOfUnits, pricePerUnit) => {
  const response = await Component.addComponent(
    name,
    numberOfUnits,
    pricePerUnit
  );
  console.log(response);
};
const testViewComponents = async () => {
  const response = await Component.viewComponents();
  console.log(response);
};

testAddcomponent("salad", 7, 10);

testViewComponents();
