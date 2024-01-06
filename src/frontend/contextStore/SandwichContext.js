import { createContext, useEffect, useState } from "react";
import serverport from "../backendconfiguration";
import useFormValidation from "../Hooks/use_fromvalidation";

export const SandwichCtx = createContext({
  componentsList: [],
  compName: "",
  compMapping: "",
  addSandwich: () => {},
  modifyComponets: (comp) => {},
  ChangeCompName: (name) => {},
  Changemapping: (mapping) => {},
  calculateCost: () => {},
  cost: "",
  formState: {},
  handleInputChange: (event) => {},
  validateField: (fieldName, fieldType, fieldValue) => {},
  getErrorMsg: (fieldName) => {},
  changePricePerUnit: (ppu) => {},
  changeComponent_id: (compid) => {},
  SandwichesList: [],
});

export const SandwichProvider = (props) => {
  let name = { value: "", valid: true };
  let selling_price = { value: "", valid: true };

  const { formState, handleInputChange, validateField, getErrorMsg } =
    useFormValidation({ name, selling_price });
  const [price_per_unit, setprice_per_unit] = useState("");
  const [SandwichesList, setSandwichesList] = useState([]);
  const [componentsList, setComponents] = useState([]);
  const [compName, setcompName] = useState("");
  const [compMapping, setcompMapping] = useState("");
  const [compid, setcompid] = useState("");
  const [cost, setcost] = useState(0);

  //function to  fetch sandwiches
  const fetchSandwiches = async () => {
    const response = await fetch(
      `http://localhost:${serverport}/sandwiches/viewSandwiches`
    );
    const data = await response.json();
    console.log("here is the data of sandwiches", data);
    setSandwichesList(data);
  };
  //useEffect to fetch sandwiches automaticallly on loading hte page
  useEffect(() => {
    fetchSandwiches();
  }, []);

  //function to add new sandwich
  const addSandwich = async () => {
    const sandwichData = {
      name: formState.name.value,
      componentsList,
      sellingPrice: formState.selling_price.value,
    };
    console.log("here is the sandwich data", sandwichData);
    const response = await fetch(
      `http://localhost:${serverport}/sandwiches/addSandwich`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sandwichData),
      }
    );
    const data = await response.json();
    await fetchSandwiches();
    console.log("here is the repsonse from adding new sandwich", data);
  };

  //function to change component name
  const ChangeCompName = (name) => {
    console.log(`i change the name`);
    setcompName(name);
  };

  //function to change mapping
  const Changemapping = (mapping) => {
    setcompMapping(mapping);
  };
  const changeComponent_id = (compid) => {
    setcompid(compid);
  };
  const changePricePerUnit = (ppu) => {
    console.log("i changed the price per unit");
    setprice_per_unit(ppu);
  };
  const modifyComponets = () => {
    setComponents((prev) => [
      ...prev,
      {
        name: compName,
        mapping_value: parseFloat(compMapping),
        component_id: compid,
        price_per_unit,
      },
    ]);
  };
  const calculateCost = useEffect(() => {
    console.log("here is the test", componentsList);
    const totalCost = componentsList.reduce((prev, curr) => {
      const share = curr.price_per_unit / parseFloat(curr.mapping_value);
      console.log("HERE IS THE PREV", prev);
      console.log("here is the current", curr);
      console.log("here is the current mapping", curr.mapping_value);
      console.log("here is the share", share);
      return prev + parseFloat(share);
    }, 0);
    setcost(totalCost);
    console.log("here is the total cost", totalCost);
  }, [componentsList]);
  return (
    <SandwichCtx.Provider
      value={{
        componentsList,
        modifyComponets,
        compName,
        compMapping,
        Changemapping,
        ChangeCompName,
        changePricePerUnit,
        cost,
        calculateCost,
        addSandwich,
        formState,
        handleInputChange,
        validateField,
        getErrorMsg,
        changeComponent_id,
        SandwichesList,
      }}
    >
      {props.children}
    </SandwichCtx.Provider>
  );
};
