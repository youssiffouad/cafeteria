import React, { createContext, useEffect, useState } from "react";
import { filterdateOrders } from "./ordersApICalls";

export const OrderFilterContext = createContext({
  startdate: "",
  updatestartdate: (s) => {},
  enddate: "",
  updateenddate: (e) => {},
  handleFilterDate: () => {},
  filteredOrders: [],
  filterdateOrdersCost: "",
});

export const OrderFilterProvider = (props) => {
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [filteredOrders, setfilteredOrders] = useState([]);
  const [filterdateOrdersCost, setfilterdateOrdersCost] = useState("");
  useEffect(() => {
    let cost = 0;
    for (let i = 0; i < filteredOrders.length; i++) {
      cost += filteredOrders[i].order_price;
    }
    setfilterdateOrdersCost(cost);
  }, [filteredOrders]);

  //fn to filter orders by date
  const handleFilterDate = () => {
    filterdateOrders(startdate, enddate).then((data) => {
      setfilteredOrders(data);
    });
    console.log(`here are the filtered orders`);
    console.log(filteredOrders);
  };
  const updatestartdate = (s) => {
    setstartdate(s);
  };
  const updateenddate = (e) => {
    setenddate(e);
  };

  return (
    <OrderFilterContext.Provider
      value={{
        startdate,
        enddate,
        updatestartdate,
        updateenddate,
        handleFilterDate,
        filteredOrders,
        filterdateOrdersCost,
      }}
    >
      {props.children}
    </OrderFilterContext.Provider>
  );
};
