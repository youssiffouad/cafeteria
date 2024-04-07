import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../UI/tableStyle.css";
import { SandwichCtx } from "../../contextStore/SandwichContext";
import { formatNo } from "../../Hooks/formatno";
const SandwichesList = () => {
  const sandwichesCtx = useContext(SandwichCtx);
  console.log("here is the sandwichesList", sandwichesCtx.SandwichesList);

  return (
    <React.Fragment>
      <h2 className="text-center tableTitlefont"> عرض الساندوتشات</h2>
      <table
        className="table table-striped table-bordered table-hover myResponsiveTable"
        dir="rtl"
      >
        <thead>
          <tr>
            <th className="col-md-2 tableHeadfont"> الاسم</th>
            <th className="col-md-2 tableHeadfont"> التكلفة</th>
            <th className="col-md-2 tableHeadfont"> سعر البيع </th>
            <th className="col-md-2 tableHeadfont"> المكونات </th>
          </tr>
        </thead>
        <tbody>
          {sandwichesCtx.SandwichesList.map((sandwich) => (
            <tr key={sandwich.sandwich_id}>
              <td>
                {sandwich.sandwich_name} {sandwich.sandwich_id}
              </td>
              <td>{formatNo(sandwich.sandwich_cost)}</td>
              <td>{sandwich.sandwich_selling_price}</td>

              <td>
                <span>
                  {sandwich.components_with_mapping
                    .split(",")
                    .map((element, index) => (
                      <React.Fragment key={index}>
                        {index > 0 && <br />}
                        {element}
                      </React.Fragment>
                    ))}
                </span>
                <span>
                  {" "}
                  <span className="me-4">
                    {" "}
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() =>
                        sandwichesCtx.deleteSandwich(sandwich.sandwich_id)
                      } // Call handleDeleteOrder when the delete icon is clicked
                      style={{ cursor: "pointer" }}
                    />
                  </span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default SandwichesList;
