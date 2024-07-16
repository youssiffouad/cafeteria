import React, { useState } from "react";

import "../../UI/fropdownstyling.css";

import { Link } from "react-router-dom";
const AdvancedDropdown = (props) => {
  const [display, setdisplay] = useState(false);

  const dropdownDynamicClass = props.smallscreen
    ? "verticalnav vertical-nav-small "
    : "custom-list position-absolute";
  return (
    <>
      <li className="nav-item position-relative">
        <Link
          className={`nav-link ${
            props.activetab === "advanced" ? "active" : ""
          }`}
          onMouseOver={() => {
            setdisplay(true);
          }}
          onMouseLeave={() => setdisplay(false)}
        >
          اعدادات متقدمة
        </Link>
        <ul
          className={`${dropdownDynamicClass} ${!display ? "d-none" : ""}`}
          onMouseOver={() => {
            setdisplay(true);
          }}
          onMouseLeave={() => setdisplay(false)}
        >
          <li className="nav-item">
            <Link
              to="/home/categories"
              onClick={() => props.handleTabClick("advanced")}
            >
              التصنيفات
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/home/sandwiches"
              onClick={() => props.handleTabClick("advanced")}
            >
              الساندوتشات
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/home/ordinaryproducts"
              onClick={() => props.handleTabClick("advanced")}
            >
               المنتجات العادية
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/home/compositeproducts"
              onClick={() => props.handleTabClick("advanced")}
            >
               المنتجات المركبة
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/home/constituents"
              onClick={() => props.handleTabClick("advanced")}
            >
              المكونات
            </Link>
          </li>
        </ul>
      </li>
    </>
  );
};

export default AdvancedDropdown;
