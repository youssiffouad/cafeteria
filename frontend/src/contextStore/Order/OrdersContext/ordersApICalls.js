// OrderAPI.js
import serverport from "../../../backendconfiguration";

export const fetchOrders = async () => {
  try {
    const response = await fetch(`http://localhost:${serverport}/orders/view`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw error;
  }
};

export const fetchOrderswithItem = async () => {
  try {
    const response = await fetch(
      `http://localhost:${serverport}/orders/viewWithItem`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw error;
  }
};
export const addOrder = async (orderData) => {
  try {
    const response = await fetch(
      `http://localhost:${serverport}/orders/addProductOrder`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      }
    );
    const data = await response.json();
    console.log(
      "here is the response i got from the backend on adding new product order",
      data
    );
    return data;
  } catch (error) {
    console.error("Failed to add order:", error);
    throw error;
  }
};

//function to delete certain order
//the 1st argument is hte order id
//the 2nd argument is the tpye of order whether sandwich order or  product order
export const deleteOrder = async (orderId, type) => {
  const orderid = { orderId };
  console.log("here is the type of the order to be deleted", type);

  try {
    //if type is sandwich then delete sandwich order
    if (type === "Sandwich") {
      console.log("i am in type sandwich");
      const response = await fetch(
        `http://localhost:${serverport}/orders/deleteSandwichOrder`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderid),
        }
      );
      if (response.status!=200)
        throw new Error("failed to delete sandwich order");
      const data = await response.json();

      return data;
      //if type is product then delete product order
    } else if (type === "Product") {
      const response = await fetch(
        `http://localhost:${serverport}/orders/deleteProductOrder`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderid),
        }
      );
      const data = await response.json();

      return data;
    }
  } catch (error) {
    console.error("Failed to delete order:", error);
    throw error;
  }
};

//function to filter order by date
export const filterdateOrders = async (startdate, enddate) => {
  const limits = { startdate, enddate };
  try {
    const response = await fetch(
      `http://localhost:${serverport}/orders/filterdate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(limits),
      }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    alert(error.message);
    // Handle error
    throw error;
  }
};

//function to add t2resha
export const addT2resha = async (t2resha) => {
  try {
    const response = await fetch(`http://localhost:${serverport}/orders/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(t2resha),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to add order:", error);
    throw error;
  }
};
