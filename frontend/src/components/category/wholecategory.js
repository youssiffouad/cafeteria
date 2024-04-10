import React, { useContext, useEffect } from "react";
import AddCategory from "./addcategory";
import CategoryList from "./viewCategories";
import { CategoriesProvider } from "../../contextStore/categoriesContext";
import usePopUp from "../../Hooks/use_popup";
import { createPortal } from "react-dom";
import { CategoriesContext } from "../../contextStore/categoriesContext";
const CategoryWhole = () => {
  const catCtx = useContext(CategoriesContext);
  const { ControllerBtn, controlFormJSX, FormContent } =
    usePopUp("اضافة تصنيف جديد");
  const payloadForm = <AddCategory />;
  useEffect(() => {
    controlFormJSX(payloadForm);
  }, []);

  return (
    <CategoriesProvider>
      {createPortal(
        catCtx.Msgcomponent,
        document.getElementById("popup-portal")
      )}
      <div className="d-flex flex-column align-content-center align-items-center mt-3">
        <ControllerBtn />
        <FormContent />
      </div>
      <CategoryList />
    </CategoriesProvider>
  );
};
export default CategoryWhole;
