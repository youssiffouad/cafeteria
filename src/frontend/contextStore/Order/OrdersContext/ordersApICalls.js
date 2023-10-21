// OrderAPI.js
import serverport from "../../../backendconfiguration";

export const fetchOrders = async () => {
  try {
    const response = await fetch(`http://localhost:${serverport}/orders/view`);
    const data = await response.json();
    console.log("Fetched orders:", data);
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
    console.log("Fetched orders:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw error;
  }
};
export const addOrder = (orderData) => {
  console.log("a7aaaaaaaaaaaaaaaaaaa");
  return fetch(`http://localhost:${serverport}/orders/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to add order");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error("Failed to add order:", error);
      throw error;
    });
};

export const deleteOrder = async (orderId) => {
  const orderid = { orderId };

  try {
    const response = await fetch(
      `http://localhost:${serverport}/orders/delete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderid),
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
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
    console.log(data);
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
    console.log(data);
    return data;
  } catch (error) {
    console.error("Failed to add order:", error);
    throw error;
  }
};
