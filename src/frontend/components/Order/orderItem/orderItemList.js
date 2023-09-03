import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { OrderItemContext } from "../../../contextStore/Order/OrderItemContext";
const OrderItemList = () => {
  const orderitemCtx = useContext(OrderItemContext);

  // // Create a new variable to store the total order cost
  // const totalOrderCost = orderitemCtx.orderitems
  //   .map((orderItem) => orderItem.quantity * orderItem.price)
  //   .reduce((a, b) => a + b, 0);

  return (
    <React.Fragment>
      <h2>view all OrderItems</h2>
      <h3>Order Items</h3>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Category</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price per Item</th>
          </tr>
        </thead>
        <tbody>
          {orderitemCtx.orderitems.map((orderItem, index) => (
            <tr key={index}>
              <td>{orderItem.cat.name}</td>
              <td>{orderItem.prod.name}</td>
              <td>{orderItem.quantity}</td>
              <td className="d-flex justify-content-between">
                {orderItem.prod.price}
                <FontAwesomeIcon
                  className="me-0"
                  icon={faTrash}
                  onClick={() => orderitemCtx.deleteItem(index)} // Call handleDeleteOrder when the delete icon is clicked
                  style={{ cursor: "pointer" }}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>Total Order Cost: {orderitemCtx.totalOrderCost}</td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default OrderItemList;
