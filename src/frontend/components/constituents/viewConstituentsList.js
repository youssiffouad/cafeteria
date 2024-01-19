import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { ConstituentContext } from "../../contextStore/constituentContext";
import { formatNo } from "../../Hooks/formatno";
const ConstituentList = () => {
  const constituentCtx = useContext(ConstituentContext);

  return (
    <React.Fragment>
      <h2 className="text-center"> عرض المكونات</h2>
      <table
        className="table table-striped table-bordered table-hover myResponsiveTable"
        dir="rtl"
      >
        <thead>
          <tr>
            <th className="col-md-2"> الاسم</th>
            <th className="col-md-2"> سعر الشراء للوحدة</th>
            <th className="col-md-2"> الكمية </th>
          </tr>
        </thead>
        <tbody>
          {constituentCtx.constituentsList.map((constituent) => (
            <tr key={constituent.id}>
              <td>{constituent.name}</td>
              <td>{constituent.price_per_unit}</td>
              <td>{formatNo(constituent.number_of_units)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default ConstituentList;
