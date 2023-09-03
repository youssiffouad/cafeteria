import React, { createContext, useEffect, useState } from "react";
import { filterdateOrders } from "../Order/OrdersContext/ordersApICalls";

export const AccountingContext = createContext({
  startdate: "",
  updatestartdate: (s) => {},
  enddate: "",
  updateenddate: (e) => {},
  handleFilterDate: () => {},
  allfilteredOrders: [],
  allfilteredLots: [],
  allorderscost: "",
  cashorderscost: "",
  notcashorderscost: "",
  lotscost: "",
  cashorders: [],
  notcashorders: [],
});

export const AccountingProvider = (props) => {
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [allfilteredOrders, setallfilteredOrders] = useState([]);
  const [allfilteredLots, setallfilteredLots] = useState([]);
  const [cashorders, setcashorders] = useState([]);
  const [notcashorders, setnotcashorders] = useState([]);

  const [allorderscost, setallorderscost] = useState("");
  const [cashorderscost, setcashorderscost] = useState("");
  const [notcashorderscost, setnotcashorderscost] = useState("");
  const [lotscost, setlotscost] = useState("");

  //change cost on changing filtered orders
  useEffect(() => {
    let cost = 0;
    for (let i = 0; i < allfilteredOrders.length; i++) {
      cost += allfilteredOrders[i].order_price;
    }
    setallorderscost(cost);
    cost = 0;
    for (let i = 0; i < allfilteredLots.length; i++) {
      cost += allfilteredLots[i].cost;
      console.log(allfilteredLots[i]);
    }
    setlotscost(cost);
    cost = 0;
    for (let i = 0; i < cashorders.length; i++) {
      cost += cashorders[i].order_price;
    }
    setcashorderscost(cost);
    cost = 0;
    for (let i = 0; i < notcashorders.length; i++) {
      cost += notcashorders[i].order_price;
    }
    setnotcashorderscost(cost);
  }, [allfilteredOrders, cashorders, notcashorders, allfilteredLots]);

  //fn tofilter lots by date
  const filterdateLots = () => {
    const limits = { startdate, enddate };
    fetch("http://localhost:3060/lots/filterdate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(limits),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setallfilteredLots(data);
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
        // Handle error
      });
  };

  //fn to handle filtering (lots and orders)
  const handleFilterDate = () => {
    filterdateLots();
    filterdateOrders(startdate, enddate).then((data) => {
      setallfilteredOrders(data);
    });
    console.log(`here are the filtered orders`);
    console.log(allfilteredOrders);
    splitorders();
  };

  const updatestartdate = (s) => {
    setstartdate(s);
  };
  const updateenddate = (e) => {
    setenddate(e);
  };
  //fn to split the orders
  const splitorders = () => {
    const cashOrders = [];
    const notCashOrders = [];

    allfilteredOrders.forEach((order) => {
      if (order.customer_name === "cash") {
        cashOrders.push(order);
      } else {
        notCashOrders.push(order);
      }
    });

    setcashorders(cashOrders);
    setnotcashorders(notCashOrders);
  };

  return (
    <AccountingContext.Provider
      value={{
        startdate,
        enddate,
        updatestartdate,
        updateenddate,
        handleFilterDate,
        allfilteredOrders,
        allfilteredLots,
        cashorders,
        notcashorders,
        cashorderscost,
        notcashorderscost,
        allorderscost,
        lotscost,
      }}
    >
      {props.children}
    </AccountingContext.Provider>
  );
};
