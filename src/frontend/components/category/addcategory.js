import React, { useContext } from "react";

import { CategoriesContext } from "../../contextStore/categoriesContext";

const AddCategory = () => {
  const catCtx = useContext(CategoriesContext);

  return (
    <div className="container mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2>Add New Category</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              catCtx.updateCategorieslist();
            }}
          >
            <label>
              Category Name:
              <input
                type="text"
                value={catCtx.name}
                className="form-control"
                onChange={(event) => catCtx.updatename(event.target.value)}
              />
            </label>
            <br />
            <button type="submit" className="btn btn-primary mt-2 ">
              Add Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
