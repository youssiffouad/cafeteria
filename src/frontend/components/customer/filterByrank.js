import React, { useState, useEffect, useContext } from "react";
import serverport from "../../backendconfiguration";
import { OrderContext } from "../../contextStore/Order/OrdersContext/orderProvider";

const FilterCustomerBYRank = () => {
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
    if (orderCtx.formState.rankid.value !== "") {
      console.log("ana geet");
      const requestBody = { rankid: orderCtx.formState.rankid.value };
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
  }, [orderCtx.formState.rankid.value]);

  const custchangehandler = (event) => {
    orderCtx.handleInputChange(event);
    orderCtx.validateField(event.target.name, "dropdown", event.target.value);

    // setcustid(event.target.value);
  };
  const rankchangehandler = (event) => {
    orderCtx.handleInputChange(event);
    orderCtx.validateField(event.target.name, "dropdown", event.target.value);
  };

  return (
    <React.Fragment>
      <div className="col">
        <label>
          الرتبة / الدرجة
          <select
            name="rankid"
            className={`form-control input ${
              !orderCtx.formState.rankid.valid && "is-invalid"
            }`}
            value={orderCtx.formState.rankid.value}
            onChange={rankchangehandler}
          >
            <option value="">اختر الرتبة / الدرجة</option>
            {ranks.map((rank) => (
              <option key={rank.id} value={rank.id}>
                {rank.name}
              </option>
            ))}
          </select>
        </label>
        {!orderCtx.formState.rankid.valid && (
          <p className="text-danger">{orderCtx.getErrorMsg("rankid")}</p>
        )}
      </div>

      <div className="col">
        <label>
          المستهلك
          <select
            name="customerId"
            className={`form-control input ${
              !orderCtx.formState.customerId.valid && "is-invalid"
            }`}
            value={orderCtx.formState.customerId.value}
            onChange={custchangehandler}
          >
            <option value="">اختر اسم المستهلك</option>
            {filteredcusts.map((cust) => (
              <option key={cust.id} value={cust.id}>
                {cust.custname}
              </option>
            ))}
          </select>
        </label>
        {!orderCtx.formState.customerId.valid && (
          <p className="text-danger">{orderCtx.getErrorMsg("customerId")}</p>
        )}
      </div>
    </React.Fragment>
  );
};

export default FilterCustomerBYRank;
