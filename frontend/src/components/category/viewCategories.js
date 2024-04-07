import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

import { CategoriesContext } from "../../contextStore/categoriesContext";
const CategoryList = () => {
  const catCtx = useContext(CategoriesContext);

  return (
    <React.Fragment>
      <h2 className="text-center tableTitlefont">عرض التصنيفات</h2>
      <table
        className="table table-striped table-bordered table-hover myResponsiveTable"
        dir="rtl"
      >
        <thead>
          <tr>
            <th className="col-md-2 tableHeadfont">الرقم المسلسل</th>
            <th className="col-md-2 tableHeadfont">اسم التصنيف</th>
          </tr>
        </thead>
        <tbody>
          {catCtx.Categorieslist.map((cat) => {
            if (cat.name !== "sandwiches") {
              return (
                <tr key={cat.id}>
                  <td>{cat.id}</td>
                  <td className="d-flex justify-content-between">
                    {cat.name}{" "}
                    <FontAwesomeIcon
                      className="me-0"
                      icon={faTrash}
                      onClick={() => catCtx.deleteCategory(cat.id)} // Call handleDeleteOrder when the delete icon is clicked
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default CategoryList;
