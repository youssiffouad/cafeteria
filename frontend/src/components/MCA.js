// mainContentConfig.js
import React, { useEffect } from "react";
import CategoryWhole from "./category/wholecategory";

import CustomerWhole from "./customer/wholecustomer";
import CashOfToday from "./Order/addcashtoday";
import T2reshaOfToday from "./Order/addt2reshatoday";
import TotalOfToday from "./Order/addtotaloftoday";

import VendorWhole from "./Vendor/wholeVendor";
import Filterprofits from "./accounting/profit";
import { AccountingProvider } from "../contextStore/accountingContext/accountingCOntext";
import { OrderItemProvider } from "../contextStore/Order/OrderItemContext";
import { OrderProvider } from "../contextStore/Order/OrdersContext/orderProvider";

import OrderWhole from "./Order/wholeOrder";
import ProdChoice from "./product/prodChoice";
import LotChoice from "./receiveLots/lotchoice";

import WholeSandwich from "./sandwiches/wholeSandwich";
import { SandwichProvider } from "../contextStore/SandwichContext";
import usePopUp from "../Hooks/use_popup";

const TotalOfTodayWithProviders = () => {
  const { ControllerBtn, controlFormJSX, FormContent } = usePopUp(
    "اضافة مبيعات منتجات"
  );
  const payloadForm = <TotalOfToday />;
  useEffect(() => {
    controlFormJSX(payloadForm);
  }, []);
  return (
    <>
      <OrderItemProvider>
        <SandwichProvider>
          <OrderProvider>
            <div className="d-flex flex-column align-content-center align-items-center mt-3">
              <ControllerBtn />
              <FormContent />
            </div>
            <OrderWhole />
          </OrderProvider>
        </SandwichProvider>
      </OrderItemProvider>
    </>
  );
};

const CashOfTodayWithProviders = () => {
  const { ControllerBtn, controlFormJSX, FormContent } =
    usePopUp("اضافة ايرادات كاش ");
  const payloadForm = <CashOfToday />;
  useEffect(() => {
    controlFormJSX(payloadForm);
  }, []);
  return (
    <>
      <OrderItemProvider>
        <OrderProvider>
          <div className="d-flex flex-column align-content-center align-items-center mt-3">
            <ControllerBtn />
            <FormContent />
          </div>
          <OrderWhole />
        </OrderProvider>
      </OrderItemProvider>
    </>
  );
};

const T2reshaOfTodayWithProviders = () => {
  const { ControllerBtn, controlFormJSX, FormContent } =
    usePopUp("اضافة  تقريشة ");
  const payloadForm = <T2reshaOfToday />;
  useEffect(() => {
    controlFormJSX(payloadForm);
  }, []);
  return (
    <>
      <OrderItemProvider>
        <OrderProvider>
          <div className="d-flex flex-column align-content-center align-items-center mt-3">
            <ControllerBtn />
            <FormContent />
          </div>
          <OrderWhole />
        </OrderProvider>
      </OrderItemProvider>
    </>
  );
};

const mainContentArea = [
  { path: "vendors", element: <VendorWhole /> },
  { path: "products", element: <ProdChoice /> }, //either display the addProd or addConstituent
  { path: "lots", element: <LotChoice /> }, //either display the addlot or addConstituentLot
  { path: "categories", element: <CategoryWhole /> },
  { path: "customers", element: <CustomerWhole /> },
  { path: "total", element: <TotalOfTodayWithProviders /> },
  { path: "cash", element: <CashOfTodayWithProviders /> },
  { path: "sandwiches", element: <WholeSandwich /> },
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
