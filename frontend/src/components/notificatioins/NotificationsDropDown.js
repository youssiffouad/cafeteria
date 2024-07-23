import React, { useEffect, useState } from "react";

import "../../UI/fropdownstyling.css";
import { serverSocket } from "../../backendSocket";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addRecentNotification,
  fetchNotificationsLast30Days,
  markNotificationSeen,
} from "../../Redux_Store/NotificationSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
const NotificationsDropDown = (props) => {
  const [display, setdisplay] = useState(false);
  const dispatch = useDispatch();
  const recentNotifications = useSelector(
    (state) => state.notification.recentNotifications
  );
  const loadStatus = useSelector((state) => state.notification.status);
  const notread = useSelector((state) => state.notification.notread);
  const id = useSelector((state) => state.auth?.user?.user_id);

  useEffect(() => {
    console.log(loadStatus);
    if (loadStatus !== "succeeded") {
      dispatch(fetchNotificationsLast30Days());
    }
  }, [loadStatus]);

  // useEffect(() => {
  //   console.log("i am in the eventttttttttttttttttttttt");
  //   const eventSourceUrl = `${serverSocket}/notifications/stream?clientId=${id}`; // replace with actual URL and client ID
  //   const eventSource = new EventSource(eventSourceUrl);

  //   eventSource.onmessage = (event) => {
  //     const newMessage = JSON.parse(event.data);
  //     console.log("a new message arrived", newMessage);
  //     dispatch(addRecentNotification(newMessage));
  //   };

  //   eventSource.onerror = (error) => {
  //     console.error("SSE error:", error);
  //   };

  //   return () => {
  //     eventSource.close();
  //   };
  // }, []);

  const dropdownDynamicClass = props.smallscreen
    ? "verticalnav vertical-nav-small "
    : "custom-list position-absolute";
  return (
    <>
      <li className="nav-item position-relative">
        <Link
          className={`nav-link ${
            props.activetab === "notifications" ? "active" : ""
          } ${notread ? "notread" : ""}`}
          onMouseOver={() => {
            setdisplay(true);
          }}
          onMouseLeave={() => setdisplay(false)}
        >
          الاشعارات{" "}
          <FontAwesomeIcon
            icon={faBell}
            className={` ${notread ? "notread" : ""}`}
          />
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
                className={`${notification.seen ? "" : "notread"}`}
                onClick={() => {
                  props.handleTabClick("notifications");
                  dispatch(markNotificationSeen(notification.id));
                }}
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
