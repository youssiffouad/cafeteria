import React, { createContext, useEffect, useState } from "react";

export const OrderItemContext = createContext({
  orderitems: [],
  updateorderitems: () => {},

  cat: { id: "", name: "" },
  updatecat: (c) => {},
  prod: { id: "", name: "", price: "" },
  updateprod: (p) => {},
  quantity: "",
  updatequantity: (q) => {},
  totalOrderCost: "",
  resetOrderItems: () => {},
  deleteItem: () => {},
  // itemprice: "",
  // updateitemprice: (p) => {},
});

export const OrderItemProvider = (props) => {
  const [cat, setcat] = useState({ id: "", name: "" });
  const [prod, setprod] = useState({ id: "", name: "", price: "" });
  const [quantity, setquantity] = useState("");

  // const [itemprice, setitemprice] = useState("");
  const [orderitems, setorderitems] = useState([]);

  const updatecat = (c) => {
    console.log(`this is the cat ${cat}`);
    setcat(c);
  };
  const updateprod = (p) => {
    console.log(`this is the ${prod}`);
    setprod(p);
  };
  const updatequantity = (q) => {
    console.log(`this is the ${quantity}`);
    setquantity(q);
  };

  const updateorderitems = useEffect(() => {
    const newitem = {
      cat,
      prod,
      quantity,
    };

    console.log(newitem);
    console.log(`here is the new updated orderlist`);
    setorderitems((prev) => [newitem]);
  }, [cat, prod, quantity]);
  const deleteItem = (id) => {
    const orderItems = [...orderitems];
    console.log(`here is the id ${id}`);

    if (id !== -1) {
      console.log(`i eill delete`);
      orderItems.splice(id, 1);
    }
    setorderitems(orderItems);
  };

  // Create a new variable to store the total order cost
  const totalOrderCost = prod.price * quantity;

  return (
    <OrderItemContext.Provider
      value={{
        orderitems,
        updateorderitems,
        cat,
        updatecat,
        prod,
        updateprod,
        quantity,
        updatequantity,
        totalOrderCost,
        deleteItem,
      }}
    >
      {props.children}
    </OrderItemContext.Provider>
  );
};
