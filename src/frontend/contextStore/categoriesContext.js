import React, { createContext, useEffect, useState } from "react";
import serverport from "../backendconfiguration";
import usePopUp from "../Hooks/use_popup";
import useFormValidation from "../Hooks/use_fromvalidation";

export const CategoriesContext = createContext({
  Categorieslist: [],
  updateCategorieslist: () => {},
  name: "",
  updatename: (n) => {},
  Msgcomponent: "",
  formState: {},
});

export const CategoriesProvider = (props) => {
  const [Categorieslist, setCategorieslist] = useState([]);

  const { Msgcomponent, controlDisplay, controlMsgContent } = usePopUp();
  const categoryName = "";
  const { formState, errors, validateField, resetField, handleInputChange } =
    useFormValidation({ categoryName });

  useEffect(() => {
    fetch(`http://localhost:${serverport}/Categories/view`)
      .then((response) => response.json())
      .then((data) => {
        setCategorieslist(data);
      })
      .catch((error) => {
        console.error("Failed to fetch Categoriess:", error);
      });
  }, [formState.categoryName]);

  //adding new Categories
  const updateCategorieslist = () => {
    const CategoriesData = {
      name: formState.categoryName,
    };

    fetch(`http://localhost:${serverport}/Categories/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(CategoriesData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Perform any necessary actions after adding the Categories
        controlMsgContent("successfully added new category");
        controlDisplay(true);
      })
      .catch((error) => {
        console.error("Failed to add Categories:", error);
        controlMsgContent(`Failed to add Categories:, ${error}`);
        controlDisplay(true);
        // Handle error
      });

    // Reset form fields
    resetField("categoryName");
  };
  const updatename = (event) => {
    // setName(name);
    handleInputChange(event);
    validateField("name", formState.categoryName);
  };

  return (
    <CategoriesContext.Provider
      value={{
        Categorieslist,
        updateCategorieslist,

        formState,
        updatename,
        Msgcomponent,
      }}
    >
      {props.children}
    </CategoriesContext.Provider>
  );
};
