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
  deleteCustomer: (cid) => {},
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

  const viewCustomers = () => {
    fetch(`http://localhost:${serverport}/customers/view`)
      .then((response) => response.json())
      .then((data) => {
        setcustlist(data);
      })
      .catch((error) => {
        console.error("Failed to fetch customers:", error);
      });
  };

  useEffect(() => {
    viewCustomers();
  }, []);
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
        viewCustomers();
        // Reset form fields
        resetField("customerName");
        resetField("customerRank");
      })

      .catch((error) => {
        console.error("Failed to add customer:", error);
        controlMsgContent(`Failed to add customer, error`);
        controlDisplay(true);
        // Handle error
      });
  };

  //function to delete certain customer
  const deleteCustomer = async (custId) => {
    try {
      const payload = { custId };
      const response = await fetch(
        `http://localhost:${serverport}/customers/deleteCustomer`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        throw new Error("internal server error failed to delete");
      }
      console.log("here is the response", response);
      viewCustomers();
      controlDisplay(true);
      controlMsgContent("تم ازالة المستهلك بنجاح");
    } catch (err) {
      console.log(err);
      controlDisplay(true);
      controlMsgContent("تم ازالة المستهلك بنجاح");
    }
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
        deleteCustomer,
      }}
    >
      {props.children}
    </CustomerContext.Provider>
  );
};
