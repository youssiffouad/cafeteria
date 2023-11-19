import React, { createContext, useEffect, useState } from "react";
import serverport from "../backendconfiguration";
import usePopUp from "../Hooks/use_popup";

export const CustomerContext = createContext({
  custlist: [],
  updatecustlist: () => {},
  name: "",
  updatename: (n) => {},
  rankId: "",
  updaterankId: (c) => {},
  ranks: [],
  Msgcomponent: "",
});

export const CustomerProvider = (props) => {
  const [custlist, setcustlist] = useState([]);
  const [name, setName] = useState("");
  const [rankId, setrankId] = useState("");

  const [ranks, setranks] = useState([]);
  const { Msgcomponent, controlDisplay, controlMsgContent } = usePopUp();

  //view all customers
  useEffect(() => {
    fetch(`http://localhost:${serverport}/customers/view`)
      .then((response) => response.json())
      .then((data) => {
        setcustlist(data);
      })
      .catch((error) => {
        console.error("Failed to fetch customers:", error);
      });
  }, [name]);

  useEffect(() => {
    fetch(`http://localhost:${serverport}/ranks/view`)
      .then((response) => response.json())
      .then((data) => {
        setranks(data);
      })
      .catch((error) => {
        console.error("Failed to fetch ranks:", error);
      });
  }, []);

  const updatecustlist = () => {
    const customerData = {
      name,
      rankId,
    };
    console.log(customerData);

    fetch(`http://localhost:${serverport}/customers/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        controlMsgContent("successfully added new customer");
        controlDisplay(true);
        // Perform any necessary actions after adding the customer
      })

      .catch((error) => {
        console.error("Failed to add customer:", error);
        controlMsgContent(`Failed to add customer, error`);
        controlDisplay(true);
        // Handle error
      });

    // Reset form fields
    setName("");
    setrankId("");
  };
  const updatename = (name) => {
    setName(name);
  };

  const updaterankId = (rankId) => {
    setrankId(rankId);
  };

  return (
    <CustomerContext.Provider
      value={{
        custlist,
        updatecustlist,
        name,
        updatename,
        rankId,
        updaterankId,
        ranks,
        Msgcomponent,
      }}
    >
      {props.children}
    </CustomerContext.Provider>
  );
};
