import React, { useContext, useState, useEffect } from "react";
import { AccountingContext } from "../../contextStore/accountingContext/accountingCOntext";
import CashTable from "./cashtable";
import Debttable from "./debttable";
const Filterprofits = () => {
  const accountingCtx = useContext(AccountingContext);

  const [activeAccountingsTab, setActiveAccountingsTab] = useState("cash");
  const handleTabClick = (tab) => {
    setActiveAccountingsTab(tab);
    localStorage.setItem("activeAccountingsTab", tab);
  };

  useEffect(() => {
    // Get the active tab from local storage
    const activeAccountingsTabFromLocalStorage = localStorage.getItem(
      "activeAccountingsTab"
    );
    if (activeAccountingsTabFromLocalStorage) {
      // Set the active tab to the value from local storage
      setActiveAccountingsTab(activeAccountingsTabFromLocalStorage);
    }
  }, []);

  const renderTabContent = () => {
    switch (activeAccountingsTab) {
      case "cash":
        return <CashTable />;
      case "debt":
        return <Debttable />;

      default:
        return null;
    }
  };
  return (
    <div className="container-lg" dir="rtl">
      <div className="row mt-3">
        <div className="col-md-10">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <p className="mb-0"> اختر الايرادات في فترة معينة </p>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                accountingCtx.handleFilterDate();
              }}
              className="d-flex"
            >
              <div className="col-md-6">
                <label htmlFor="start" className="form-label">
                  بداية الفترة
                </label>
                <input
                  className="form-control"
                  type="date"
                  id="start"
                  value={accountingCtx.startdate}
                  onChange={(event) =>
                    accountingCtx.updatestartdate(event.target.value)
                  }
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="end" className="form-label">
                  نهاية الفترة
                </label>
                <input
                  className="form-control"
                  type="date"
                  id="end"
                  value={accountingCtx.enddate}
                  onChange={(event) =>
                    accountingCtx.updateenddate(event.target.value)
                  }
                />
              </div>
              <button type="submit" className="btn btn-primary ms-3">
                تطبيق
              </button>
            </form>
          </div>

          <nav>
            <ul className="nav nav-pills  justify-content-around mt-5">
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeAccountingsTab === "cash" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("cash")}
                >
                  الايرادات النقدية
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    activeAccountingsTab === "debt" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("debt")}
                >
                  التقريشة
                </a>
              </li>
            </ul>
          </nav>
          {renderTabContent()}

          <h1>
            اجمالي الارباح :{" "}
            {accountingCtx.allorderscost - accountingCtx.lotscost}
          </h1>
          <h1>اجمالي العائد: {accountingCtx.allorderscost}</h1>
        </div>
      </div>
    </div>
  );
};

export default Filterprofits;
