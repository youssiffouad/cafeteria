const db = require("./db");

class Order {
  // Function to return customer ID given order ID
  static getCustomerID(orderID, callback) {
    db.get(
      `SELECT customer_id FROM Orders WHERE id = ?`,
      [orderID],
      (err, row) => {
        if (err) {
          console.error(err);
          callback(err, null);
        } else {
          const customerID = row ? row.customer_id : null;
          callback(null, customerID);
        }
      }
    );
  }

  // Function to return order items given order ID
  static getOrderItems(orderID, callback) {
    db.all(
      `SELECT * FROM OrderItems WHERE order_id = ?`,
      [orderID],
      (err, rows) => {
        if (err) {
          console.error(err);
          callback(err, null);
        } else {
          callback(null, rows);
        }
      }
    );
  }

  // Function to return payment method given order ID
  static getPaymentMethod(orderID, callback) {
    db.get(
      `SELECT payment_method FROM Orders WHERE id = ?`,
      [orderID],
      (err, row) => {
        if (err) {
          console.error(err);
          callback(err, null);
        } else {
          const paymentMethod = row ? row.payment_method : null;
          callback(null, paymentMethod);
        }
      }
    );
  }

  // Function to return total order cost given order ID
  static getTotalOrderCost(orderID, callback) {
    db.get(
      `SELECT price
      FROM Orders where id=${orderID}
    `,
      (err, row) => {
        if (err) {
          console.error(err);
          callback(err, null);
        } else {
          console.log(row);
          console.log(`iam totalordercost`);
          console.log(row.price);

          callback(null, row.price);
        }
      }
    );
  }

  //function to add SanwichOrder
  static addSanwichOrder = async (
    price,
    payment_method,
    customer_id,
    order_date,
    sandwich_id
  ) => {
    try {
      return new Promise((res, rej) => {
        const sql = `insert into Orders ( price ,payment_method ,customer_id , order_date ,is_sandwich, sandwich_id)`;
        const params = [
          price,
          payment_method,
          customer_id,
          order_date,
          1,
          sandwich_id,
        ];
        db.run(sql, params, function (err) {
          if (err) {
            rej(err);
          } else {
            const order_id = this.lastID;
            res({ message: "sandwich order added successfully", order_id });
          }
        });
      });
    } catch (err) {}
  };
  // Main function to add an order
  static async addOrder(
    customer_id,
    order_date,
    orderItems,
    payment_method,
    totalOrderCost,
    sandwich_id
  ) {
    return new Promise((res, rej) => {
      db.serialize(async () => {
        try {
          db.run("PRAGMA foreign_keys=on");

          db.run("BEGIN TRANSACTION");
          let orderId;
          if (!sandwich_id) {
            orderId = await Order.insertBasicOrder(
              customer_id,
              order_date,
              totalOrderCost,
              payment_method
            );
          } else {
            let result = await Order.addSanwichOrder(
              totalOrderCost,
              payment_method,
              customer_id,
              order_date,
              sandwich_id
            );
            orderId = result.order_id;
          }

          if (payment_method === "cash")
            await handleCashPayment(totalOrderCost);
          else if (payment_method === "debt")
            await handleDebtPayment(customer_id, totalOrderCost);
          else if (payment_method === "soldprod")
            await handleSoldProdPayment(-1, orderId, orderItems);
          db.run("commit");
          res(orderId);
        } catch (err) {
          db.run("rollback");
          console.log(err);
          rej(err);
        }
      });
    });
  }

  // Function to view all orders without corresponding orderitem

  static viewOrders(callback) {
    db.all(
      `
      SELECT o.id, o.order_date,o.payment_method, c.name AS customer_name,r.name as rankname, o.price AS order_price
      FROM Orders o
     left JOIN Customers c ON c.id = o.customer_id
     left join Ranks r on r.id= c.rank_id`,
      (err, rows) => {
        if (err) {
          callback(err);
        } else {
          callback(null, rows);
        }
      }
    );
  }

  // Function to view all orders with corresponding orderitem

  static viewOrderswithItem(callback) {
    db.all(
      `
      SELECT o.id, o.order_date,o.payment_method,p.name,p.selling_price,oi.quantity, o.price AS order_price
      FROM Orders o
       join Products p on p.id = oi.product_id
       join OrderItems oi on oi.order_id=o.id
     `,
      (err, rows) => {
        if (err) {
          callback(err);
        } else {
          callback(null, rows);
        }
      }
    );
  }

  //function to filter orders between certain dates(in certain interval)
  static filterOrdersdate(startDate, endDate, callback) {
    db.all(
      `
      SELECT o.id, o.order_date, c.name AS customer_name, r.name AS rankname, SUM(p.selling_price * oi.quantity) AS order_price
      FROM Orders o
      JOIN Customers c ON c.id = o.customer_id
      JOIN Ranks r ON r.id = c.rank_id
      JOIN OrderItems oi ON oi.order_id = o.id
      JOIN Products p ON p.id = oi.product_id
      WHERE o.order_date BETWEEN ? AND ?
      GROUP BY o.id, o.order_date, customer_name`,
      [startDate, endDate],
      (err, rows) => {
        if (err) {
          callback(err);
        } else {
          callback(null, rows);
        }
      }
    );
  }

  static deleteOrder(orderId, callback) {
    db.serialize(() => {
      db.run("BEGIN TRANSACTION");

      let paymentHandler;
      let payment_method;
      let totalOrderCost;
      let customer_id;
      let orderItems;

      // Retrieve customer ID
      this.getCustomerID(orderId, (err, custid) => {
        if (err) {
          console.error(err);
          // Handle the error
        } else {
          customer_id = custid;

          // Retrieve order items
          this.getOrderItems(orderId, (err, rows) => {
            if (err) {
              console.error(err);
              // Handle the error
            } else {
              orderItems = rows;

              // Retrieve payment method
              this.getPaymentMethod(orderId, (err, pm) => {
                if (err) {
                  console.error(err);
                  // Handle the error
                } else {
                  payment_method = pm;

                  // Retrieve total order cost
                  this.getTotalOrderCost(orderId, (err, tot) => {
                    if (err) {
                      console.error(err);
                      // Handle the error
                    } else {
                      totalOrderCost = tot;
                      console.log(payment_method);
                      console.log(totalOrderCost);
                      console.log(customer_id);
                      console.log(orderItems);

                      // Determine payment handler based on payment method
                      if (payment_method === "cash") {
                        paymentHandler = (callback) =>
                          handleCashPayment(-totalOrderCost, callback);
                      } else if (payment_method === "debt") {
                        paymentHandler = (callback) =>
                          handleDebtPayment(
                            customer_id,
                            -totalOrderCost,
                            callback
                          );
                      } else if (payment_method === "soldprod") {
                        paymentHandler = (callback) =>
                          handleSoldProdPayment(
                            1,
                            orderId,
                            orderItems,
                            callback
                          );
                      }

                      // Invoke the payment handler
                      if (typeof paymentHandler === "function") {
                        paymentHandler((err) => {
                          if (err) {
                            db.run("ROLLBACK");
                            callback(err);
                          } else {
                            deleteOrderRow(orderId, (err) => {
                              if (err) {
                                callback(err);
                              } else {
                                db.run("COMMIT");
                                callback(null, {
                                  message: "Order deleted successfully",
                                  order_id: orderId,
                                });
                              }
                            });
                          }
                        });
                      } else {
                        // Payment handler is not defined
                        db.run("ROLLBACK");
                        callback(new Error("Invalid payment method"));
                      }
                    }
                  });
                }
              });
            }
          });
        }
      });
    });
  }
  // Function to filter orders by customer_id
  static filterOrdersByCustomerId(customerId, callback) {
    db.all(
      `
        SELECT o.id, o.order_date, c.name AS customer_name, r.name AS rankname, SUM(p.selling_price * oi.quantity) AS order_price
        FROM Orders o
        JOIN Customers c ON c.id = o.customer_id
        JOIN Ranks r ON r.id = c.rank_id
        JOIN OrderItems oi ON oi.order_id = o.id
        JOIN Products p ON p.id = oi.product_id
        WHERE o.customer_id = ?
        GROUP BY o.id, o.order_date, customer_name`,
      [customerId],
      (err, rows) => {
        if (err) {
          callback(err);
        } else {
          callback(null, rows);
        }
      }
    );
  }

  // Function to filter orders by customer_id and date interval
  static filterOrdersByCustomerAndDateInterval(
    customerId,
    startDate,
    endDate,
    callback
  ) {
    db.all(
      `
      SELECT o.id, o.order_date, c.name AS customer_name, r.name AS rankname, SUM(p.selling_price * oi.quantity) AS order_price
      FROM Orders o
      JOIN Customers c ON c.id = o.customer_id
      JOIN Ranks r ON r.id = c.rank_id
      JOIN OrderItems oi ON oi.order_id = o.id
      JOIN Products p ON p.id = oi.product_id
      WHERE o.customer_id = ? AND o.order_date BETWEEN ? AND ?
      GROUP BY o.id, o.order_date, customer_name`,
      [customerId, startDate, endDate],
      (err, rows) => {
        if (err) {
          callback(err);
        } else {
          callback(null, rows);
        }
      }
    );
  }

  // Function to insert an order into the Orders table
  static insertBasicOrder(
    customer_id,
    order_date,
    totalOrderCost,
    payment_method
  ) {
    return new Promise((res, rej) => {
      const sql = `INSERT INTO Orders (customer_id, order_date, price, payment_method,is_sandwich ,
      sandwich_id) VALUES (?, ?, ?, ?,?,?)`;
      const params = [
        customer_id,
        order_date,
        totalOrderCost,
        payment_method,
        0,
        null,
      ];
      db.run(sql, params, function (err) {
        if (err) {
          console.error(err);
          rej(err);
        } else {
          const orderId = this.lastID;
          res(orderId);
        }
      });
    });
  }

  // Add other order-related methods here
}

module.exports = Order;

// Function to change the quantity of each product in the Products table
const changeProductQuantity = (IncOrDec, orderItems, callback) => {
  orderItems.forEach((item, index) => {
    const { quantity, product_id } = item;

    console.log(`the od=rder items are`);
    console.log(orderItems);
    console.log(`the product is `);
    console.log(product_id);
    console.log(`the quantity is `);
    console.log(quantity);
    console.log(`a7aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`);
    console.log(updateProductInStockValue);
    // updateProductInStockValue(IncOrDec, product_id, quantity, null);
    updateProductInStockValue(IncOrDec, product_id, quantity, (err) => {
      if (err) {
        console.error(err);
        console.log(`a7aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`);
        console.log(typeof updateProductInStockValue);
        // Handle the error
      } else {
        // Handle the success
      }
    });
    db.run(
      `UPDATE Products SET quantity = quantity + ? WHERE id = ?`,
      [quantity * parseInt(IncOrDec), product_id],
      function (err) {
        if (err) {
          console.error(err);

          callback(err);
        } else {
          console.log(`Decreased quantity for product ${product_id}`);
        }

        // Check if all products have been processed
        if (index === orderItems.length - 1) {
          callback(null);
        }
      }
    );
  });
};
// Function to insert individual order items into the OrderItems table
function insertOrderItems(orderId, orderItems, callback) {
  orderItems.forEach((item, index) => {
    const { product_id, quantity } = item;
    db.run(
      `INSERT INTO OrderItems (order_id, product_id, quantity) VALUES (?, ?, ?)`,
      [orderId, product_id, quantity],
      function (err) {
        if (err) {
          console.error(err);
        } else {
          console.log(
            `Inserted order item with ID ${this.lastID} for order ${orderId}`
          );
        }

        // Check if all order items have been processed
        if (index === orderItems.length - 1) {
          callback();
        }
      }
    );
  });
}

// Function to handle cash payment method
async function handleCashPayment(totalOrderCost) {
  return new Promise((res, rej) => {
    db.run(
      ` UPDATE Financial SET cash = cash + ${totalOrderCost} WHERE id = 1;`,
      function (err) {
        if (err) {
          rej(err);
        } else {
          res();
        }
      }
    );
  });
}

// Function to handle debt payment method
async function handleDebtPayment(customer_id, totalOrderCost) {
  return new Promise((res, rej) => {
    db.run(
      `
    UPDATE Financial
    SET owed = owed + ${totalOrderCost}
    WHERE id = 1;
  `,
      function (err) {
        if (err) {
          rej(err);
        } else {
          res();
        }
      }
    );
  });
}

// Function to handle soldprod payment method
async function handleSoldProdPayment(IncOrDec, orderId, orderItems) {
  return new Promise((res, rej) => {
    if (IncOrDec === -1) {
      changeProductQuantity(-1, orderItems, () => {
        insertOrderItems(orderId, orderItems, (err) => {
          if (err) {
            rej(err);
          } else {
            res();
          }
        });
      });
    } else if (IncOrDec === 1) {
      changeProductQuantity(1, orderItems, () => {
        deleteOrderRow(orderId, (err) => {
          if (err) {
            rej(err);
          } else {
            res();
          }
        });
      });
    }
  });
}

// Function to delete order row
function deleteOrderRow(orderId, callback) {
  db.run(`DELETE FROM Orders WHERE id = ${orderId} `, (err) => {
    if (err) {
      console.error(err);
      callback(err);
    } else {
      console.log(`Deleted successfully`);
      callback(null);
    }
  });
}

// Function to update productsInStockValue in the Financial table
function updateProductInStockValue(IncOrDec, productID, quantity, callback) {
  db.get(
    `SELECT selling_price FROM Products WHERE id = ?`,
    [productID],
    (err, row) => {
      if (err) {
        console.error(err);
        callback(err);
      } else {
        const sellingPrice = row.selling_price;
        const addedvalue = parseInt(IncOrDec) * sellingPrice * quantity;
        db.run(
          `UPDATE Financial SET productsInStockValue = productsInStockValue + ?`,
          [addedvalue],
          (err) => {
            if (err) {
              console.error(err);
              callback(err);
            } else {
              callback(null);
            }
          }
        );
      }
    }
  );
}
