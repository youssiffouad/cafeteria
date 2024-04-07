import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { OrderContext } from "../../contextStore/Order/OrdersContext/orderProvider";
import { OrderItemProvider } from "../../contextStore/Order/OrderItemContext";

const CashList = () => {
  const orderCtx = useContext(OrderContext);

  return (
    <OrderItemProvider>
      <h2 className="text-center tableTitlefont">عرض الكاش </h2>
      <table
        className="table table-striped table-bordered table-hover myResponsiveTable "
        dir="rtl"
      >
        <thead>
          <tr>
            <th className="col-md-2 tableHeadfont">الرقم المسلسل</th>

            <th className="col-md-2 tableHeadfont">تاريخ الوارد</th>
            <th className="col-md-2 tableHeadfont">السعر</th>
          </tr>
        </thead>
        <tbody>
          {orderCtx.orders
            .filter((order) => order.payment_method === "cash")
            .map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>

                <td>{order.order_date}</td>
                <td className="d-flex justify-content-between">
                  {order.order_price}
                  <FontAwesomeIcon
                    className="me-0"
                    icon={faTrash}
                    onClick={() => orderCtx.deleteOrder(order.id, "Product")} // Call handleDeleteOrder when the delete icon is clicked
                    style={{ cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </OrderItemProvider>
  );
};

export default CashList;
