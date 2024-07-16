const addsandwichOrder = require("../businessLogic/addsandwichOrder");
const Order = require("../models/order");
const deleteSandwichOrder = require("../businessLogic/deleteSandwichOrder");
const addProductOrder = require("../businessLogic/addProductOrder");
const deleteProductOrder = require("../businessLogic/deleteProductOrder");
// Function to add a new order(ordinary product order)
exports.addProductOrder = async (req, res) => {
  const {
    customer_id,
    order_date,
    orderItems,
    totalOrderCost,
    payment_method,
  } = req.body;
  console.log("hhere is the data i received from front end", req.body);
  try {
    const response = await addProductOrder(
      customer_id,
      order_date,
      orderItems,
      payment_method,
      totalOrderCost
    );
    console.log("the response i get in hte controller", response);
    res.status(200).json(response);
  } catch (err) {
    console.log("failed to add a new product order", err);
    res.status(500).json({ message: "internal server error", err });
  }
};

//function to add sandwich order
exports.addSanadwichOrder = async (req, res) => {
  try {
    const { customer_id, order_date, sandwich_id, price, payment_method,noOfSandwiches } =
      req.body;
    console.log(
      "here is what i got from front end to add new sandwich order",
      req.body
    );
    const response = await addsandwichOrder(
      price,
      payment_method,
      customer_id,
      order_date,
      sandwich_id,
      noOfSandwiches
    );
    res.status(200).json(response);
  } catch (err) {
    console.error("failed to add sandwich order:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
// Function to view all orders
exports.viewOrders = (req, res) => {
  Order.viewOrders((err, orders) => {
    if (err) {
      console.error("Failed to retrieve orders:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(orders);
    }
  });
};

// Function to view all orders with corresponding orderitem
exports.viewOrderswithItem = (req, res) => {
  Order.viewOrderswithItem((err, orders) => {
    if (err) {
      console.error("Failed to retrieve orders:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(orders);
    }
  });
};

//function to filter orders in certain interval
exports.filterOrdersDate = (req, res) => {
  const { startdate, enddate } = req.body;
  Order.filterOrdersdate(startdate, enddate, (err, filteredorders) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "failed to filter orders" });
    } else {
      res.status(200).json(filteredorders);
    }
  });
};

//function to filter orders by certain customer
exports.filterOrderCust = (req, res) => {
  const { custid } = req.body;
  Order.filterOrdersByCustomerId(custid, (err, filteredorders) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "failed to filter orders" });
    } else {
      res.status(200).json({ filteredorders });
    }
  });
};

//fn to filter orders by both customer and date
exports.filterOrderCustandDate = (req, res) => {
  const { custid, startdate, enddate } = req.body;
  Order.filterOrdersByCustomerAndDateInterval(
    custid,
    startdate,
    enddate,
    (err, filteredorders) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "failed to filter orders by cust and date" });
      } else {
        res.status(200).json({ filteredorders });
      }
    }
  );
};

//function to delete certain Product order
exports.deleteProductOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const result = await deleteProductOrder(orderId);
    res.status(200).json(result);
  } catch (err) {
    console.log("failed to delete product order", err);
    res.status(500).json(err);
  }
};

//function to delete certain sadwich Order
exports.deleteSandwichOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const response = await deleteSandwichOrder(orderId);
    console.log("her eis hte response from i get from hte model", response);
    res.status(200).json(response);
  } catch (err) {
    console.log("i caught the error",err)
    res.status(500).json({ error: "failed to delete sandwich order" });
  }
};

// Add other order-related controller methods here
