const db = require("./db");

class OrderItems {
  // Function to insert a sandwich order item
  static insertSandwichOrderItem(order_id, sandwich_id, quantity) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO OrderItems (order_id, sandwich_id, quantity)
        VALUES (?, ?, ?)
      `;
      const params = [order_id, sandwich_id, quantity];

      db.run(sql, params, function(err) {
        if (err) {
          console.error('Failed to insert sandwich order item', err);
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  // Function to get quantity by order_id
  static getQuantityByOrderId(order_id) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT quantity FROM OrderItems WHERE order_id = ?
      `;
      const params = [order_id];

      db.get(sql, params, (err, row) => {
        
        if (err) {
          console.error('Failed to get quantity', err);
          reject(err);
        } else {
          const quantity = row ? row.quantity : null;
          console.log("here is the quantity",quantity)
          resolve(quantity);
        }
      });
    });
  }
}







module.exports = OrderItems;
