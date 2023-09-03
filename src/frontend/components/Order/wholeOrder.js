import React from "react";
import OrderList from "./orderList";
import NewOrderForm from "./AddNewOrder";
import { OrderProvider } from "../../contextStore/Order/OrdersContext/orderProvider";
import { OrderItemProvider } from "../../contextStore/Order/OrderItemContext";
import FilterDateOrders from "./filterDateOrder";
import { OrderFilterProvider } from "../../contextStore/Order/OrdersContext/filterDateContext";
const OrderWhole = () => {
  return (
    <OrderItemProvider>
      <OrderProvider>
        <NewOrderForm />
        <OrderList />
        <OrderFilterProvider>
          <FilterDateOrders />
        </OrderFilterProvider>
      </OrderProvider>
    </OrderItemProvider>
  );
};
export default OrderWhole;
