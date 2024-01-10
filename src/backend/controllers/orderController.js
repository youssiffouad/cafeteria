const addsandwichOrder = require("../businessLogic/addsandwichOrder");
const Order = require("../models/order");
const deleteSandwichOrder = require("../businessLogic/deleteSandwichOrder");
// Function to add a new order(ordinary product order)
exports.addProductOrder = (req, res) => {
  const {
    customer_id,
    order_date,
    orderItems,
    totalOrderCost,
    payment_method,
  } = req.body;
  console.log(payment_method);

  Order.addOrder(
    customer_id,
    order_date,
    orderItems,
    payment_method,
    totalOrderCost,
    (err, result) => {
      if (err) {
        console.error("Failed to add order:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        console.log("Order added successfully:", result);
        res.status(200).json(result);
      }
    }
  );
};

//function to add sandwich order
exports.addSanadwichOrder = async (req, res) => {
  try {
    const { customer_id, order_date, sandwich_id, price, payment_method } =
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
      sandwich_id
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
exports.deleteProductOrder = (req, res) => {
  const { orderId } = req.body;
  Order.deleteOrder(orderId, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "failed to deelte order" });
      // Handle error
    } else {
      console.log(result);
      res.status(200).json(result);
      // Perform any necessary actions after deleting the order
    }
  });
};

//function to delete certain sadwich Order
exports.deleteSandwichOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    await deleteSandwichOrder(orderId);
    res.status(200).json({ message: "order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "failed to delete sandwich order" });
  }
};

// Add other order-related controller methods here
