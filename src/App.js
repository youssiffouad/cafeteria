import React, { useEffect, useState } from "react";

import CategoryWhole from "./frontend/components/category/wholecategory";
import Filterprofits from "./frontend/components/accounting/profit";
import CustomerWhole from "./frontend/components/customer/wholecustomer";
import OrderWhole from "./frontend/components/Order/wholeOrder";
import ProductWhole from "./frontend/components/product/wholeProduct";
import RankWhole from "./frontend/components/Rank/wholeRank";
import LotsWhole from "./frontend/components/receiveLots/wholeLots";
import VendorWhole from "./frontend/components/Vendor/wholeVendor";
import "./frontend/UI/navstyle.css";
import { AccountingProvider } from "./frontend/contextStore/accountingContext/accountingCOntext";

const App = (props) => {
  const [activeTab, setActiveTab] = useState("vendors");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };
  useEffect(() => {
    // Get the active tab from local storage
    const activeTabFromLocalStorage = localStorage.getItem("activeTab");
    if (activeTabFromLocalStorage) {
      // Set the active tab to the value from local storage
      setActiveTab(activeTabFromLocalStorage);
    }
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "vendors":
        return <VendorWhole />;
      case "products":
        return <ProductWhole />;
      case "lots":
        return <LotsWhole />;
      case "categories":
        return <CategoryWhole />;
      case "ranks":
        return <RankWhole />;
      case "customers":
        return <CustomerWhole />;
      case "orders":
        return <OrderWhole />;
      case "profits":
        return (
          <AccountingProvider>
            <Filterprofits />
          </AccountingProvider>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <h2 className="text-center m-5">cafeteria-STC</h2>
      <nav>
        <ul className="nav nav-pills  justify-content-around mt-5" dir="rtl">
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === "vendors" ? "active" : ""}`}
              onClick={() => handleTabClick("vendors")}
            >
              الموردين
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === "products" ? "active" : ""}`}
              onClick={() => handleTabClick("products")}
            >
              المنتجات
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === "lots" ? "active" : ""}`}
              onClick={() => handleTabClick("lots")}
            >
              المشتريات
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                activeTab === "categories" ? "active" : ""
              }`}
              onClick={() => handleTabClick("categories")}
            >
              التصنيفات
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === "ranks" ? "active" : ""}`}
              onClick={() => handleTabClick("ranks")}
            >
              الرتب
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                activeTab === "customers" ? "active" : ""
              }`}
              onClick={() => handleTabClick("customers")}
            >
              المستهلكين
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => handleTabClick("orders")}
            >
              المبيعات
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === "profits" ? "active" : ""}`}
              onClick={() => handleTabClick("profits")}
            >
              الايرادات
            </a>
          </li>
        </ul>
      </nav>
      {renderTabContent()}
    </>
  );
};

export default App;
