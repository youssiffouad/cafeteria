const component = require("../models/component");
const testAddComp = async () => {
  const res = await component.addComponent(
    "composite1",
    0,
    70,
    [{ child_component_id: 1, mapping_value: 10, price_per_unit: 200 }],
    1
  );
  console.log(res);
};
// testAddComp();

const testViewComponents = async () => {
  const result = await component.viewComponents();
  console.log(result);
};
testViewComponents();
