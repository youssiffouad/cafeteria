import React, { createContext, useEffect, useState } from "react";
import serverport from "../backendconfiguration";
import usePopUp from "../Hooks/use_popup";

export const CategoriesContext = createContext({
  Categorieslist: [],
  updateCategorieslist: () => {},
  name: "",
  updatename: (n) => {},
  Msgcomponent: "",
});

export const CategoriesProvider = (props) => {
  const [Categorieslist, setCategorieslist] = useState([]);
  const [name, setName] = useState("");
  const { Msgcomponent, controlDisplay, controlMsgContent } = usePopUp();

  useEffect(() => {
    fetch(`http://localhost:${serverport}/Categories/view`)
      .then((response) => response.json())
      .then((data) => {
        setCategorieslist(data);
      })
      .catch((error) => {
        console.error("Failed to fetch Categoriess:", error);
      });
  }, [name]);

  //adding new Categories
  const updateCategorieslist = () => {
    const CategoriesData = {
      name,
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
    setName("");
  };
  const updatename = (name) => {
    setName(name);
  };

  return (
    <CategoriesContext.Provider
      value={{
        Categorieslist,
        updateCategorieslist,
        name,
        updatename,
        Msgcomponent,
      }}
    >
      {props.children}
    </CategoriesContext.Provider>
  );
};
