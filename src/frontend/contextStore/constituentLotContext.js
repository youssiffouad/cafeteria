import useFormValidation from "../Hooks/use_fromvalidation";

const { createContext } = require("react");

export const ConstituentLotContext = createContext({
  formstate: {},
  handleInputChange: (e) => {},
  validateField: (fn, ft, fv) => {},
});
export const ConstituentLotProvider = (props) => {
  const constituentName = { value: "", valid: true };
  const noOfUnits = { value: "", valid: true };
  const { formstate, handleInputChange, validateField, getErrorMsg } =
    useFormValidation({ constituentName, noOfUnits });
  return (
    <ConstituentLotContext.Provider
      value={{ formstate, handleInputChange, validateField }}
    >
      {props.children}
    </ConstituentLotContext.Provider>
  );
};
