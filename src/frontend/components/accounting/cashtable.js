import React, { useContext } from "react";
import { AccountingContext } from "../../contextStore/accountingContext/accountingCOntext";

const CashTable = () => {
  const accountingCtx = useContext(AccountingContext);

  return (
    <React.Fragment>
      <h2>View cash orders</h2>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th className="col-md-2">Order ID</th>
            <th className="col-md-2">Customer rank</th>
            <th className="col-md-2">Customer name</th>
            <th className="col-md-2">Order Date</th>
            <th className="col-md-2">Order Price</th>
            {/* <th className="col-md-2">Actions</th> Added Actions column */}
          </tr>
        </thead>
        <tbody>
          {accountingCtx.cashorders.map((order) => (
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
            <td>Total cash orders Cost: {accountingCtx.cashorderscost}</td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
};
export default CashTable;
