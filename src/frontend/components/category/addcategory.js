import React, { useContext } from "react";
import { CategoriesContext } from "../../contextStore/categoriesContext";
import "../../UI/inputform.css";

import { createPortal } from "react-dom";

const AddCategory = () => {
  const catCtx = useContext(CategoriesContext);

  return (
    <div className="mb-5 add-container" dir="rtl">
      <h5 className="add-heading">اضافة تصنيف جديد</h5>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          catCtx.updateCategorieslist();
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
