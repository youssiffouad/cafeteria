import { createContext, useEffect, useState } from "react";
import serverport from "../backendconfiguration";
import useFormValidation from "../Hooks/use_fromvalidation";
import usePopUp from "../Hooks/use_popup";

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
  formStateFilterByCat: {},
  HIGFilterByCat: (event) => {},
  VFFilterByCat: (fn, ft, fv) => {},
  GEMSGFilterByCat: (fn) => {},
  sandwich_selling_price: "",
  handleSellingPriceOfsandwich: (sp) => {},
  deleteSandwich: (sid) => {},
  Msgcomponent: <></>,
});

export const SandwichProvider = (props) => {
  //the following two variables will be used while adding new sandwich
  let name = { value: "", valid: true };
  let selling_price = { value: "", valid: true };

  //this variable is to handle the sandwich id we get while addinf new sandwichorder
  let sandwichId = { value: "", valid: true };

  //this is the form validation for adding new sandwich
  const {
    formState,
    handleInputChange,
    validateField,
    getErrorMsg,
    resetField,
  } = useFormValidation({ name, selling_price });
  const { controlDisplay, controlMsgContent, Msgcomponent } = usePopUp();

  //this is the from validation for filter by category
  const {
    formState: formStateFilterByCat,
    handleInputChange: HIGFilterByCat,
    validateField: VFFilterByCat,
    getErrorMsg: GEMSGFilterByCat,
  } = useFormValidation({ sandwichId });
  const [price_per_unit, setprice_per_unit] = useState("");
  const [SandwichesList, setSandwichesList] = useState([]);
  const [componentsList, setComponents] = useState([]);
  const [compName, setcompName] = useState("");
  const [compMapping, setcompMapping] = useState("");
  const [compid, setcompid] = useState("");
  //this state is to store cost of a newly added sandwich
  const [cost, setcost] = useState(0);
  //this state is to store the selling price of selected sandwich
  const [sandwich_selling_price, setsandwich_selling_price] = useState("");

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

  //function to delete certain Sandwich
  const deleteSandwich = async (id) => {
    try {
      const sandID = { id };
      const response = await fetch(
        `http://localhost:${serverport}/sandwiches/deleteSandwich`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sandID),
        }
      );
      if (!response.ok) {
        throw new Error(
          `Failed to delete sandwich. Status: ${
            response.status
          } ${response.json()}`
        );
      }
      const data = await response.json();
      console.log(data);
      controlDisplay(true);
      controlMsgContent("تم ازالة الساندوتش بنجاح");
      await fetchSandwiches();
    } catch (err) {
      console.log("failed to delete sandwich", err);
      controlDisplay(true);
      controlMsgContent("فشل ازالة الساندوتش ");
    }
  };
  //function to reset states of hte form after adding new Sandwich
  const resetStates = () => {
    resetField("name");
    resetField("selling_price");
    setcost("");
    setcompName("");
    setcompMapping("");
    setcompid("");
    setComponents([]);
  };

  //function to add new sandwich
  const addSandwich = async () => {
    try {
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
      controlMsgContent("تم اضافة الساندوتش بنجاح");
      controlDisplay(true);
      resetStates();
      console.log("here is the repsonse from adding new sandwich", data);
    } catch (err) {
      console.log("failed to add new Sandwich", err);
      controlDisplay(true);
      controlMsgContent("فشل اضافة ساندوتش جديد");
    }
  };

  //function to handle change of  selling price on selecting certain sandwich
  const handleSellingPriceOfsandwich = (sp) => {
    setsandwich_selling_price(sp);
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
        formStateFilterByCat,
        HIGFilterByCat,
        VFFilterByCat,
        GEMSGFilterByCat,
        sandwich_selling_price,
        handleSellingPriceOfsandwich,
        Msgcomponent,
        deleteSandwich,
      }}
    >
      {props.children}
    </SandwichCtx.Provider>
  );
};
