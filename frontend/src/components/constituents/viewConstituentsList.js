import React, { useContext } from "react";
import EditPriceOfConstituent from "./editPriceOfConstituent";
import "bootstrap/dist/css/bootstrap.min.css";
import { createPortal } from "react-dom";
import { ConstituentContext } from "../../contextStore/constituentContext";
import { formatNo } from "../../Hooks/formatno";
const ConstituentList = () => {
  const constituentCtx = useContext(ConstituentContext);

  return (
    <React.Fragment>
      <h2 className="text-center tableTitlefont"> عرض المكونات</h2>
      <table
        className="table table-striped table-bordered table-hover myResponsiveTable"
        dir="rtl"
      >
        <thead>
          <tr>
            <th className="col-md-2 tableHeadfont"> الاسم</th>
            <th className="col-md-2 tableHeadfont"> سعر الشراء للوحدة</th>
            <th className="col-md-2 tableHeadfont"> الكمية </th>
          </tr>
        </thead>
        <tbody>
          {constituentCtx.constituentsList.map((constituent) => (
            <tr key={constituent.id}>
              <td>{constituent.name}</td>
              <td>
                <EditPriceOfConstituent
                  price={constituent.price_per_unit}
                  id={constituent.id}
                  fetchConstituents={constituentCtx.viewConstituents}
                />
              </td>
              <td>{formatNo(constituent.number_of_units)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {createPortal(
        <constituentCtx.Msgcomponent />,
        document.getElementById("popup-portal")
      )}
    </React.Fragment>
  );
};

export default ConstituentList;
