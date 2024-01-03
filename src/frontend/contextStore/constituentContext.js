import useFormValidation from "../Hooks/use_fromvalidation";
const { createContext } = require("react");

export const ConstituentContext = createContext({
  formState: {},
  validateField: (fieldName, fieldType, fieldValue) => {},
  handleInputChange: (event) => {},
});

export const ConstituentProvider = (props) => {
  const constituentName = { value: "", valid: true };
  const noOfUnits = { value: "", valid: true };
  const priceOfUnit = { value: "", valid: true };
  const { formState, handleInputChange, validateField } = useFormValidation({
    constituentName,
    noOfUnits,
    priceOfUnit,
  });

  return (
    <ConstituentContext.Provider
      value={{ formState, handleInputChange, validateField }}
    >
      {props.children}
    </ConstituentContext.Provider>
  );
};
