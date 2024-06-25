import React, { useContext } from "react";
import { AccountingContext } from "../../contextStore/accountingContext/accountingCOntext";

const Debttable = () => {
  const accountingCtx = useContext(AccountingContext);

  return (
    <React.Fragment>
      <h2>عرض التقريشة</h2>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th className="col-md-2">رقم الطلب </th>
            <th className="col-md-2">الرتبة </th>
            <th className="col-md-2">الاسم</th>
            <th className="col-md-2"> تاريخ الطلب </th>
            <th className="col-md-2">سعر الطلب</th>
            {/* <th className="col-md-2">Actions</th> Added Actions column */}
          </tr>
        </thead>
        <tbody>
          {accountingCtx.notcashorders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.rankname}</td>
              <td>{order.customer_name}</td>
              <td>{order.order_date}</td>
              <td className="d-flex justify-content-between">
                {order.order_price}
              </td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>اجمالي ايرادات التقريشة: {accountingCtx.notcashorderscost}</td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
};
export default Debttable;
