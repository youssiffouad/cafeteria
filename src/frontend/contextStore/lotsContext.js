import React, { createContext, useCallback, useEffect, useState } from "react";
import serverport from "../backendconfiguration";
import usePopUp from "../Hooks/use_popup";

export const LotContext = createContext({
  lotList: [],
  updateLotList: () => {},
  productID: "",
  updateprodid: () => {},
  prodBuyingPrice: "",
  updateprodBuyingPrice: (pbp) => {},
  catid: "",
  updatecatid: () => {},
  quantity: "",
  updatequantity: () => {},
  paidAmount: "",
  updatepaidAmount: () => {},
  cost: "",
  updatecost: () => {},
  received_date: "",
  updateReceivedDate: () => {},
  handleDeleteLot: (L) => {},
  installLot: (lotid) => {},
  Msgcomponent: "",
});

export const LotProvider = (props) => {
  const [productID, setproductID] = useState("");
  const [prodBuyingPrice, setprodBuyingPrice] = useState("");
  const [catid, setcatid] = useState("");
  const [quantity, setQuantity] = useState("");
  const [paidAmount, setpaidAmount] = useState("");
  const [cost, setCost] = useState("");
  const [received_date, setReceivedDate] = useState("");
  const [lotList, setLotList] = useState([]);
  const { Msgcomponent, controlDisplay, controlMsgContent } = usePopUp();

  const fetchLots = () => {
    fetch(`http://localhost:${serverport}/lots/view`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLotList(data);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      });
  };
  const handleDeleteLot = (Lotid) => {
    console.log(Lotid);
    const lotid = { Lotid };
    fetch(`http://localhost:${serverport}/lots/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lotid),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete lot");
        }
        fetchLots();
        controlMsgContent(`successfully deleted the lot`);
        controlDisplay(true);

        // Perform any necessary actions after adding the lot
      })
      .catch((error) => {
        console.error(error);
        controlMsgContent(`failed to delete the lot :${error}`);
        controlDisplay(true);
        // Handle error
      });
  };

  const updatecatid = (catid) => {
    setcatid(catid);
  };

  const updatecost = useCallback(() => {
    console.log(`prodbuying price${prodBuyingPrice}`);
    console.log(`quantity ${quantity}`);
    setCost(prodBuyingPrice * quantity);
  }, [prodBuyingPrice, quantity]);

  //change cost on changing quantity automatically
  useEffect(() => {
    updatecost();
  }, [updatecost]);

  const installLot = (lot_id) => {
    const lotid = { lot_id };
    console.log(lotid);
    console.log(` i callled after the press`);
    fetch(`http://localhost:${serverport}/lots/install`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lotid),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to install lot");
        }
        fetchLots();
        alert("Lot installed successfully");

        // Perform any necessary actions after adding the lot
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
        // Handle error
      });
  };

  const updateprodid = (prodid) => {
    console.log("i updated product id");
    console.log(prodid);
    setproductID(prodid);
  };
  const updateprodBuyingPrice = (pbp) => {
    console.log("i updated product buying price");
    console.log(pbp);
    setprodBuyingPrice(pbp);
  };
  const updatequantity = (quantity) => {
    setQuantity(quantity);
  };
  const updatepaidAmount = (q) => {
    setpaidAmount(q);
  };
  const updateReceivedDate = (receiveddate) => {
    setReceivedDate(receiveddate);
  };
  const updateLotList = useCallback(() => {
    const lotdata = {
      productID,
      catid,
      quantity,
      cost,
      paidAmount,
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

        // Perform any necessary actions after adding the lot
        fetchLots();
        controlMsgContent(`successfully added the new lot`);
        controlDisplay(true);
      })
      .catch((error) => {
        console.error(error);
        controlMsgContent(`failed to add the new lot : ${error}`);
        controlDisplay(true);
        // Handle error
      });
    // Reset form fields
  }, [catid, cost, paidAmount, productID, quantity, received_date]);

  useEffect(() => {
    fetchLots();
    console.log(` yes i am ehehehhehehehehhehehrrrrrrrrrrreeeeeeeeeeeee`);
  }, []);

  return (
    <LotContext.Provider
      value={{
        lotList,
        updateLotList,
        productID,
        prodBuyingPrice,
        received_date,
        quantity,
        paidAmount,
        cost,
        catid,
        updatecatid,
        updatecost,
        updateprodid,
        updateprodBuyingPrice,
        updatequantity,
        updatepaidAmount,
        updateReceivedDate,
        handleDeleteLot,
        installLot,
        Msgcomponent,
      }}
    >
      {props.children}
    </LotContext.Provider>
  );
};
