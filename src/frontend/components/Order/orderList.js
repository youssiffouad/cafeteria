import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { OrderContext } from "../../contextStore/Order/OrdersContext/orderProvider";
import { OrderItemProvider } from "../../contextStore/Order/OrderItemContext";

const OrderList = () => {
  const orderCtx = useContext(OrderContext);

  return (
    <OrderItemProvider>
      <h2>View All Orders</h2>
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
          {orderCtx.orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.rankname}</td>
              <td>{order.customer_name}</td>
              <td>{order.order_date}</td>
              <td className="d-flex justify-content-between">
                {order.order_price}
                <FontAwesomeIcon
                  className="me-0"
                  icon={faTrash}
                  onClick={() => orderCtx.deleteOrder(order.id)} // Call handleDeleteOrder when the delete icon is clicked
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

export default OrderList;
