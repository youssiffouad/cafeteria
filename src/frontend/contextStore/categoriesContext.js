import React, { createContext, useEffect, useState } from "react";
import serverport from "../backendconfiguration";
import usePopUp from "../Hooks/use_popup";
import useFormValidation from "../Hooks/use_fromvalidation";

export const CategoriesContext = createContext({
  Categorieslist: [],
  updateCategorieslist: () => {},

  Msgcomponent: "",
  formState: {},
  validateField: (fieldName, fieldType, fieldValue) => {},
  getErrorMsg: (FieldName) => {},
  errors: {},
  handleInputChange: (event) => {},
});

export const CategoriesProvider = (props) => {
  const [Categorieslist, setCategorieslist] = useState([]);

  const { Msgcomponent, controlDisplay, controlMsgContent } = usePopUp();
  const categoryName = { value: "", valid: true };
  const {
    formState,
    errors,
    getErrorMsg,
    validateField,
    resetField,
    handleInputChange,
  } = useFormValidation({ categoryName });

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `http://localhost:${serverport}/Categories/view`
      );
      const data = await response.json();
      setCategorieslist(data);
    } catch (error) {
      console.error("Failed to fetch Categoriess:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  //adding new Categories
  const updateCategorieslist = async () => {
    try {
      const CategoriesData = {
        name: formState.categoryName.value,
      };

      const response = await fetch(
        `http://localhost:${serverport}/Categories/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(CategoriesData),
        }
      );
      const data = await response.json();
      fetchCategories();

      // Perform any necessary actions after adding the Categories
      controlMsgContent("successfully added new category");
      controlDisplay(true);
    } catch (error) {
      console.error("Failed to add Categories:", error);
      controlMsgContent(`Failed to add Categories:, ${error}`);
      controlDisplay(true);
      // Handle error
    }

    // Reset form fields
    resetField("categoryName");
  };

  return (
    <CategoriesContext.Provider
      value={{
        Categorieslist,
        updateCategorieslist,

        formState,

        validateField,
        getErrorMsg,
        errors,
        Msgcomponent,
        handleInputChange,
      }}
    >
      {props.children}
    </CategoriesContext.Provider>
  );
};
