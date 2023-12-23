const Sandwich = require("../models/sandwich");
const Sandwich_Component = require("../models/sandwich_component");

const testViewSandwichesComponents = async () => {
  const response = await Sandwich_Component.ViewSandwichComponents();
  console.log(response);
};
const testAddSandwich = async (name, complist, sellingprice) => {
  const response = await Sandwich.addSandwich(name, complist, sellingprice);
  console.log(response);
  testViewSandwichesComponents();
};

const testCalculateCost = (complist) => {
  let result = Sandwich.calculateCost(complist);
  console.log(result);
};

testAddSandwich(
  "foool",
  [
    { component_id: 1, mapping_value: 20, price_per_unit: 5 },
    { component_id: 2, mapping_value: 10, price_per_unit: 7 },
  ],
  20
);

// testCalculateCost([
//   { component_id: 1, mapping_value: 20, price_per_unit: 5 },
//   { component_id: 2, mapping_value: 10, price_per_unit: 7 },
// ]);
