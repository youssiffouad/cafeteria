import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { CategoriesContext } from "../../contextStore/categoriesContext";
const CategoryList = () => {
  const catCtx = useContext(CategoriesContext);

  return (
    <React.Fragment>
      <h2>view all categories</h2>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th className="col-md-2">Category ID</th>
            <th className="col-md-2">Category Name</th>
          </tr>
        </thead>
        <tbody>
          {catCtx.Categorieslist.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default CategoryList;
