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
import useFormValidation from "../../../Hooks/use_fromvalidation";

export const OrderContext = createContext({
  orders: [],

  orderswithItem: [],
  payment_method: "",
  updatepayment_method: (pm) => {},
  deleteOrder: (o) => {},
  updateT2resha: () => {},
  updateCashofToday: () => {},
  updatesoldprod: () => {},
  updateSoldsandwiches: () => {},
  Msgcomponent: "",
  formState: {},
  errors: {},
  handleInputChange: (event) => {},
  validateField: (fieldName, fieldType, fieldValue) => {},
  getErrorMsg: (fieldName) => {},
});

export const OrderProvider = (props) => {
  const [orders, setOrders] = useState([]);
  const [orderswithItem, setOrderswithItem] = useState([]);

  const [payment_method, setpayment_method] = useState("");

  const cashtoday = { value: "", valid: true };
  const orderDate = { value: "", valid: true };
  const t2reshaperPerson = { value: "", valid: true };
  const customerId = { value: "", valid: true };
  const rankid = { value: "", valid: true };
  const {
    formState,
    errors,
    handleInputChange,
    validateField,
    resetField,
    getErrorMsg,
  } = useFormValidation({
    rankid,
    customerId,
    orderDate,
    t2reshaperPerson,
    cashtoday,
  });

  const orderItemCtx = useContext(OrderItemContext);
  const { Msgcomponent, controlDisplay, controlMsgContent } = usePopUp();

  const fetchordersAndUpdateUI = async () => {
    try {
      const ordersData = await fetchOrders();
      setOrders(ordersData);

      const ordersWithItemData = await fetchOrderswithItem();
      setOrderswithItem(ordersWithItemData);

      console.log("Orders with items fetched");
      console.log(ordersWithItemData);
      console.log(orderswithItem);
    } catch (error) {
      // Handle errors
    }
  };
  useEffect(() => {
    console.log("Updated Orders bta3 eluseeffects with items:", orderswithItem);
  }, [orderswithItem]);
  useEffect(() => {
    fetchordersAndUpdateUI();
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

  //function to update or submit sandwiches sold
  const updateSoldsandwiches = () => {
    const soldSandwiches = {
      price : orderItemCtx.totalOrderCost,
      payment_method : "soldprod",
      customer_id :null,
      order_date: orderDate,
      sandwich_id: //to be filled from sandwichCtx
    };
  };

  //function to update  (submit) products sold
  const updatesoldprod = async () => {
    const soldprod = {
      customer_id: null,
      payment_method: "soldprod",
      order_date: orderDate,
      orderItems: orderItemCtx.orderitems,
      totalOrderCost: orderItemCtx.totalOrderCost,
    };

    console.log(soldprod);

    try {
      // Wait for addOrder to complete
      await addOrder(soldprod);
      // Now, fetchOrderswithItem and update the state
      fetchordersAndUpdateUI();
      controlMsgContent(`successfully updated sold products`);
      controlDisplay(true);
    } catch (error) {
      controlMsgContent(`failed to update sold products${error}`);
      controlDisplay(true);
    }
  };
 
    // Reset form fields
    resetField("customerId");
    resetField("rankid");
    resetField("orderDate");
    setpayment_method("");
    orderItemCtx.resetOrderItems();
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrder(orderId);
      // Fetch orders again to update the list
      fetchordersAndUpdateUI();
      controlMsgContent(`successfully deleted order`);
      controlDisplay(true);
    } catch (error) {
      controlMsgContent(`failed deleted order : ${error}`);
      controlDisplay(true);
    }
  };

  const updatepayment_method = (pm) => {
    setpayment_method(pm);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        orderswithItem,
     
        fetchOrders,
        updateCashofToday,
        updateT2resha,
        updatesoldprod,
        payment_method,
        updatepayment_method,
        deleteOrder: handleDeleteOrder,
        Msgcomponent,
        formState,
        errors,
        handleInputChange,
        validateField,
        getErrorMsg,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};
