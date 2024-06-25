// OrderProvider.js
import React, { createContext, useContext, useEffect, useState } from "react";
import serverport from "../../../backendconfiguration";
import {
  fetchOrders,
  fetchOrderswithItem,
  addOrder,
  deleteOrder,
} from "./ordersApICalls";
import { OrderItemContext } from "../OrderItemContext";
import usePopUp from "../../../Hooks/use_popup";
import useFormValidation from "../../../Hooks/use_fromvalidation";
import { SandwichCtx } from "../../SandwichContext";

export const OrderContext = createContext({
  orders: [],

  orderswithItem: [],
  payment_method: "",
  updatepayment_method: (pm) => {},
  deleteOrder: (o, t) => {},
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
  changeSandwichOrderCost: () => {},
});

export const OrderProvider = (props) => {
  const [orders, setOrders] = useState([]);
  const [orderswithItem, setOrderswithItem] = useState([]);

  const [payment_method, setpayment_method] = useState("");

  //this state is to store the cost of sandwich Order
  const [sandwichOrderCost, setsandwichOrderCost] = useState("");

  const { formStateFilterByCat, sandwich_selling_price } =
    useContext(SandwichCtx);

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

  //function to handle change of sandwich order cost
  const changeSandwichOrderCost = useEffect(() => {
    let sandOrderCost =
      orderItemCtx.formState.quantity.value * sandwich_selling_price;

    setsandwichOrderCost(sandOrderCost);
  }, [orderItemCtx.formState.quantity.value]);

  const fetchordersAndUpdateUI = async () => {
    try {
      const ordersData = await fetchOrders();
      setOrders(ordersData);

      const ordersWithItemData = await fetchOrderswithItem();
      setOrderswithItem(ordersWithItemData);

      console.log("i am in fetch order and update UI", ordersWithItemData);
    } catch (error) {
      // Handle errors
    }
  };

  useEffect(() => {
    fetchordersAndUpdateUI();
  }, []);

  //function to update the t2resha order
  const updateT2resha = async () => {
    try {
      const t2reshadata = {
        customer_id: formState.customerId.value,
        payment_method: "debt",
        totalOrderCost: formState.t2reshaperPerson.value,
        order_date: formState.orderDate.value,
      };

      const response = await addOrder(t2reshadata);
      console.log("here is the response", response);

      const data = await fetchOrders();

      setOrders(data);
      controlMsgContent(`تم تحديث التقريشة بنجاح`);
      controlDisplay(true);
      resetField("t2reshaperPerson");
      resetField("orderDate");
      resetField("customerId");
    } catch (err) {
      controlMsgContent(`فشل تحديث التقريشة`);
      controlDisplay(true);
    }
  };

  //function to update the cash order
  const updateCashofToday = async () => {
    try {
      const cashdata = {
        customer_id: null,
        payment_method: "cash",
        order_date: formState.orderDate.value,
        totalOrderCost: formState.cashtoday.value,
      };

      const response = await addOrder(cashdata);
      console.log("here is the response i got from the backend", response);

      // Fetch orders again to update the list
      const data = await fetchOrders();

      setOrders(data);
      console.log("here is the orders", orders);
      console.log("here is the orders with items", orderswithItem);
      console.log("here is the data fetched", data);

      controlMsgContent(`تم تحديث الايرادات النقدية بنجاح`);
      controlDisplay(true);
      resetField("orderDate");
      resetField("cashtoday");
    } catch (error) {
      controlMsgContent(`فشل تحديث الايرادات النقدية : ${error}`);
      controlDisplay(true);
    }
  };

  //function to update  (submit) sandwiches sold
  const updateSoldsandwiches = async () => {
    try {
      const soldSandwiches = {
        price: sandwichOrderCost,
        payment_method: "soldprod",
        customer_id: null,
        order_date: formState.orderDate.value,
        sandwich_id: formStateFilterByCat.sandwichId.value, //to be filled from sandwichCtx
      };
      console.log("here is hte sold sandwiches  order ", soldSandwiches);
      const response = await fetch(
        `http://localhost:${serverport}/orders/addSandwichOrder`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(soldSandwiches),
        }
      );
      const data = await response.json();
      console.log(
        "here is the response from backend of adding new sandwich order",
        data
      );
      await fetchordersAndUpdateUI();
      controlMsgContent(`تم تحديث طلبات الساندوتشات`);
      controlDisplay(true);
    } catch (err) {
      console.log(" فشل تحديث طلبات الساندوتشات ", err);
      controlMsgContent(`فشل تحديث طلبات الساندوتشات `);
      controlDisplay(true);
    }
  };

  //function to update  (submit) products sold
  const updatesoldprod = async () => {
    try {
      const soldprod = {
        customer_id: null,
        payment_method: "soldprod",
        order_date: formState.orderDate.value,
        orderItems: [
          {
            quantity: orderItemCtx.formState.quantity.value,
            product_id: orderItemCtx.formState.prod.value,
          },
        ],
        totalOrderCost: orderItemCtx.totalOrderCost,
      };

      console.log("here is the product that will be added", soldprod);

      // Wait for addOrder to complete
      await addOrder(soldprod);
      // Now, fetchOrderswithItem and update the state
      await fetchordersAndUpdateUI();
      controlMsgContent(`تم تحديث المنتجات المباعة بنجاح`);
      controlDisplay(true);
    } catch (error) {
      controlMsgContent(`فشل تحديث المنتجات المباعة${error}`);
      controlDisplay(true);
    }

    // Reset form fields
  };

  const handleDeleteOrder = async (orderId, type) => {
    try {
      await deleteOrder(orderId, type);
      // Fetch orders again to update the list
      await fetchordersAndUpdateUI();
      controlMsgContent(`تم ازالة الطلب بنجاح`);
      controlDisplay(true);
    } catch (error) {
      controlMsgContent(`فشل ازالة الطلب : ${error}`);
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
        updateSoldsandwiches,
        payment_method,
        updatepayment_method,
        deleteOrder: handleDeleteOrder,
        Msgcomponent,
        formState,
        errors,
        handleInputChange,
        validateField,
        getErrorMsg,
        changeSandwichOrderCost,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};
