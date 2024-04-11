import React, { useContext, useEffect } from "react";
import { CategoriesContext } from "../../contextStore/categoriesContext";
import "../../UI/inputform.css";

const AddCategory = () => {
  const catCtx = useContext(CategoriesContext);
  useEffect(() => {
    console.log(catCtx.errors);
    console.log(catCtx.getErrorMsg("categoryName"));
  }, [catCtx.errors]);

  const submissionHandler = (fieldValue) => {
    if (catCtx.validateField("categoryName", "name", fieldValue))
      catCtx.updateCategorieslist();
    console.log(catCtx.errors);
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
        <label htmlFor="categoryName" className="label">
          اسم التصنيف:
        </label>
        <input
          type="text"
          name="categoryName"
          value={catCtx.formState.categoryName.value}
          className={`form-control input inputValue ${
            !catCtx.formState.categoryName.valid && "is-invalid"
          }`}
          onChange={(event) => {
            catCtx.handleInputChange(event);
            catCtx.validateField(event.target.name, "name", event.target.value);
          }}
        />
        {!catCtx.formState.categoryName.valid && (
          <p className="text-danger">{catCtx.getErrorMsg("categoryName")}</p>
        )}

        <br />
        <button type="submit" className="btn btn-primary add-btn">
          اضافة
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
