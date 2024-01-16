import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { OrderContext } from "../../contextStore/Order/OrdersContext/orderProvider";

const SoldProdList = () => {
  const orderCtx = useContext(OrderContext);

  return (
    <>
      <h2 className="text-center">عرض المبيعات </h2>
      <table
        className="table table-striped table-bordered table-hover myResponsiveTable"
        dir="rtl"
      >
        <thead>
          <tr>
            <th className="col-md-2">الرقم المسلسل</th>
            <th className="col-md-2"> المنتج</th>
            <th className="col-md-2"> الكمية</th>
            <th className="col-md-2">السعر للقطعة</th>
            <th className="col-md-2">السعر الكلي</th>
            <th className="col-md-2">تاريخ البيع</th>

            {/* <th className="col-md-2">Actions</th> Added Actions column */}
          </tr>
        </thead>
        <tbody>
          {orderCtx.orderswithItem
            .filter((order) => order.payment_method === "soldprod")
            .map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.item_name}</td>
                <td>{order.order_quantity}</td>
                <td>{order.item_selling_price}</td>
                <td>{order.order_price}</td>
                <td className="d-flex justify-content-between">
                  {order.order_date}
                  <FontAwesomeIcon
                    className="me-0"
                    icon={faTrash}
                    onClick={() =>
                      orderCtx.deleteOrder(order.id, order.order_type)
                    } // Call handleDeleteOrder when the delete icon is clicked
                    style={{ cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default SoldProdList;
