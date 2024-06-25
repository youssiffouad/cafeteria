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

  //fetch vendor list
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
  const updatevendorlist = async () => {
    try {
      const vendorData = {
        name: formState.name.value,
        phone: formState.phone.value,
      };

      const response = await fetch(
        `http://localhost:${serverport}/vendors/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vendorData),
        }
      );
      const data = await response.json();

      console.log(data);
      fetchVendors();
      controlMsgContent(`تم اضافة مورد جديد بنجاح`);
      controlDisplay(true);
      // Perform any necessary actions after adding the vendor
    } catch (error) {
      controlMsgContent(`فشل اضافة مورد جديد ${error}`);
      controlDisplay(true);
      console.error("Failed to add vendor:", error);
      // Handle error
    }

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
