import { json } from "express";
import { createContext, useEffect, useState } from "react";

export const SandwichCtx = createContext({
  componentsList: [],
  compName: "",
  compMapping: "",
  addSandwich: () => {},
  modifyComponets: (comp) => {},
  ChangeName: (name) => {},
  Changemapping: (mapping) => {},
  calculateCost: () => {},
  cost: "",
});

export const SandwichProvider = (props) => {
  const [componentsList, setComponents] = useState([]);
  const [compName, setcompName] = useState("");
  const [compMapping, setcompMapping] = useState("");
  const [cost, setcost] = useState(0);

  const addSandwich = async () => {
    const sandwichData = {
      name: compMapping,
      componentsList,
      sellingPrice: cost,
    };
    const response = await fetch(
      "http://localhost:${serverport}/sandwiches/addSandwich",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sandwichData),
      }
    );
    const data = await response.json();
    console.log(data);
  };
  const ChangeName = (name) => {
    console.log(`i change the name`);
    setcompName(name);
  };
  const Changemapping = (mapping) => {
    setcompMapping(mapping);
  };
  const modifyComponets = () => {
    setComponents((prev) => [
      ...prev,
      { name: compName, mapping: parseInt(compMapping) },
    ]);
  };
  const calculateCost = useEffect(() => {
    console.log(componentsList);
    const totalCost = componentsList.reduce((prev, curr) => {
      console.log(curr);
      console.log(curr.mapping);
      return prev + parseInt(curr.mapping);
    }, 0);
    setcost(totalCost);
    console.log(totalCost);
  }, [componentsList]);
  return (
    <SandwichCtx.Provider
      value={{
        componentsList,
        modifyComponets,
        compName,
        compMapping,
        Changemapping,
        ChangeName,
        cost,
        calculateCost,
        addSandwich,
      }}
    >
      {props.children}
    </SandwichCtx.Provider>
  );
};
