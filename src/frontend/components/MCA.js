// mainContentConfig.js
import React from "react";
import CategoryWhole from "./category/wholecategory";

import CustomerWhole from "./customer/wholecustomer";
import CashOfToday from "./Order/addcashtoday";
import T2reshaOfToday from "./Order/addt2reshatoday";
import TotalOfToday from "./Order/addtotaloftoday";
import ProductWhole from "./product/wholeProduct";
import LotsWhole from "./receiveLots/wholeLots";
import VendorWhole from "./Vendor/wholeVendor";
import Filterprofits from "./accounting/profit";
import { AccountingProvider } from "../contextStore/accountingContext/accountingCOntext";
import { OrderItemProvider } from "../contextStore/Order/OrderItemContext";
import { OrderProvider } from "../contextStore/Order/OrdersContext/orderProvider";

import OrderWhole from "./Order/wholeOrder";

const TotalOfTodayWithProviders = () => (
  <>
    <OrderItemProvider>
      <OrderProvider>
        <TotalOfToday />
        <OrderWhole />
      </OrderProvider>
    </OrderItemProvider>
  </>
);

const CashOfTodayWithProviders = () => (
  <>
    <OrderItemProvider>
      <OrderProvider>
        <CashOfToday />
        <OrderWhole />
      </OrderProvider>
    </OrderItemProvider>
  </>
);

const T2reshaOfTodayWithProviders = () => (
  <>
    <OrderItemProvider>
      <OrderProvider>
        <T2reshaOfToday />
        <OrderWhole />
      </OrderProvider>
    </OrderItemProvider>
  </>
);

const mainContentArea = [
  { path: "vendors", element: <VendorWhole /> },
  { path: "products", element: <ProductWhole /> },
  { path: "lots", element: <LotsWhole /> },
  { path: "categories", element: <CategoryWhole /> },
  { path: "customers", element: <CustomerWhole /> },
  { path: "total", element: <TotalOfTodayWithProviders /> },
  { path: "cash", element: <CashOfTodayWithProviders /> },
  { path: "t2resha", element: <T2reshaOfTodayWithProviders /> },
  {
    path: "profits",
    element: (
      <AccountingProvider>
        <Filterprofits />
      </AccountingProvider>
    ),
  },
];

export default mainContentArea;
