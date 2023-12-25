const Sandwich = require("../models/sandwich");
const Sandwich_Component = require("../models/sandwich_component");

const testViewSandwichesComponents = async () => {
  const response = await Sandwich_Component.ViewSandwichComponents();
  console.log("here is the sandwich components", response);
};
const testAddSandwich = async (name, complist, sellingprice) => {
  const response = await Sandwich.addSandwich(name, complist, sellingprice);
  console.log("here is the result of adding", response);
  testViewSandwichesComponents();
};

const testCalculateCost = (complist) => {
  let result = Sandwich.calculateCost(complist);
  console.log(result);
};
const testViewSandwiches = async () => {
  const result = await Sandwich.viewSandwiches();
  console.log("here is hte sandwiches", result);
};
// testViewSandwichesComponents();
testViewSandwiches();
