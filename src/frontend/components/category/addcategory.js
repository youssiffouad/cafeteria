import React, { useContext, useEffect } from "react";
import { CategoriesContext } from "../../contextStore/categoriesContext";
import "../../UI/inputform.css";

import { createPortal } from "react-dom";

const AddCategory = () => {
  const catCtx = useContext(CategoriesContext);
  useEffect(() => {
    console.log(catCtx.errors);
    console.log(catCtx.getErrorMsg("categoryName"));
  }, [catCtx.errors]);

  const submissionHandler = (fieldValue) => {
    catCtx.validateField("categoryName", "name", fieldValue);
    console.log(catCtx.errors);

    // catCtx.updateCategorieslist();
  };

  return (
    <div className="mb-5 add-container" dir="rtl">
      <h5 className="add-heading">اضافة تصنيف جديد</h5>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          submissionHandler(catCtx.formState.categoryName.value);
        }}
      >
        <div className="form-group">
          <label htmlFor="categoryName" className="label">
            اسم التصنيف:
          </label>
          <input
            type="text"
            name="categoryName"
            value={catCtx.formState.categoryName.value}
            className={`form-control input ${
              !catCtx.formState.categoryName.valid && "is-invalid"
            }`}
            onChange={(event) => {
              catCtx.updatename(event);
              catCtx.validateField(
                event.target.name,
                "name",
                event.target.value
              );
            }}
          />
          {!catCtx.formState.categoryName.valid && (
            <p className="text-danger">{catCtx.getErrorMsg("categoryName")}</p>
          )}
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
