import React, { useEffect, useState } from "react";

import "../../UI/fropdownstyling.css";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotificationsLast30Days } from "../../Redux_Store/NotificationSlice";
const NotificationsDropDown = (props) => {
  const [display, setdisplay] = useState(false);
  const dispatch = useDispatch();
  const recentNotifications = useSelector(
    (state) => state.notification.recentNotifications
  );
  const loadStatus = useSelector((state) => state.notification.status);

  useEffect(() => {
    console.log(loadStatus);
    if (loadStatus !== "succeeded") {
      dispatch(fetchNotificationsLast30Days());
    }
  }, [loadStatus]);

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
          {recentNotifications.map((notification) => (
            <li className="nav-item" key={notification.id} color="red">
              <Link
                to="/home/ordinaryproducts"
                onClick={() => props.handleTabClick("notifications")}
              >
                {notification.name}
                <br />
                اسم المنتج :{JSON.parse(notification.description).name}
                <br />
                سعر البيع :{JSON.parse(notification.description).buying_price}
                <br />
                سعر الشراء :{JSON.parse(notification.description).selling_price}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    </>
  );
};

export default NotificationsDropDown;
