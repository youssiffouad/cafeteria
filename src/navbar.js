import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import OrderDropdown from "./frontend/components/Order/orderdropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [activetab, setactivetab] = useState("");
  const [isSmall, setisSmall] = useState(false);
  const [toggleHovered, settoggleHovered] = useState(false);
  const HandleSize = () => {
    setisSmall(window.innerWidth < 995);
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
    <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between align-items-center">
      <h2 className="text-center ms-5">cafeteria-STC</h2>
      <FontAwesomeIcon
        icon={faBars}
        id="fawenav"
        className={ToggleDynamicClass}
        onMouseEnter={() => settoggleHovered(true)}
        onMouseLeave={() => settoggleHovered(false)}
      />
      <ul
        className={NavDynamicClass}
        dir="rtl"
        onMouseEnter={() => settoggleHovered(true)}
        onMouseLeave={() => settoggleHovered(false)}
      >
        <li className="nav-item">
          <Link
            to="/vendors"
            className={`nav-link ${activetab === "vendors" ? "active" : ""}`}
            onClick={() => handleTabClick("vendors")}
          >
            الموردين
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/products"
            className={`nav-link ${activetab === "products" ? "active" : ""}`}
            onClick={() => handleTabClick("products")}
          >
            المنتجات
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/lots"
            className={`nav-link ${activetab === "lots" ? "active" : ""}`}
            onClick={() => handleTabClick("lots")}
          >
            المشتريات
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/categories"
            className={`nav-link ${activetab === "categories" ? "active" : ""}`}
            onClick={() => handleTabClick("categories")}
          >
            التصنيفات
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/customers"
            className={`nav-link ${activetab === "customers" ? "active" : ""}`}
            onClick={() => handleTabClick("customers")}
          >
            المستهلكين
          </Link>
        </li>

        <OrderDropdown
          smallscreen={isSmall}
          activetab={activetab}
          handleTabClick={handleTabClick}
        />

        <li className="nav-item">
          <Link
            to="/profits"
            className={`nav-link ${activetab === "profits" ? "active" : ""}`}
            onClick={() => handleTabClick("profits")}
          >
            الايرادات
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
