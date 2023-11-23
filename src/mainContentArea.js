import CategoryWhole from "./frontend/components/category/wholecategory";
import Filterprofits from "./frontend/components/accounting/profit";
import CustomerWhole from "./frontend/components/customer/wholecustomer";
import CashOfToday from "./frontend/components/Order/addcashtoday";
import T2reshaOfToday from "./frontend/components/Order/addt2reshatoday";
import TotalOfToday from "./frontend/components/Order/addtotaloftoday";
import ProductWhole from "./frontend/components/product/wholeProduct";
import { Route, Routes } from "react-router-dom";
import LotsWhole from "./frontend/components/receiveLots/wholeLots";
import VendorWhole from "./frontend/components/Vendor/wholeVendor";
import { AccountingProvider } from "./frontend/contextStore/accountingContext/accountingCOntext";
import OrderWhole from "./frontend/components/Order/wholeOrder";
import { OrderProvider } from "./frontend/contextStore/Order/OrdersContext/orderProvider";
import { OrderItemProvider } from "./frontend/contextStore/Order/OrderItemContext";

const MainContentArea = () => {
  return (
    <>
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
    </>
  );
};

export default MainContentArea;
