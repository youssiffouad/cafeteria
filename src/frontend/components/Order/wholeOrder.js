import React from "react";
import T2reshaList from "./t2reshaList";
import OrderDropdown from "./orderdropdown";
import { OrderProvider } from "../../contextStore/Order/OrdersContext/orderProvider";
import { OrderItemProvider } from "../../contextStore/Order/OrderItemContext";

import { OrderFilterProvider } from "../../contextStore/Order/OrdersContext/filterDateContext";
import CashList from "./cashList";
import SoldProdList from "./soldProdList";
import { createPortal } from "react-dom";
const OrderWhole = () => {
  return (
    <OrderItemProvider>
      <OrderProvider>
        {createPortal(
          <OrderDropdown />,
          document.getElementById("dropdown-portal")
        )}
        <T2reshaList />
        <CashList />
        <SoldProdList />
        <OrderFilterProvider>{/* <FilterDateOrders /> */}</OrderFilterProvider>
      </OrderProvider>
    </OrderItemProvider>
  );
};
export default OrderWhole;
