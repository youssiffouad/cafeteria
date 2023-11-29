import React, { createContext, useEffect, useState } from "react";
import serverport from "../backendconfiguration";
import usePopUp from "../Hooks/use_popup";
import useFormValidation from "../Hooks/use_fromvalidation";

export const vendorContext = createContext({
  vendorlist: [],
  updatevendorlist: () => {},
  formState: {},
  handleInputChange: (event) => {},
  validateField: (fieldName, fieldType, fieldValue) => {},
  errors: {},
  getErrorMsg: (fieldName) => {},
  Msgcomponent: "",
});

export const VendorProvider = (props) => {
  const [vendorlist, setvendorlist] = useState([]);

  const { Msgcomponent, controlDisplay, controlMsgContent } = usePopUp();
  const name = { value: "", valid: true };
  const phone = { value: "", valid: true };
  const {
    handleInputChange,
    validateField,
    errors,
    getErrorMsg,
    resetField,
    formState,
  } = useFormValidation({ name, phone });

  const fetchVendors = () => {
    fetch(`http://localhost:${serverport}/vendors/view`)
      .then((response) => response.json())
      .then((data) => {
        setvendorlist(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Failed to fetch vendors:", error);
      });
  };
  useEffect(() => {
    fetchVendors();
  }, []);

  //adding new vendor
  const updatevendorlist = () => {
    const vendorData = {
      name,
      phone,
    };

    fetch(`http://localhost:${serverport}/vendors/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vendorData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchVendors();
        controlMsgContent(`successfully added new vendor`);
        controlDisplay(true);
        // Perform any necessary actions after adding the vendor
      })
      .catch((error) => {
        controlMsgContent(`failed to add a new vendor ${error}`);
        controlDisplay(true);
        console.error("Failed to add vendor:", error);
        // Handle error
      });

    // Reset form fields
  };

  return (
    <vendorContext.Provider
      value={{
        vendorlist,
        updatevendorlist,
        formState,
        handleInputChange,
        validateField,
        errors,
        getErrorMsg,

        Msgcomponent,
      }}
    >
      {props.children}
    </vendorContext.Provider>
  );
};
