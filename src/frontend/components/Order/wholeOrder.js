import React from "react";
import T2reshaList from "./t2reshaList";

import { OrderProvider } from "../../contextStore/Order/OrdersContext/orderProvider";
import { OrderItemProvider } from "../../contextStore/Order/OrderItemContext";

import { OrderFilterProvider } from "../../contextStore/Order/OrdersContext/filterDateContext";
import CashList from "./cashList";
import SoldProdList from "./soldProdList";

const OrderWhole = () => {
  return (
    // <OrderItemProvider>
    //   <OrderProvider>
    <>
      <T2reshaList />
      <CashList />
      <SoldProdList />
      <OrderFilterProvider>{/* <FilterDateOrders /> */}</OrderFilterProvider>
    </>
    //   </OrderProvider>
    // </OrderItemProvider>
  );
};
export default OrderWhole;
