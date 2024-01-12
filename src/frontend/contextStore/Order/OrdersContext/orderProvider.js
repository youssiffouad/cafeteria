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
  const updateT2resha = () => {
    const t2reshadata = {
      customer_id: customerId,
      payment_method: "debt",
      totalOrderCost: t2reshaperPerson,
      order_date: orderDate,
    };

    addOrder(t2reshadata)
      .then((result) => {
        return fetchOrders();
      })
      .then((data) => {
        setOrders(data);
        controlMsgContent(`successfully updated T2resha`);
        controlDisplay(true);
      })
      .catch((error) => {
        // Handle error
        controlMsgContent(`failed to  update T2resha`);
        controlDisplay(true);
      });
  };

  //function to update the cash order
  const updateCashofToday = () => {
    const cashdata = {
      customer_id: null,
      payment_method: "cash",
      order_date: orderDate,
      totalOrderCost: cashtoday,
    };

    addOrder(cashdata)
      .then((data) => {
        // Perform any necessary actions after adding the order

        // Fetch orders again to update the list
        fetchOrders()
          .then((data) => {
            setOrders(data);

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
    } catch (err) {
      console.log("error updatin gthe sandwiches orders", err);
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
      controlMsgContent(`successfully updated sold products`);
      controlDisplay(true);
    } catch (error) {
      controlMsgContent(`failed to update sold products${error}`);
      controlDisplay(true);
    }

    // Reset form fields
  };

  const handleDeleteOrder = async (orderId, type) => {
    try {
      await deleteOrder(orderId, type);
      // Fetch orders again to update the list
      await fetchordersAndUpdateUI();
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
