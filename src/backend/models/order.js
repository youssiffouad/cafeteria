const db = require("./db");

class Order {
  // Function to return customer ID given order ID
  static async getCustomerID(orderID) {
    return new Promise((res, rej) => {
      db.get(
        `SELECT customer_id FROM Orders WHERE id = ?`,
        [orderID],
        (err, row) => {
          if (err) {
            console.error(err);
            res("error in getting customer id of certain order", err);
          } else {
            const customerID = row ? row.customer_id : null;
            res(customerID);
          }
        }
      );
    });
  }

  // Function to return order items given order ID
  static async getOrderItems(orderID) {
    return new Promise((res, rej) => {
      db.all(
        `SELECT * FROM OrderItems WHERE order_id = ?`,
        [orderID],
        (err, rows) => {
          if (err) {
            console.error("error getting order items", err);
            rej(err);
          } else {
            res(rows);
          }
        }
      );
    });
  }

  static getSandwichIdFromOrderId = async (orderId) => {
    return new Promise((res, rej) => {
      const sql = `select sandwich_id from Orders where id=?`;
      db.get(sql, orderId, function (err, row) {
        if (err) {
          console.log(
            "failed to get sandwich id of certain order",
            orderId,
            err
          );
          rej(err);
        } else {
          res(row.sandwich_id);
        }
      });
    });
  };

  // Function to return payment method given order ID
  static async getPaymentMethod(orderID) {
    return new Promise((res, rej) => {
      db.get(
        `SELECT payment_method FROM Orders WHERE id = ?`,
        [orderID],
        (err, row) => {
          if (err) {
            console.error("failed to get payment method of certain order", err);
            rej(err);
          } else {
            const paymentMethod = row ? row.payment_method : null;
            res(paymentMethod);
          }
        }
      );
    });
  }

  // Function to return total order cost given order ID
  static getTotalOrderCost(orderID) {
    return new Promise((res, rej) => {
      db.get(
        `SELECT price
        FROM Orders where id=${orderID}
      `,
        (err, row) => {
          if (err) {
            console.error("failed to get total order cost", err);
            rej(err);
          } else {
            console.log(row);
            console.log(`iam totalordercost`);
            console.log(row.price);

            res(row.price);
          }
        }
      );
    });
  }

  //function to add SanwichOrder
  static insertSandwichOrder = async (
    price,
    payment_method,
    customer_id,
    order_date,
    sandwich_id
  ) => {
    return new Promise((res, rej) => {
      try {
        console.log(
          "here are hte parameters i received",
          price,
          payment_method,
          customer_id,
          order_date,
          sandwich_id
        );
        const sql = `insert into Orders ( price ,payment_method ,customer_id , order_date ,is_sandwich, sandwich_id) values (?,?,?,?,?,?)`;
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
            console.log(
              "failure inserting sandwich order into orders table",
              err
            );
            rej(err);
          } else {
            console.log(
              "i succedded inserting sandwich order into orders table"
            );
            const order_id = this.lastID;
            res({ message: "sandwich order added successfully", order_id });
          }
        });
      } catch (err) {
        console.log("failed to inset sandwich order", err);
        rej(err);
      }
    });
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

          orderId = await Order.insertBasicOrder(
            customer_id,
            order_date,
            totalOrderCost,
            payment_method
          );

          let result = await Order.insertSandwichOrder(
            totalOrderCost,
            payment_method,
            customer_id,
            order_date,
            sandwich_id
          );
          orderId = result.order_id;

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

  static deleteOrder(orderId) {
    db.serialize(async () => {
      try {
        db.run("BEGIN TRANSACTION");

        let customer_id = await Order.getCustomerID(orderId);

        // Retrieve order items
        let orderItems = await Order.getOrderItems(orderId);

        // Retrieve payment method
        let payment_method = await Order.getPaymentMethod(orderId);

        // Retrieve total order cost
        let totalOrderCost = await Order.getTotalOrderCost(orderId);
        // Determine payment handler based on payment method
        if (payment_method === "cash") await handleCashPayment(-totalOrderCost);
        else if (payment_method === "debt")
          await handleDebtPayment(customer_id, -totalOrderCost);
        else if (payment_method === "soldprod")
          await handleSoldProdPayment(1, orderId, orderItems);

        Order.deleteOrderRow(orderId, (err) => {
          if (err) {
            throw err;
          } else {
            db.run("COMMIT");
            console.log({
              message: "Order deleted successfully",
              order_id: orderId,
            });
          }
        });
        db.run("commit");
      } catch (err) {
        db.run("rollback");
        console.log("failed to delte order");
        throw err;
      }
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

  // Function to delete order row
  static deleteOrderRow(orderId, callback) {
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
        Order.deleteOrderRow(orderId, (err) => {
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
