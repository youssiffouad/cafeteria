import React, { createContext, useEffect, useState } from "react";
import serverport from "../backendconfiguration";
import usePopUp from "../Hooks/use_popup";
import useFormValidation from "../Hooks/use_fromvalidation";

export const ProductContext = createContext({
  prodlist: [],
  updateprodlist: () => {},
  formState: {},
  errors: {},
  getErrorMsg: (fieldName) => {},
  handleInputChange: (event) => {},
  validateField: (fieldName, fieldType, fieldValue) => {},
  vendors: [],
  categories: [],
  Msgcomponent: "",
});

export const ProductProvider = (props) => {
  const [prodlist, setprodlist] = useState([]);

  const [vendors, setVendors] = useState([]);
  const [categories, setcategories] = useState([]);
  const { Msgcomponent, controlDisplay, controlMsgContent } = usePopUp();

  const prodName = { value: "", valid: true };
  const vendorId = { value: "", valid: true };
  const catid = { value: "", valid: true };
  const sellingPrice = { value: "", valid: true };
  const buying_price = { value: "", valid: true };

  const {
    formState,
    errors,
    handleInputChange,
    validateField,
    resetField,
    getErrorMsg,
  } = useFormValidation({
    prodName,
    vendorId,
    catid,
    sellingPrice,
    buying_price,
  });

  const fetchProducts = () => {
    fetch(`http://localhost:${serverport}/products/view`)
      .then((response) => response.json())
      .then((data) => {
        setprodlist(data);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      });
  };

  useEffect(() => {
    fetchProducts();
    fetch(`http://localhost:${serverport}/vendors/view`)
      .then((response) => response.json())
      .then((data) => {
        setVendors(data);
      })
      .catch((error) => {
        console.error("Failed to fetch vendors:", error);
      });
  }, []);
  useEffect(() => {
    fetch(`http://localhost:${serverport}/categories/view`)
      .then((response) => response.json())
      .then((data) => {
        setcategories(data);
      })
      .catch((error) => {
        console.error("Failed to fetch categories:", error);
      });
  }, []);

  const updateprodlist = () => {
    const productData = {
      name: formState.prodName.value,
      vendor_id: formState.vendorId.value,
      catid: formState.catid.value,
      selling_price: formState.sellingPrice.value,
      buying_price: formState.buying_price.value,
      quantity: 0,
    };

    fetch(`http://localhost:${serverport}/products/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Perform any necessary actions after adding the product
        fetchProducts();
        controlMsgContent(`successfully adde new Product`);
        controlDisplay(true);
      })
      .catch((error) => {
        console.error("Failed to add product:", error);
        controlMsgContent(`failed to add new Product`);
        controlDisplay(true);
        // Handle error
      });

    // Reset form fields
    resetField("prodName");
    resetField("vendorId");
    resetField("sellingPrice");

    resetField("quantity");
  };

  return (
    <ProductContext.Provider
      value={{
        prodlist,
        updateprodlist,
        formState,
        errors,
        getErrorMsg,
        handleInputChange,
        validateField,

        vendors,
        categories,
        Msgcomponent,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
