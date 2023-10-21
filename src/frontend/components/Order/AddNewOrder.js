import React, { useContext, useState, useEffect } from "react";
import T2reshaOfToday from "./addt2reshatoday";
import TotalOfToday from "./addtotaloftoday";
import CashOfToday from "./addcashtoday";

import { OrderContext } from "../../contextStore/Order/OrdersContext/orderProvider";

const NewOrderForm = () => {
  const ordersCtx = useContext(OrderContext);
  const [isFormValid, setIsFormValid] = useState(true);
  const [activeorderTab, setactiveorderTab] = useState("totalsold");

  const handleTabClick = (tab) => {
    setactiveorderTab(tab);
    localStorage.setItem("activeorderTab", tab);
  };
  useEffect(() => {
    // Get the active tab from local storage
    const activeorderTabFromLocalStorage =
      localStorage.getItem("activeorderTab");
    if (activeorderTabFromLocalStorage) {
      // Set the active tab to the value from local storage
      setactiveorderTab(activeorderTabFromLocalStorage);
    }
  }, []);

  const renderTabContent = () => {
    switch (activeorderTab) {
      case "totalsold":
        return <TotalOfToday />;
      case "cashsold":
        return <CashOfToday />;
      case "t2reshasold":
        return <T2reshaOfToday />;

      default:
        return null;
    }
  };

  return (
    <>
      <nav>
        <ul className="nav nav-pills  justify-content-around mt-5" dir="rtl">
          <li className="nav-item">
            <a
              className={`nav-link ${
                activeorderTab === "totalsold" ? "active" : ""
              }`}
              onClick={() => handleTabClick("totalsold")}
            >
              اجمالي المبيعات
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                activeorderTab === "cashsold" ? "active" : ""
              }`}
              onClick={() => handleTabClick("cashsold")}
            >
              الايرادات النقدية
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                activeorderTab === "t2reshasold" ? "active" : ""
              }`}
              onClick={() => handleTabClick("t2reshasold")}
            >
              التقريشة
            </a>
          </li>
        </ul>
      </nav>
      {renderTabContent()}
    </>
  );
};

export default NewOrderForm;
