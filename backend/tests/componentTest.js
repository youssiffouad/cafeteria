const component = require("../models/component");
const testAddComp = async () => {
  const res = await component.addComponent("constituenttrial", 0, 70);
  console.log("here is the result return of adding new component", res);
};
testAddComp();

const testViewComponents = async () => {
  const result = await component.viewComponents();
  console.log(result);
};
// testViewComponents();
