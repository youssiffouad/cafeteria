import React, { useEffect } from "react";
import AddCategory from "./addcategory";
import CategoryList from "./viewCategories";
import { CategoriesProvider } from "../../contextStore/categoriesContext";
import usePopUp from "../../Hooks/use_popup";
const CategoryWhole = () => {
  const { ControllerBtn, controlFormJSX, FormContent } =
    usePopUp("اضافة تصنيف جديد");
  const payloadForm = <AddCategory />;
  useEffect(() => {
    controlFormJSX(payloadForm);
  }, []);
  return (
    <CategoriesProvider>
      <div className="d-flex flex-column align-content-center align-items-center mt-3">
        <ControllerBtn />
        <FormContent />
      </div>
      <CategoryList />
    </CategoriesProvider>
  );
};
export default CategoryWhole;
