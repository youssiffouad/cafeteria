const db = require("../models/db");
const Order = require("../models/order");
const customer = require("../models/customer");
const finance = require("../models/financial");

//function to delete Product order
const deleteProductOrder = async (orderId) => {
  return new Promise((resolve, reject) => {
    try {
      db.serialize(async () => {
        await new Promise((res, rej) => {
          db.run("BEGIN TRANSACTION", function (err) {
            if (err) {
              console.log("failed to begin transaction of deleting order");
              rej(err);
            } else {
              console.log("started  transaction of deleting order");
              res();
            }
          });
        });

        let customer_id = await Order.getCustomerID(orderId);

        // Retrieve order items
        let orderItems = await Order.getOrderItems(orderId);

        // Retrieve payment method
        let payment_method = await Order.getPaymentMethod(orderId);

        // Retrieve total order cost
        let totalOrderCost = await Order.getTotalOrderCost(orderId);
        // Determine payment handler based on payment method
        if (payment_method === "cash")
          await finance.changeCashVlaue(-totalOrderCost);
        else if (payment_method === "debt") {
          await finance.changeOwedValue(-totalOrderCost);
          await customer.changeDebtOfCustomer(customer_id, -totalOrderCost);
        } else if (payment_method === "soldprod")
          await finance.handleSoldProdPayment(1, orderId, orderItems);

        await Order.deleteOrderRow(orderId);
        await new Promise((res, rej) => {
          db.run("commit", function (err) {
            if (err) {
              db.run("rollback");
              console.log(
                "failed to commit transaction of deleting product order",
                err
              );
              rej(err);
            } else {
              console.log("i committed successfully of deleting product order");
              res();
            }
          });
        });
        resolve({
          meassage: "successfully deleted the product order",
          orderId,
        });
      });
    } catch (err) {
      db.run("rollback");
      console.log("failed to delete product order", err);
      reject(err);
    }
  });
};
module.exports = deleteProductOrder;
