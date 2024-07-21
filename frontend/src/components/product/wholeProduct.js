import React, { useEffect } from "react";
import { ProductProvider } from "../../contextStore/productsContext";
import NewProductForm from "./AddNewProduct";
import ProductList from "./products_list";
import usePopUp from "../../Hooks/use_popup";
import SseComponent from "../testNotification";
import { useSelector } from "react-redux";

const ProductWhole = (props) => {
  const user = useSelector((state) => state.auth.user);
  const id = user?.user_id;
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
      {id == 1 && <SseComponent />}
      <ProductList />
    </ProductProvider>
  );
};

export default ProductWhole;
