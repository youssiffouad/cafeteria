// OrderProvider.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchOrders, addOrder, deleteOrder } from "./ordersApICalls";
import { OrderItemContext } from "../OrderItemContext";

export const OrderContext = createContext({
  orders: [],
  updateOrders: () => {},
  rankid: "",
  updaterankid: () => {},
  customerId: "",
  updateCustomerId: (c) => {},
  orderDate: "",
  updateOrderDate: (d) => {},
  deleteOrder: (o) => {},
});

export const OrderProvider = (props) => {
  const [orders, setOrders] = useState([]);
  const [rankid, setrankid] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [orderDate, setOrderDate] = useState("");

  const orderItemCtx = useContext(OrderItemContext);

  useEffect(() => {
    fetchOrders()
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        // Handle error
      });
  }, []);

  const updateOrders = () => {
    const orderData = {
      customer_id: customerId,
      order_date: orderDate,
      totalOrderCost: orderItemCtx.totalOrderCost,
      orderItems: orderItemCtx.orderitems,
    };

    addOrder(orderData)
      .then((data) => {
        // Perform any necessary actions after adding the order

        // Fetch orders again to update the list
        fetchOrders()
          .then((data) => {
            setOrders(data);
          })
          .catch((error) => {
            // Handle error
          });
      })
      .catch((error) => {
        // Handle error
      });

    // Reset form fields
    setCustomerId("");
    setrankid("");
    setOrderDate("");
    orderItemCtx.resetOrderItems();
  };

  const handleDeleteOrder = (orderId) => {
    deleteOrder(orderId)
      .then((data) => {
        // Perform any necessary actions after deleting the order

        // Fetch orders again to update the list
        fetchOrders()
          .then((data) => {
            setOrders(data);
          })
          .catch((error) => {
            // Handle error
          });
      })
      .catch((error) => {
        // Handle error
      });
  };

  const updateCustomerId = (c) => {
    setCustomerId(c);
  };

  const updateOrderDate = (d) => {
    setOrderDate(d);
  };

  const updaterankid = (r) => {
    setrankid(r);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        updateOrders,
        fetchOrders,
        rankid,
        updaterankid,
        customerId,
        updateCustomerId,
        orderDate,
        updateOrderDate,
        deleteOrder: handleDeleteOrder,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};
