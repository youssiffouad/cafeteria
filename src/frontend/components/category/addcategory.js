import React, { useContext } from "react";
import { CategoriesContext } from "../../contextStore/categoriesContext";
import "../../UI/inputform.css";

import { createPortal } from "react-dom";

const AddCategory = () => {
  const catCtx = useContext(CategoriesContext);

  return (
    <div className="container mb-5 add-container" dir="rtl">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <h2 className="add-heading">اضافة تصنيف جديد</h2>
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
                id="categoryName"
                value={catCtx.name}
                className="form-control input"
                onChange={(event) => catCtx.updatename(event.target.value)}
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
      </div>
    </div>
  );
};

export default AddCategory;
