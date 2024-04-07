import React, { useContext } from "react";
import { createPortal } from "react-dom";
import { AccountingContext } from "../../contextStore/accountingContext/accountingCOntext";
import "../../UI/pop-up.css";

const Filterprofits = () => {
  const accountingCtx = useContext(AccountingContext);

  console.log(accountingCtx.cash);

  return (
    <div className="container-lg" dir="rtl">
      <div className="row mt-3">
        <table
          className="table table-striped table-bordered table-hover text-align-right"
          dir="rtl"
        >
          <thead>
            <tr>
              <th className="col-md-2"> الكاش </th>
              <th className="col-md-2">التقريشة</th>
              <th className="col-md-2">مخزون المنتجات</th>
              <th className="col-md-2">الديون </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="col-md-2"> {accountingCtx.cash} </td>
              <td className="col-md-2">{accountingCtx.owed}</td>
              <td className="col-md-2">{accountingCtx.productsInStockValue}</td>
              <td className="col-md-2">{accountingCtx.debt} </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        type="button"
        className="btn btn-primary mt-2 add-btn"
        onClick={() => {
          accountingCtx.reset();
        }}
      >
        lollls
      </button>
      {createPortal(
        <accountingCtx.Msgcomponent />,
        document.getElementById("popup-portal")
      )}
    </div>
  );
};

export default Filterprofits;
