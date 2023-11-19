// OrderProvider.js
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  fetchOrders,
  fetchOrderswithItem,
  addOrder,
  deleteOrder,
} from "./ordersApICalls";
import { OrderItemContext } from "../OrderItemContext";
import usePopUp from "../../../Hooks/use_popup";

export const OrderContext = createContext({
  orders: [],
  updateOrders: () => {},
  orderswithItem: [],
  rankid: "",
  updaterankid: () => {},
  customerId: "",
  updateCustomerId: (c) => {},
  tsreshaperPerson: "",
  updatetsreshaperPerson: (t) => {},
  payment_method: "",
  updatepayment_method: (pm) => {},
  orderDate: "",
  updateOrderDate: (d) => {},
  deleteOrder: (o) => {},
  updateT2resha: () => {},
  cashtoday: "",
  updateCashofToday: () => {},
  cashChangeHandler: (c) => {},

  updatesoldprod: () => {},
  Msgcomponent: "",
});

export const OrderProvider = (props) => {
  const [orders, setOrders] = useState([]);
  const [orderswithItem, setOrderswithItem] = useState([]);
  const [rankid, setrankid] = useState("");
  const [payment_method, setpayment_method] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [t2reshaperPerson, sett2reshaperPerson] = useState("");
  const [cashtoday, setcashtoday] = useState("");

  const orderItemCtx = useContext(OrderItemContext);
  const { Msgcomponent, controlDisplay, controlMsgContent } = usePopUp();

  useEffect(() => {
    fetchOrders()
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        // Handle error
      });
    fetchOrderswithItem()
      .then((data) => {
        setOrderswithItem(data);
        console.log(`here is the order with items`);
        console.log(data);
      })
      .catch((error) => {
        // Handle error
      });
  }, []);

  const updateT2resha = () => {
    const t2reshadata = {
      customer_id: customerId,
      payment_method: "debt",
      totalOrderCost: t2reshaperPerson,
      order_date: orderDate,
    };
    console.log(t2reshadata);

    addOrder(t2reshadata)
      .then((result) => {
        return fetchOrders();
      })
      .then((data) => {
        console.log(data);
        setOrders(data);
        controlMsgContent(`successfully updated T2resha`);
        controlDisplay(true);
      })
      .catch((error) => {
        // Handle error
        controlMsgContent(`failed to  update T2resha`);
        controlDisplay(true);
      });

    // Reset form fields
    // setCustomerId("");
    // setrankid("");
    // setOrderDate("");
    // setpayment_method("");
    // orderItemCtx.resetOrderItems();
  };
  const updateCashofToday = () => {
    const cashdata = {
      customer_id: null,
      payment_method: "cash",
      order_date: orderDate,
      totalOrderCost: cashtoday,
    };
    console.log(cashdata);
    addOrder(cashdata)
      .then((data) => {
        // Perform any necessary actions after adding the order

        // Fetch orders again to update the list
        fetchOrders()
          .then((data) => {
            setOrders(data);
            console.log(` iupdated the caash`);
            controlMsgContent(`successfully updated cash today`);
            controlDisplay(true);
          })
          .catch((error) => {
            // Handle error
          });
      })
      .catch((error) => {
        // Handle error
        controlMsgContent(`failed to update cash today : ${error}`);
        controlDisplay(true);
      });
  };
  const updatesoldprod = () => {
    const soldprod = {
      customer_id: null,
      payment_method: "soldprod",
      order_date: orderDate,
      orderItems: orderItemCtx.orderitems,
      totalOrderCost: orderItemCtx.totalOrderCost,
    };
    console.log(soldprod);
    addOrder(soldprod)
      .then(() => {
        // Perform any necessary actions after adding the order

        // Fetch orders again to update the list
        fetchOrderswithItem()
          .then((data) => {
            setOrderswithItem(data);
          })
          .catch((error) => {
            // Handle error
          });
        controlMsgContent(`successfully updated sold products`);
        controlDisplay(true);
      })
      .catch((error) => {
        controlMsgContent(`failed to update sold products${error}`);
        controlDisplay(true);
        // Handle error
      });
  };
  const updateOrders = () => {
    const orderData = {
      customer_id: null,
      payment_method,
      order_date: orderDate,
      totalOrderCost: orderItemCtx.totalOrderCost,
      orderItems: orderItemCtx.orderitems,
    };

    addOrder(orderData)
      .then(() => {
        // Perform any necessary actions after adding the order

        // Fetch orders again to update the list
        fetchOrders()
          .then((data) => {
            setOrders(data);
          })
          .catch((error) => {
            // Handle error
          });
      })
      .catch((error) => {
        // Handle error
      });

    // Reset form fields
    setCustomerId("");
    setrankid("");
    setOrderDate("");
    setpayment_method("");
    orderItemCtx.resetOrderItems();
  };

  const handleDeleteOrder = (orderId) => {
    deleteOrder(orderId)
      .then(() => {
        // Perform any necessary actions after deleting the order

        // Fetch orders again to update the list
        fetchOrders()
          .then((data) => {
            setOrderswithItem(data);
            setOrders(data);
            console.log(`ele b7to `);
            console.log(data);
            controlMsgContent(`successfully deleted order`);
            controlDisplay(true);
          })
          .catch((error) => {
            // Handle error
          });
      })
      .catch((error) => {
        controlMsgContent(`failed deleted order : ${error}`);
        controlDisplay(true);
        // Handle error
      });
  };

  const updateCustomerId = (c) => {
    setCustomerId(c);
  };

  const updateOrderDate = (d) => {
    setOrderDate(d);
  };

  const updaterankid = (r) => {
    setrankid(r);
  };
  const updatepayment_method = (pm) => {
    setpayment_method(pm);
  };
  const updatetsreshaperPerson = (t) => {
    console.log(t);
    sett2reshaperPerson(t);
  };
  const cashChangeHandler = (c) => {
    setcashtoday(c);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        orderswithItem,
        updateOrders,
        fetchOrders,
        rankid,
        updaterankid,
        customerId,
        updateCustomerId,
        t2reshaperPerson,
        updatetsreshaperPerson,
        updateCashofToday,

        updateT2resha,
        cashChangeHandler,
        updatesoldprod,
        payment_method,
        updatepayment_method,
        orderDate,
        updateOrderDate,
        deleteOrder: handleDeleteOrder,
        Msgcomponent,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};
