const db = require("./db");

class Order {
  // Function to add a new order
  static addOrder(
    customer_id,
    order_date,
    orderItems,
    totalOrderCost,
    callback
  ) {
    db.run("PRAGMA foreign_keys=on");

    // Insert the order into the Orders table
    db.run(
      `INSERT INTO Orders (customer_id, order_date, price) VALUES (?, ?, ?)`,
      [customer_id, order_date, totalOrderCost],
      function (err) {
        if (err) {
          console.error(err);
          callback(err);
        } else {
          const orderId = this.lastID; // Retrieve the ID of the newly inserted order

          // Decrease the quantity of each product in the Products table
          decreaseProductQuantity(orderItems, () => {
            insertOrderItems(orderId, orderItems, () => {
              callback(null, {
                message: "Order added successfully",
                order_id: orderId,
              });
            });
          });
        }
      }
    );

    // Function to decrease the quantity of each product in the Products table
    const decreaseProductQuantity = (orderItems, callback) => {
      orderItems.forEach((item, index) => {
        const { prod, quantity } = item;
        db.run(
          `UPDATE Products SET quantity = quantity - ? WHERE id = ?`,
          [quantity, prod.id],
          function (err) {
            if (err) {
              console.error(err);
            } else {
              console.log(`Decreased quantity for product ${prod.id}`);
            }

            // Check if all products have been processed
            if (index === orderItems.length - 1) {
              callback();
            }
          }
        );
      });
    };

    // Function to insert individual order items into the OrderItems table
    function insertOrderItems(orderId, orderItems, callback) {
      orderItems.forEach((item, index) => {
        const { prod, quantity } = item;
        db.run(
          `INSERT INTO OrderItems (order_id, product_id, quantity) VALUES (?, ?, ?)`,
          [orderId, prod.id, quantity],
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
  }

  // Function to view all orders

  static viewOrders(callback) {
    db.all(
      `
      SELECT o.id, o.order_date, c.name AS customer_name,r.name as rankname, SUM(p.selling_price * oi.quantity) AS order_price
      FROM Orders o
      JOIN Customers c ON c.id = o.customer_id
      join Ranks r on r.id= c.rank_id
      JOIN OrderItems oi ON oi.order_id = o.id
      JOIN Products p ON p.id = oi.product_id
      GROUP BY o.id, o.order_date, customer_name`,
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

  // Function to delete an order and increase the quantity of products
  static deleteOrder(orderId, callback) {
    db.serialize(() => {
      db.run("BEGIN TRANSACTION");

      // Retrieve the order items associated with the order
      db.all(
        `SELECT product_id, quantity FROM OrderItems WHERE order_id = ?`,
        [orderId],
        (err, rows) => {
          if (err) {
            console.error(err);
            db.run("ROLLBACK");
            callback(err);
          } else {
            // Delete the order and associated order items using cascade deletion
            db.run(`DELETE FROM Orders WHERE id = ?`, [orderId], (err) => {
              if (err) {
                console.error(err);
                db.run("ROLLBACK");
                callback(err);
              } else {
                console.log(
                  ` i  deeeeeeeeeeeeeeeeeeeeeeleted the fuchon order`
                );
                console.log(orderId);
                // Increase the quantity of each product in the Products table
                rows.forEach((row) => {
                  const { product_id, quantity } = row;
                  db.run(
                    `UPDATE Products SET quantity = quantity + ? WHERE id = ?`,
                    [quantity, product_id],
                    (err) => {
                      if (err) {
                        console.error(err);
                        db.run("ROLLBACK");
                        callback(err);
                      }
                    }
                  );
                });

                db.run("COMMIT");
                callback(null, { message: "Order deleted successfully" });
              }
            });
          }
        }
      );
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

  // Add other order-related methods here
}

module.exports = Order;
