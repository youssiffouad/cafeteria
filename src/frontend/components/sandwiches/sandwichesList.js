import React, { useContext } from "react";

import { SandwichCtx } from "../../contextStore/SandwichContext";
const SandwichesList = () => {
  const sandwichesCtx = useContext(SandwichCtx);

  return (
    <React.Fragment>
      <h2 className="text-center"> عرض الساندوتشات</h2>
      <table
        className="table table-striped table-bordered table-hover myResponsiveTable"
        dir="rtl"
      >
        <thead>
          <tr>
            <th className="col-md-2"> الاسم</th>
            <th className="col-md-2"> التكلفة</th>
            <th className="col-md-2"> سعر البيع </th>
            <th className="col-md-2"> المكونات </th>
          </tr>
        </thead>
        <tbody>
          {sandwichesCtx.SandwichesList.map((sandwich) => (
            <tr key={sandwich.sandwich_id}>
              <td>
                {sandwich.sandwich_name} {sandwich.sandwich_id}
              </td>
              <td>{sandwich.sandwich_selling_price}</td>
              <td>{sandwich.sandwich_cost}</td>
              <td>
                {sandwich.component_names}
                {sandwich.mapping_values}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default SandwichesList;
