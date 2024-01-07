import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import serverport from "../backendconfiguration";
import usePopUp from "../Hooks/use_popup";
import useFormValidation from "../Hooks/use_fromvalidation";
import { OrderItemContext } from "./Order/OrderItemContext";

export const LotContext = createContext({
  lotList: [],
  updateLotList: () => {},
  fetchLots: () => {},
  handleInputChange: (event) => {},
  validateField: (fieldName, fieldType, fieldValue) => {},
  getErrorMsg: (fieldName) => {},
  errors: {},
  formState: {},
  handleDeleteLot: (L) => {},
  installLot: (lotid) => {},
  Msgcomponent: "",
});

export const LotProvider = (props) => {
  const [lotList, setLotList] = useState([]);
  const { Msgcomponent, controlDisplay, controlMsgContent } = usePopUp();
  const prodAndCatCtx = useContext(OrderItemContext);

  const prodBuyingPrice = { value: "", valid: true };
  const quantity = { value: "", valid: true };
  const paidAmount = { value: "", valid: true };
  const cost = { value: "", valid: true };
  const received_date = { value: "", valid: true };
  const {
    handleInputChange,
    validateField,
    getErrorMsg,
    errors,
    formState,
    resetField,
  } = useFormValidation({
    prodBuyingPrice,
    quantity,
    paidAmount,
    cost,
    received_date,
  });

  const fetchLots = async () => {
    try {
      const response = await fetch(`http://localhost:${serverport}/lots/view`);
      const data = await response.json();
      setLotList(data);
      console.log("here are the fetched lots from DB", data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };
  const handleDeleteLot = (Lotid) => {
    console.log(Lotid);
    const lotid = { Lotid };
    fetch(`http://localhost:${serverport}/lots/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lotid),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete lot");
        }
        fetchLots();
        controlMsgContent(`successfully deleted the lot`);
        controlDisplay(true);

        // Perform any necessary actions after adding the lot
      })
      .catch((error) => {
        console.error(error);
        controlMsgContent(`failed to delete the lot :${error}`);
        controlDisplay(true);
        // Handle error
      });
  };

  const installLot = (lot_id) => {
    const lotid = { lot_id };
    console.log(lotid);
    console.log(` i callled after the press`);
    fetch(`http://localhost:${serverport}/lots/install`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lotid),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to install lot");
        }
        fetchLots();
        alert("Lot installed successfully");

        // Perform any necessary actions after adding the lot
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
        // Handle error
      });
  };

  const updateLotList = () => {
    const lotdata = {
      productID: prodAndCatCtx.formState.prod.value,
      catid: prodAndCatCtx.formState.cat.value,
      quantity: formState.quantity.value,
      cost: formState.cost.value,
      paidAmount: formState.paidAmount.value,
      received_date: formState.received_date.value,
    };
    console.log(lotdata);
    console.log(`the prod id is ${prodAndCatCtx.formState.prod.value}`);
    fetch(`http://localhost:${serverport}/lots/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lotdata),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add lot");
        }
        console.log(lotdata);

        // Perform any necessary actions after adding the lot
        fetchLots();
        controlMsgContent(`successfully added the new lot`);
        controlDisplay(true);
      })
      .catch((error) => {
        console.error(error);
        controlMsgContent(`failed to add the new lot : ${error}`);
        controlDisplay(true);
        // Handle error
      });
    // Reset form fields
  };

  useEffect(() => {
    fetchLots();
    console.log(` yes i am ehehehhehehehehhehehrrrrrrrrrrreeeeeeeeeeeee`);
  }, []);

  return (
    <LotContext.Provider
      value={{
        lotList,
        updateLotList,
        formState,
        handleInputChange,
        validateField,
        errors,
        getErrorMsg,

        handleDeleteLot,
        installLot,
        Msgcomponent,
        fetchLots,
      }}
    >
      {props.children}
    </LotContext.Provider>
  );
};
