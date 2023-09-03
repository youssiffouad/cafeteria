// OrderAPI.js
import serverport from "../../../backendconfiguration";

export const fetchOrders = () => {
  return fetch(`http://localhost:${serverport}/orders/view`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched orders:", data);
      return data;
    })
    .catch((error) => {
      console.error("Failed to fetch orders:", error);
      throw error;
    });
};

export const addOrder = (orderData) => {
  return fetch(`http://localhost:${serverport}/orders/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error("Failed to add order:", error);
      throw error;
    });
};

export const deleteOrder = (orderId) => {
  const orderid = { orderId };

  return fetch(`http://localhost:${serverport}/orders/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderid),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error("Failed to delete order:", error);
      throw error;
    });
};

//function to filter order by date
export const filterdateOrders = (startdate, enddate) => {
  const limits = { startdate, enddate };
  return fetch(`http://localhost:${serverport}/orders/filterdate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(limits),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error(error);
      alert(error.message);
      // Handle error
      throw error;
    });
};
