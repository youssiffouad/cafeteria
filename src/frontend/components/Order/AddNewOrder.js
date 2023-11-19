import React, { useState, useEffect } from "react";
import T2reshaOfToday from "./addt2reshatoday";
import TotalOfToday from "./addtotaloftoday";
import CashOfToday from "./addcashtoday";
import "../../UI/fropdownstyling.css";

const NewOrderForm = () => {
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
      <ul className="custom-list " dir="rtl">
        <li>
          <a
            className={` ${activeorderTab === "totalsold" ? "active" : ""}`}
            onClick={() => handleTabClick("totalsold")}
          >
            اجمالي المبيعات
          </a>
        </li>
        <li>
          <a
            className={` ${activeorderTab === "cashsold" ? "active" : ""}`}
            onClick={() => handleTabClick("cashsold")}
          >
            الايرادات النقدية
          </a>
        </li>
        <li>
          <a
            className={` ${activeorderTab === "t2reshasold" ? "active" : ""}`}
            onClick={() => handleTabClick("t2reshasold")}
          >
            التقريشة
          </a>
        </li>
      </ul>

      {renderTabContent()}
      <div id="orders-portal"></div>
    </>
  );
};

export default NewOrderForm;
