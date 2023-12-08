import CategoryWhole from "./category/wholecategory";
import Filterprofits from "./accounting/profit";
import CustomerWhole from "./customer/wholecustomer";
import CashOfToday from "./Order/addcashtoday";
import T2reshaOfToday from "./Order/addt2reshatoday";
import TotalOfToday from "./Order/addtotaloftoday";
import ProductWhole from "./product/wholeProduct";
import { Route, Routes } from "react-router-dom";
import LotsWhole from "./receiveLots/wholeLots";
import VendorWhole from "./Vendor/wholeVendor";
import { AccountingProvider } from "../contextStore/accountingContext/accountingCOntext";
import OrderWhole from "./Order/wholeOrder";
import { OrderProvider } from "../contextStore/Order/OrdersContext/orderProvider";
import { OrderItemProvider } from "../contextStore/Order/OrderItemContext";

const MainContentArea = () => {
  return (
    <Routes>
      <Route path="/vendors" element={<VendorWhole />} />
      <Route path="/products" element={<ProductWhole />} />
      <Route path="/lots" element={<LotsWhole />} />
      <Route path="/categories" element={<CategoryWhole />} />
      <Route path="/customers" element={<CustomerWhole />} />

      <Route
        path="/total"
        element={
          <>
            <OrderItemProvider>
              <OrderProvider>
                <TotalOfToday />
                <OrderWhole />
              </OrderProvider>
            </OrderItemProvider>
          </>
        }
      />
      <Route
        path="/cash"
        element={
          <>
            <OrderItemProvider>
              <OrderProvider>
                <CashOfToday />
                <OrderWhole />
              </OrderProvider>
            </OrderItemProvider>
          </>
        }
      />
      <Route
        path="/t2resha"
        element={
          <>
            <OrderItemProvider>
              <OrderProvider>
                <T2reshaOfToday />
                <OrderWhole />
              </OrderProvider>
            </OrderItemProvider>
          </>
        }
      />

      <Route
        path="/profits"
        element={
          <AccountingProvider>
            <Filterprofits />
          </AccountingProvider>
        }
      />
    </Routes>
  );
};

export default MainContentArea;
