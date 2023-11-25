import React, { useContext } from "react";
import { CategoriesContext } from "../../contextStore/categoriesContext";
import "../../UI/inputform.css";

import { createPortal } from "react-dom";

const AddCategory = () => {
  const catCtx = useContext(CategoriesContext);
  let errormsg = `ajjdkn`;
  const submissionHandler = (fieldName, fieldValue) => {
    console.log(fieldName);
    console.log(fieldValue);
    const isValid = catCtx.validateField(fieldName, "name", fieldValue);
    console.log(isValid);
    console.log(catCtx.errors);
    errormsg = isValid ? "" : catCtx.errors[fieldName];
    console.log(errormsg);
    if (isValid) {
      // catCtx.updateCategorieslist();
    }
  };

  return (
    <div className="mb-5 add-container" dir="rtl">
      <h5 className="add-heading">اضافة تصنيف جديد</h5>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submissionHandler("categoryName", catCtx.formState.categoryName);
        }}
      >
        <div className="form-group">
          <label htmlFor="categoryName" className="label">
            اسم التصنيف:
          </label>
          <input
            type="text"
            autoFocus
            name="categoryName"
            value={catCtx.formState.categoryName}
            className="form-control input"
            onChange={(event) => catCtx.updatename(event)}
          />
          <p>{errormsg}</p>
        </div>
        <button type="submit" className="btn btn-primary add-btn">
          اضافة
        </button>
        {createPortal(
          <catCtx.Msgcomponent />,
          document.getElementById("popup-portal")
        )}
      </form>
    </div>
  );
};

export default AddCategory;
