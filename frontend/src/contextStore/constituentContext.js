import useFormValidation from "../Hooks/use_fromvalidation";
import serverport from "../backendconfiguration";
const { createContext, useState, useEffect } = require("react");

export const ConstituentContext = createContext({
  formState: {},
  validateField: (fieldName, fieldType, fieldValue) => {},
  handleInputChange: (event) => {},
  getErrorMsg: (fieldName) => {},
  addConstituent: () => {},
  constituentsList: [],
  viewConstituents: () => {},
});

export const ConstituentProvider = (props) => {
  const constituentName = { value: "", valid: true };
  const noOfUnits = { value: "", valid: true };
  const priceOfUnit = { value: "", valid: true };
  const [constituentsList, setconstituentsList] = useState([]);
  const { formState, handleInputChange, validateField, getErrorMsg } =
    useFormValidation({
      constituentName,
      noOfUnits,
      priceOfUnit,
    });

  //fn to view all current constituents
  const viewConstituents = async () => {
    const response = await fetch(
      `http://localhost:${serverport}/components/viewcomponent`
    );
    const data = await response.json();
    setconstituentsList(data);
    console.log("i will call view constituents");
  };
  //fetcing all current constituents as soon as the page loads
  useEffect(() => {
    viewConstituents();
  }, []);

  //fn to add a new constituent
  const addConstituent = async () => {
    const constituentData = {
      name: formState.constituentName.value,
      numberOfUnits: formState.noOfUnits.value,
      pricePerUnit: formState.priceOfUnit.value,
    };
    console.log(
      "here is hte constituent data sent to the server",
      constituentData
    );
    const response = await fetch(
      `http://localhost:${serverport}/components/addcomponent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(constituentData),
      }
    );
    console.log(response);
    const data = await response.json();
    await viewConstituents();
    console.log(data);
  };

  return (
    <ConstituentContext.Provider
      value={{
        formState,
        handleInputChange,
        validateField,
        getErrorMsg,
        addConstituent,
        constituentsList,
        viewConstituents,
      }}
    >
      {props.children}
    </ConstituentContext.Provider>
  );
};
