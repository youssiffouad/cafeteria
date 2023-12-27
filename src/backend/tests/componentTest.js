const component = require("../models/component");
const testAddComp = async () => {
  const res = await component.addComponent("comp1", 0, 70, null, 1);
  console.log(res);
};
testAddComp();
