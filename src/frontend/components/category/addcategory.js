import React, { useContext } from "react";
import { CategoriesContext } from "../../contextStore/categoriesContext";
import "../../UI/inputform.css";

const AddCategory = () => {
  const catCtx = useContext(CategoriesContext);

  return (
    <div className="container mb-5 add-container">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <h2 className="add-heading">Add New Category</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              catCtx.updateCategorieslist();
            }}
          >
            <div className="form-group">
              <label htmlFor="categoryName" className="label">
                Category Name:
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
              Add Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
