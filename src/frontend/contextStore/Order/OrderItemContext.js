import React, { createContext, useState } from "react";
import useFormValidation from "../../Hooks/use_fromvalidation";

export const OrderItemContext = createContext({
  orderitems: [],
  updateorderitems: () => {},
  totalOrderCost: "",
  resetOrderItems: () => {},
  deleteItem: () => {},
  handleInputChange: (event) => {},
  validateField: (fieldname, fieldType, fieldValue) => {},
  getErrorMsg: (fieldName) => {},
  errors: {},
  formState: {},
  handleProdPriceChange: (pp) => {},
  prodPrice: "",
});

export const OrderItemProvider = (props) => {
  const cat = { value: "", valid: true };
  const prod = { value: "", valid: true };
  const quantity = { value: "", valid: true };
  const { handleInputChange, validateField, getErrorMsg, errors, formState } =
    useFormValidation({ cat, prod, quantity });

  const [prodPrice, setprodPrice] = useState("");
  const [orderitems, setorderitems] = useState([]);
  const handleProdPriceChange = (pp) => {
    setprodPrice(pp);
  };

  const deleteItem = (id) => {
    const orderItems = [...orderitems];
    console.log(`here is the id ${id}`);

    if (id !== -1) {
      console.log(`i eill delete`);
      orderItems.splice(id, 1);
    }
    setorderitems(orderItems);
  };

  // Create a new variable to store the total order cost
  const totalOrderCost = prodPrice * formState.quantity.value;

  return (
    <OrderItemContext.Provider
      value={{
        orderitems,
        cat,
        prod,
        quantity,
        totalOrderCost,
        deleteItem,
        handleInputChange,
        validateField,
        getErrorMsg,
        errors,
        formState,
        handleProdPriceChange,
        prodPrice,
      }}
    >
      {props.children}
    </OrderItemContext.Provider>
  );
};
