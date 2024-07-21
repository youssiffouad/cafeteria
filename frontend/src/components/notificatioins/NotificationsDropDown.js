import React, { useEffect, useState } from "react";

import "../../UI/fropdownstyling.css";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
const NotificationsDropDown = (props) => {
  const [display, setdisplay] = useState(false);
 const dispatch=useDispatch()
 const 
useEffect(()=>{
    
},[])

  const dropdownDynamicClass = props.smallscreen
    ? "verticalnav vertical-nav-small "
    : "custom-list position-absolute";
  return (
    <>
      <li className="nav-item position-relative">
        <Link
          className={`nav-link ${
            props.activetab === "notifications" ? "active" : ""
          }`}
          onMouseOver={() => {
            setdisplay(true);
          }}
          onMouseLeave={() => setdisplay(false)}
        >
          الاشعارات
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
              to="/home/componentlot"
              onClick={() => props.handleTabClick("notifications")}
            >
              شراء مكون
            </Link>
          </li>
        </ul>
      </li>
    </>
  );
};

export default NotificationsDropDown;
