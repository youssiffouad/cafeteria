import React, { useEffect } from "react";
import { ProductProvider } from "../../contextStore/productsContext";
import NewProductForm from "./AddNewProduct";
import ProductList from "./products_list";
import usePopUp from "../../Hooks/use_popup";

const ProductWhole = (props) => {
  const { ControllerBtn, controlFormJSX, FormContent } =
    usePopUp("اضافة منتج جديد");
  const payloadForm = <NewProductForm toggleDisplay={props.toggleDisplay} />;
  useEffect(() => {
    controlFormJSX(payloadForm);
  }, []);
  return (
    <ProductProvider>
      <div className="d-flex flex-column align-content-center align-items-center mt-3">
        <ControllerBtn />
        <FormContent />
      </div>
      <ProductList />
    </ProductProvider>
  );
};

export default ProductWhole;
