import React from "react";
import T2reshaOfToday from "./addt2reshatoday";
import TotalOfToday from "./addtotaloftoday";
import CashOfToday from "./addcashtoday";
import "../../UI/fropdownstyling.css";
import { createPortal } from "react-dom";

import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

const OrderDropdown = () => {
  return (
    <>
      <Router>
        <div>
          <ul className="custom-list ">
            <li>
              <Link to="/total"> اجمالي المبيعات</Link>
            </li>
            <li>
              <Link to="/cash">الايرادات النقدية</Link>
            </li>
            <li>
              <Link to="/t2resha">التقريشة</Link>
            </li>
          </ul>
          <Routes>
            <Route
              path="/total"
              element={createPortal(
                <TotalOfToday />,
                document.getElementById("body-portal")
              )}
            />

            <Route
              path="/cash"
              element={createPortal(
                <CashOfToday />,
                document.getElementById("body-portal")
              )}
            />

            <Route
              path="/t2resha"
              element={createPortal(
                <T2reshaOfToday />,
                document.getElementById("body-portal")
              )}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default OrderDropdown;
