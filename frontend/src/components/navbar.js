import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import OrderDropdown from "../components/Order/orderdropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { selectAuth } from "../Redux_Store/authSlice";
import { useDispatch } from "react-redux";
import { logout } from "../Redux_Store/authSlice";
import cafeteriaLogo from "./staticImages/logo.png";
import AdvancedDropdown from "./Order/advancedDropDown";
import LotsDropDown from "./receiveLots/lotsDropDown";

const Navbar = () => {
  const [activetab, setactivetab] = useState("");
  const [isSmall, setisSmall] = useState(false);
  const [toggleHovered, settoggleHovered] = useState(false);
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  const HandleSize = () => {
    setisSmall(window.innerWidth < 995);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
    dispatch(logout());
  };

  const NavDynamicClass =
    isSmall && !toggleHovered
      ? "d-none"
      : isSmall && toggleHovered
      ? "verticalnav "
      : "nav nav-pills";
  const ToggleDynamicClass = isSmall ? "me-5" : "d-none";
  useEffect(() => {
    HandleSize();
    window.addEventListener("resize", HandleSize);
    return () => {
      window.removeEventListener("resize", HandleSize);
    };
  }, []);
  const handleTabClick = (clickedtab) => {
    setactivetab(clickedtab);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between align-items-center">
        <img
          src={cafeteriaLogo}
          alt="Logo"
          style={{ height: "50px", width: "50px" }}
        />
        <FontAwesomeIcon
          icon={faBars}
          id="fawenav"
          className={ToggleDynamicClass}
          onMouseEnter={() => settoggleHovered(true)}
          onMouseLeave={() => settoggleHovered(false)}
        />
        <ul
          className={NavDynamicClass}
          onMouseEnter={() => settoggleHovered(true)}
          onMouseLeave={() => settoggleHovered(false)}
        >
          <AdvancedDropdown
            smallscreen={isSmall}
            activetab={activetab}
            handleTabClick={handleTabClick}
          />
          <li className="nav-item">
            <Link
              to="/home/vendors"
              className={`nav-link ${activetab === "vendors" ? "active" : ""}`}
              onClick={() => handleTabClick("vendors")}
            >
              الموردين
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/home/customers"
              className={`nav-link ${
                activetab === "customers" ? "active" : ""
              }`}
              onClick={() => handleTabClick("customers")}
            >
              المستهلكين
            </Link>
          </li>
          <LotsDropDown
            smallscreen={isSmall}
            activetab={activetab}
            handleTabClick={handleTabClick}
          />

          <OrderDropdown
            smallscreen={isSmall}
            activetab={activetab}
            handleTabClick={handleTabClick}
          />

          {auth.isLoggedIn && (
            <li className="nav-item">
              <Link
                to="/home/profits"
                className={`nav-link ${
                  activetab === "profits" ? "active" : ""
                }`}
                onClick={() => handleTabClick("profits")}
              >
                الايرادات
              </Link>
            </li>
          )}

          <li className="nav-item">
            <Link
              className={`nav-link ${
                activetab === "notifications" ? "active" : ""
              }`}
            >
              الاشعارات
            </Link>
          </li>

          <button
            className="btn btn-secondary add-btn"
            onClick={() => handleLogout()}
          >
            خروج
          </button>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};
export default Navbar;
