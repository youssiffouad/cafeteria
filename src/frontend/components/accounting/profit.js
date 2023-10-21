import React, { useContext } from "react";
import { AccountingContext } from "../../contextStore/accountingContext/accountingCOntext";

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
    </div>
  );
};

export default Filterprofits;
