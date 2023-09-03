import React, { createContext, useState, useEffect } from "react";
import serverport from "../backendconfiguration";

export const SaleContext = createContext({
  saleList: [],
  updateSaleList: () => {},
  prodid: "",
  updateprodid: () => {},
  catid: "",
  updatecatid: () => {},
  rankid: "",
  updaterankid: () => {},
  customerid: "",
  updatecustomerid: () => {},
  quantity: "",
  updatequantity: () => {},
  seliingdate: "",
  updatesellingdate: () => {},
});

export const SaleProvider = (props) => {
  const [catid, setcatid] = useState("");
  const [prodid, setprodid] = useState("");
  const [customerid, setcustomerid] = useState("");
  const [rankid, setrankid] = useState("");
  const [quantity, setquantity] = useState("");
  const [sellingdate, setsellingdate] = useState("");
  const [saleList, setSaleList] = useState([]);

  //view all sales
  useEffect(() => {
    fetch(`http://localhost:${serverport}/sales/view`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSaleList(data);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      });
  }, []);

  const updatecatid = (c) => {
    setcatid(c);
  };

  const updateprodid = (p) => {
    setprodid(p);
  };

  const updatecustid = (c) => {
    setcustomerid(c);
  };
  const updaterankid = (r) => {
    setrankid(r);
  };
  const updatequantity = (q) => {
    setquantity(q);
  };
  const updatesellingdate = (s) => {
    setsellingdate(s);
  };

  //add new sale
  const updateSaleList = () => {
    const saledata = {
      catid,
      productID: prodid,
      rankid,
      customerid,
      sellingdate,
      quantity,
    };
    console.log(saledata);

    fetch(`http://localhost:${serverport}/sales/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(saledata),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add sale");
        }
        console.log(saledata);
        alert("Sale added successfully");

        // Perform any necessary actions after adding the sale
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
        // Handle error
      });
    // Reset form fields
    setcatid("");
    setcustomerid("");
    setprodid("");
    setquantity("");
    setrankid("");
    setsellingdate("");
  };

  return (
    <SaleContext.Provider
      value={{
        saleList,
        updateSaleList,

        prodid,
        customerid,
        catid,
        rankid,
        quantity,
        sellingdate,
        updatecatid,
        updateprodid,
        updaterankid,
        updatecustid,
        updatequantity,
        updatesellingdate,
      }}
    >
      {props.children}
    </SaleContext.Provider>
  );
};
