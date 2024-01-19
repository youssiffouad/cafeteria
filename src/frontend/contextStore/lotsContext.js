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
  handleDeleteLot: (L, type) => {},
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
  const handleDeleteLot = async (Lotid, type) => {
    try {
      if (type === "Product") {
        console.log("here is the Product lotid that i will delete", Lotid);
        const lotid = { Lotid };
        const response = await fetch(
          `http://localhost:${serverport}/lots/deleteProductLot`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(lotid),
          }
        );
        if (!response.ok) {
          throw new Error("failed  to delete product lot");
        } else {
          console.log(" here is the response from backend", response);
          await fetchLots();
          controlMsgContent(`تم ازالة مشتريات المنتج بنجاح`);
          controlDisplay(true);
        }
      } else if (type === "Component") {
        console.log("here is the Component lotid that i will delete", Lotid);
        const lotid = { Lotid };
        const response = await fetch(
          `http://localhost:${serverport}/lots/deleteComponentLot`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(lotid),
          }
        );
        if (!response.ok) {
          throw new Error("failed  to delete product lot");
        } else {
          const data = await response.json();
          console.log(" here is the response from backend", data);
          await fetchLots();
          controlMsgContent(`تم ازالة مشتريات المكون بنجاح`);
          controlDisplay(true);
        }
      }
    } catch (err) {
      console.error(err);
      controlMsgContent(`فشل ازالة المشتريات  :${err}`);
      controlDisplay(true);
      // Handle error
    }
  };
  //function to handle instaling of lot(دفع المبلغ المتبقي)
  const installLot = async (lot_id) => {
    try {
      const lotid = { lot_id };
      console.log(lotid);
      console.log(` i callled after the press`);
      const response = await fetch(
        `http://localhost:${serverport}/lots/install`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(lotid),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to install lot");
      }
      fetchLots();
      controlDisplay(true);
      controlMsgContent(" تم  دفع المبلع المتبقي بنجاح");

      // Perform any necessary actions after adding the lot
    } catch (error) {
      console.error(error);
      controlDisplay(true);
      controlMsgContent("فشل  دفع المبلع المتبقي");
    }
  };
  //function to reset states of form of adding new lot
  const resetState = () => {
    prodAndCatCtx.resetField("prod");
    prodAndCatCtx.resetField("cat");
    resetField("quantity");
    resetField("cost");
    resetField("paidAmount");
    resetField("received_date");
  };

  //function that handles adding new lot
  const updateLotList = async () => {
    try {
      const lotdata = {
        productID: prodAndCatCtx.formState.prod.value,
        catid: prodAndCatCtx.formState.cat.value,
        quantity: formState.quantity.value,
        cost: formState.cost.value,
        paidAmount: formState.paidAmount.value,
        received_date: formState.received_date.value,
      };
      console.log("here is the lot data i will send to the backend", lotdata);

      const response = await fetch(
        `http://localhost:${serverport}/lots/addordinaryLot`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(lotdata),
        }
      );
      const data = await response.json();
      console.log("here is the response i got on adding a new lot", data);

      if (!response.ok) {
        throw new Error("Failed to add lot");
      }
      fetchLots();
      controlDisplay(true);
      if (data.BuyingPriceChange) {
        const newSellingPrice = formState.cost.value / formState.quantity.value;
        controlMsgContent(
          `تم اضافة المشتريات بنجاح و تغيير سعر المنتج الي ${newSellingPrice}`
        );
      } else {
        controlMsgContent(`تم اضافة المشتريات بنجاح  `);
      }
      resetState();
    } catch (error) {
      console.error(error);
      controlMsgContent(`failed to add the new lot : ${error}`);
      controlDisplay(true);
      // Handle error
    }
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
