import { createContext, useEffect, useState } from "react";
import useFormValidation from "../Hooks/use_fromvalidation";

export const LotConstituentCtx = createContext({});

export const LotConsituentProvider = (props) => {
  const quantity = { value: "", valid: true };
  const cost = { value: "", valid: true };
  const paidAmount = { value: "", valid: true };
  const received_date = { value: "", valid: true };
  const payment_method = { value: "", valid: true };

  const component_id = { value: "", valid: true };
  const {
    handleInputChange,
    validateField,
    getErrorMsg,
    errors,
    formState,
    resetField,
  } = useFormValidation({
    quantity,
    cost,
    paidAmount,
    paidAmount,
    received_date,
    payment_method,
  });

  return (
    <LotConstituentCtx.Provider value={{}}>
      {props.children}
    </LotConstituentCtx.Provider>
  );
};
