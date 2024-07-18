const db = require("./db");

class Notification {
  static clients = [];

  static registerClient(client) {
    Notification.clients.push(client);
  }

  static unregisterClient(argclient) {
    Notification.clients = Notification.clients.filter(
      (client) => client !== argclient
    );
  }

  static sendEvent(data) {
    Notification.clients.forEach((client) => {
      client.write(`data: ${JSON.stringify(data)}\n\n`);
    });
  }

  // Create a new notification
  static async createNotification(data) {
    const query = `
      INSERT INTO Notification (name, description, created_at)
      VALUES (?, ?, CURRENT_TIMESTAMP)
    `;
    const { description, name, selling_price, buying_price } = data;
    const total_description = JSON.stringify({
      description,
      name,
      selling_price,
      buying_price,
    });

    return new Promise((resolve, reject) => {
      db.run(query, [description, total_description], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: this.lastID,
            name,
            description,
            seen: 0,
            created_at: new Date(),
          });
          Notification.sendEvent({
            id: this.lastID,
            name,
            description,
            seen: 0,
            created_at: new Date(),
          });
        }
      });
    });
  }
  // Read all notifications
  static async readAllNotifications() {
    const query = `
      SELECT * FROM Notification
    `;
    return new Promise((resolve, reject) => {
      db.all(query, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Mark a notification as seen
  static async makeNotificationSeen(id) {
    const query = `
      UPDATE Notification
      SET seen = 1
      WHERE id = ?
    `;
    return new Promise((resolve, reject) => {
      db.run(query, [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id });
        }
      });
    });
  }

  // Read a specific notification by ID
  static async readNotificationById(id) {
    const query = `
      SELECT * FROM Notification
      WHERE id = ?
    `;
    return new Promise((resolve, reject) => {
      db.get(query, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  // Delete a notification by ID
  static async deleteNotification(id) {
    const query = `
      DELETE FROM Notification
      WHERE id = ?
    `;
    return new Promise((resolve, reject) => {
      db.run(query, [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id });
        }
      });
    });
  }

  // Update a notification's description by ID
  static async updateNotificationDescription(id, newDescription) {
    const query = `
      UPDATE Notification
      SET description = ?
      WHERE id = ?
    `;
    return new Promise((resolve, reject) => {
      db.run(query, [newDescription, id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id, newDescription });
        }
      });
    });
  }

  // Get the latest 10 notifications
  static async getLatest10Notifications() {
    const query = `
      SELECT * FROM Notification
      ORDER BY created_at DESC
      LIMIT 10
    `;
    return new Promise((resolve, reject) => {
      db.all(query, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Get notifications from the last 30 days
  static async getNotificationsFromLast30Days() {
    const query = `
      SELECT * FROM Notification
      WHERE created_at >= datetime('now', '-30 days')
      ORDER BY created_at DESC
    `;
    return new Promise((resolve, reject) => {
      db.all(query, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = Notification;
