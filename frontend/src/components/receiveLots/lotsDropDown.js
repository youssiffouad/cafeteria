import React, { useState } from "react";

import "../../UI/fropdownstyling.css";

import { Link } from "react-router-dom";
const LotsDropDown = (props) => {
  const [display, setdisplay] = useState(false);

  const dropdownDynamicClass = props.smallscreen
    ? "verticalnav vertical-nav-small "
    : "custom-list position-absolute";
  return (
    <>
      <li className="nav-item position-relative">
        <Link
          className={`nav-link ${props.activetab === "lots" ? "active" : ""}`}
          onMouseOver={() => {
            setdisplay(true);
          }}
          onMouseLeave={() => setdisplay(false)}
        >
          المشتريات
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
              to="/home/prodlot"
              onClick={() => props.handleTabClick("lots")}
            >
              شراء منتج
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/home/componentlot"
              onClick={() => props.handleTabClick("lots")}
            >
              شراء مكون
            </Link>
          </li>
        </ul>
      </li>
    </>
  );
};

export default LotsDropDown;
