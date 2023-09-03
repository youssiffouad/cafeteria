import React, { useState, useEffect, useContext } from "react";
import serverport from "../../backendconfiguration";
import { OrderContext } from "../../contextStore/Order/OrdersContext/orderProvider";

const FilterCustomerBYRank = (props) => {
  const [ranks, setranks] = useState([]);
  // const [rankid, setrankid] = useState("");
  const [filteredcusts, setfilteredcusts] = useState([]);
  // const [custid, setcustid] = useState("");
  const orderCtx = useContext(OrderContext);

  // Fetch all ranks existing
  useEffect(() => {
    fetch(`http://localhost:${serverport}/ranks/view`)
      .then((response) => response.json())
      .then((data) => {
        setranks(data);
      })
      .catch((error) => {
        console.error("Failed to fetch categories:", error);
      });
  }, []);

  // Change customeers on changing rank
  useEffect(() => {
    if (orderCtx.rankid !== "") {
      console.log("ana geet");
      const requestBody = { rankid: orderCtx.rankid };
      fetch(`http://localhost:${serverport}/customers/filterbyrank`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())
        .then((data) => {
          setfilteredcusts(data);
        })
        .catch((error) => {
          console.error("Failed to filter products:", error);
        });
    }
  }, [orderCtx.rankid]);

  const custchangehandler = (event) => {
    orderCtx.updateCustomerId(event.target.value);
    // setcustid(event.target.value);
  };
  const rankchangehandler = (event) => {
    orderCtx.updaterankid(event.target.value);
    // setrankid(event.target.value);
    console.log(orderCtx.rankid);
  };

  return (
    <React.Fragment>
      <label>
        Rank
        <select
          className="form-control"
          value={orderCtx.rankid}
          onChange={rankchangehandler}
        >
          <option value="">Select Rank</option>
          {ranks.map((rank) => (
            <option key={rank.id} value={rank.id}>
              {rank.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Customers
        <select
          className="form-control"
          value={orderCtx.customerId}
          onChange={custchangehandler}
        >
          <option value="">Select Customer Name</option>
          {filteredcusts.map((cust) => (
            <option key={cust.id} value={cust.id}>
              {cust.custname}
            </option>
          ))}
        </select>
      </label>
    </React.Fragment>
  );
};

export default FilterCustomerBYRank;
