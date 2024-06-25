const db = require("../models/db");
const Order = require("../models/order");
const customer = require("../models/customer");
const finance = require("../models/financial");
const addProductOrder = async (
  customer_id,
  order_date,
  orderItems,
  payment_method,
  totalOrderCost
) => {
  return new Promise((resolve, reject) => {
    try {
      db.serialize(async () => {
        db.run("PRAGMA foreign_keys=on");

        await new Promise((res, rej) => {
          db.run("BEGIN TRANSACTION", function (err) {
            if (err) {
              console.log("failed to begin transasction");
              rej(err);
            } else {
              console.log("i started transaction");
              res();
            }
          });
        });

        const orderId = await Order.insertBasicOrder(
          customer_id,
          order_date,
          totalOrderCost,
          payment_method
        );

        if (payment_method === "cash")
          await finance.changeCashVlaue(totalOrderCost);
        else if (payment_method === "debt") {
          await finance.changeOwedValue(totalOrderCost);
          await customer.changeDebtOfCustomer(customer_id, totalOrderCost);
        } else if (payment_method === "soldprod")
          await Order.handleSoldProdPayment(-1, orderId, orderItems);

        await new Promise((res, rej) => {
          db.run("commit", function (err) {
            if (err) {
              db.run("rollback");
              console.log("failed to commit");
              rej(err);
            } else {
              console.log("i committed the transaction");
              res();
            }
          });
        });
        resolve({
          message: "successfully added the new product order",
          orderId,
        });
      });
    } catch (err) {
      db.run("rollback");
      console.log("failed to add product order", err);
      reject(err);
    }
  });
};
module.exports = addProductOrder;
