import React, { createContext, useEffect, useState } from "react";
import serverport from "../backendconfiguration";

export const LotContext = createContext({
  lotList: [],
  updateLotList: () => {},
  productID: "",
  updateprodid: () => {},
  catid: "",
  updatecatid: () => {},
  quantity: "",
  updatequantity: () => {},
  cost: "",
  updatecost: () => {},
  received_date: "",
  updateReceivedDate: () => {},
});

export const LotProvider = (props) => {
  const [productID, setproductID] = useState("");
  const [catid, setcatid] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cost, setCost] = useState("");
  const [received_date, setReceivedDate] = useState("");
  const [lotList, setLotList] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:${serverport}/lots/view`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLotList(data);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      });
  }, [productID]);

  const updatecatid = (catid) => {
    setcatid(catid);
  };

  const updatecost = (cost) => {
    setCost(cost);
  };
  const updateprodid = (prodid) => {
    console.log("i updated product id");
    console.log(prodid);
    setproductID(prodid);
  };
  const updatequantity = (quantity) => {
    setQuantity(quantity);
  };
  const updateReceivedDate = (receiveddate) => {
    setReceivedDate(receiveddate);
  };
  const updateLotList = () => {
    const lotdata = {
      productID,
      catid,
      quantity,
      cost,
      received_date,
    };
    console.log(lotdata);
    console.log(`the prod id is ${productID}`);
    fetch(`http://localhost:${serverport}/lots/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lotdata),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add lot");
        }
        console.log(lotdata);
        alert("Lot added successfully");

        // Perform any necessary actions after adding the lot
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
        // Handle error
      });
    // Reset form fields
    setcatid("");
    setCost("");
    setQuantity("");
    setReceivedDate("");
    setproductID("");
  };

  return (
    <LotContext.Provider
      value={{
        lotList,
        updateLotList,
        productID,
        received_date,
        quantity,
        cost,
        catid,
        updatecatid,
        updatecost,
        updateprodid,
        updatequantity,
        updateReceivedDate,
      }}
    >
      {props.children}
    </LotContext.Provider>
  );
};
