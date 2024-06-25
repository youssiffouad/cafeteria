import useFormValidation from "../Hooks/use_fromvalidation";
import usePopUp from "../Hooks/use_popup";
import serverport from "../backendconfiguration";
import { LotContext, LotProvider } from "./lotsContext";
const { createContext, useState, useContext } = require("react");

export const ConstituentLotContext = createContext({
  formState: {},
  handleInputChange: (e) => {},
  validateField: (fn, ft, fv) => {},
  getErrorMsg: (fn) => {},
  submissionHandler: () => {},
  getPricePerUnit: (ppu) => {},
  Msgcomponent: "",
  cost: "",
});
export const ConstituentLotProvider = (props) => {
  const constituentId = { value: "", valid: true };
  const noOfUnits = { value: "", valid: true };
  const received_date = { value: "", valid: true };
  const [price_per_unit, setprice_per_unit] = useState("");
  const { controlDisplay, controlMsgContent, Msgcomponent } = usePopUp();
  //the following fn we get from the lotcontext to
  //fetch the lots again from DB after adding a new component lot
  const { fetchLots } = useContext(LotContext);

  const { formState, handleInputChange, validateField, getErrorMsg } =
    useFormValidation({ constituentId, noOfUnits, received_date });

  //variable to store hte cost of the order
  let cost = price_per_unit * formState.noOfUnits.value;
  console.log("the cost is", cost);

  //function to capture pricePerUnit
  const getPricePerUnit = (ppu) => {
    console.log("here is the price per unit", ppu);
    setprice_per_unit(ppu);
  };

  //function to add new contituent lot
  const submissionHandler = async () => {
    try {
      console.log("i called submission handler in the context");
      const lotdata = {
        quantity: formState.noOfUnits.value,
        cost,
        paidAmount: cost,
        received_date: formState.received_date.value,
        payment_method: "cash",
        component_id: formState.constituentId.value,
      };
      console.log("here is the  lotdata", lotdata);
      const response = await fetch(
        `http://localhost:${serverport}/lots/addcomponentLot`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(lotdata),
        }
      );
      console.log(
        "here is the repsonse of adding new constituent lot",
        response
      );
      const data = await response.json();
      console.log("here is the repsonse of adding new constituent lot", data);
      controlMsgContent("تم اضافة المشتريات الخاصة بالمكون بنجاح");
      console.log("here is the message conpoennt", Msgcomponent);
      controlDisplay(true);
      console.log("response from the adding new componet lot", data);
      fetchLots();
    } catch (err) {
      console.log("there is an error", err);
      controlMsgContent("فشل اضافة المشتريات الخاصة بالمكون ");
      controlDisplay(true);
    }
  };
  return (
    <ConstituentLotContext.Provider
      value={{
        formState,
        handleInputChange,
        validateField,
        getErrorMsg,
        submissionHandler,
        getPricePerUnit,
        Msgcomponent,
        cost,
      }}
    >
      {props.children}
    </ConstituentLotContext.Provider>
  );
};
