import React, { createContext, useEffect, useState } from "react";
import serverport from "../backendconfiguration";

export const vendorContext = createContext({
  vendorlist: [],
  updatevendorlist: () => {},
  name: "",
  updatename: (n) => {},
  phone: "",
  updatePhone: (p) => {},
});

export const VendorProvider = (props) => {
  const [vendorlist, setvendorlist] = useState([]);
  const [name, setName] = useState("");
  const [phone, setphone] = useState("");

  useEffect(() => {
    fetch(`http://localhost:${serverport}/vendors/view`)
      .then((response) => response.json())
      .then((data) => {
        setvendorlist(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Failed to fetch vendors:", error);
      });
  }, [name]);

  //adding new vendor
  const updatevendorlist = () => {
    const vendorData = {
      name,
      phone,
    };

    fetch(`http://localhost:${serverport}/vendors/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vendorData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Perform any necessary actions after adding the vendor
      })
      .catch((error) => {
        console.error("Failed to add vendor:", error);
        // Handle error
      });

    // Reset form fields
    setName("");
  };
  const updatename = (name) => {
    setName(name);
  };

  const updatephone = (phone) => {
    setphone(phone);
  };

  return (
    <vendorContext.Provider
      value={{
        vendorlist,
        updatevendorlist,
        name,
        updatename,
        phone,
        updatephone,
      }}
    >
      {props.children}
    </vendorContext.Provider>
  );
};
