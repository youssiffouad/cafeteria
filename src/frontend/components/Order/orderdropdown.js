import React, { useState } from "react";

import "../../UI/fropdownstyling.css";

import { Link } from "react-router-dom";
const OrderDropdown = (props) => {
  const [display, setdisplay] = useState(false);

  const dropdownDynamicClass = props.smallscreen
    ? "verticalnav vertical-nav-small "
    : "custom-list position-absolute";
  return (
    <>
      <li className="nav-item position-relative">
        <Link
          className={`nav-link ${props.activetab === "orders" ? "active" : ""}`}
          onMouseOver={() => {
            setdisplay(true);
          }}
          onMouseLeave={() => setdisplay(false)}
        >
          المبيعات
        </Link>
        <ul
          className={`${dropdownDynamicClass} ${!display ? "d-none" : ""}`}
          onMouseOver={() => {
            setdisplay(true);
          }}
          onMouseLeave={() => setdisplay(false)}
        >
          <li>
            <Link to="/total" onClick={() => props.handleTabClick("orders")}>
              اجمالي المبيعات
            </Link>
          </li>

          <li>
            <Link to="/cash" onClick={() => props.handleTabClick("orders")}>
              الايرادات النقدية
            </Link>
          </li>
          <li>
            <Link to="/t2resha" onClick={() => props.handleTabClick("orders")}>
              التقريشة
            </Link>
          </li>
        </ul>
      </li>
    </>
  );
};

export default OrderDropdown;
