import React, { createContext, useEffect, useState } from "react";
import serverport from "../backendconfiguration";
import usePopUp from "../Hooks/use_popup";
import useFormValidation from "../Hooks/use_fromvalidation";

export const CustomerContext = createContext({
  custlist: [],
  updatecustlist: () => {},

  handleInputChange: (event) => {},
  validateField: (fieldName, fieldType, fieldValue) => {},

  ranks: [],
  Msgcomponent: "",
  formState: {},
  errors: {},
});

export const CustomerProvider = (props) => {
  const [custlist, setcustlist] = useState([]);

  const [ranks, setranks] = useState([]);
  const { Msgcomponent, controlDisplay, controlMsgContent } = usePopUp();
  const customerName = { value: "", valid: true };
  const customerRank = { value: "", valid: true };
  const {
    formState,
    errors,
    handleInputChange,
    validateField,
    resetField,
    getErrorMsg,
  } = useFormValidation({ customerName, customerRank });

  //view all customers
  useEffect(() => {
    fetch(`http://localhost:${serverport}/customers/view`)
      .then((response) => response.json())
      .then((data) => {
        setcustlist(data);
      })
      .catch((error) => {
        console.error("Failed to fetch customers:", error);
      });
  }, [formState.customerName.value]);

  useEffect(() => {
    fetch(`http://localhost:${serverport}/ranks/view`)
      .then((response) => response.json())
      .then((data) => {
        setranks(data);
      })
      .catch((error) => {
        console.error("Failed to fetch ranks:", error);
      });
  }, []);

  const updatecustlist = () => {
    const customerData = {
      name: formState.customerName.value,
      rankId: formState.customerRank.value,
    };
    console.log(customerData);

    fetch(`http://localhost:${serverport}/customers/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        controlMsgContent("successfully added new customer");
        controlDisplay(true);
        // Perform any necessary actions after adding the customer
      })

      .catch((error) => {
        console.error("Failed to add customer:", error);
        controlMsgContent(`Failed to add customer, error`);
        controlDisplay(true);
        // Handle error
      });

    // Reset form fields
    resetField("customerName");
    resetField("customerRank");
  };

  return (
    <CustomerContext.Provider
      value={{
        custlist,
        updatecustlist,
        ranks,
        Msgcomponent,
        formState,
        handleInputChange,
        validateField,
        resetField,
        getErrorMsg,
        errors,
      }}
    >
      {props.children}
    </CustomerContext.Provider>
  );
};
