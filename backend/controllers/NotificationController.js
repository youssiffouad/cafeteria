const Notification = require("../models/Notification");

class NotificationController {
  /**
   * Fetches all notifications.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Promise<void>} - Responds with JSON containing all notifications or an error message.
   */
  static async readAllNotifications(req, res) {
    try {
      const notifications = await Notification.readAllNotifications();
      res.status(200).json(notifications);
    } catch (err) {
      res.status(500).json({ error: "Failed to read all notifications" });
    }
  }

  /**
   * Marks a notification as seen.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Promise<void>} - Responds with JSON containing the result or an error message.
   */
  static async makeNotificationSeen(req, res) {
    const { id } = req.params;
    try {
      const result = await Notification.makeNotificationSeen(id);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: "Failed to mark notification as seen" });
    }
  }

  /**
   * Fetches the latest 10 notifications.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Promise<void>} - Responds with JSON containing the latest 10 notifications or an error message.
   */
  static async getLatest10Notifications(req, res) {
    try {
      const notifications = await Notification.getLatest10Notifications();
      res.status(200).json(notifications);
    } catch (err) {
      res.status(500).json({ error: "Failed to get latest 10 notifications" });
    }
  }

  /**
   * Fetches notifications from the last 30 days.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Promise<void>} - Responds with JSON containing notifications from the last 30 days or an error message.
   */
  static async getNotificationsFromLast30Days(req, res) {
    try {
      const notifications = await Notification.getNotificationsFromLast30Days();
      res.status(200).json(notifications);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Failed to get notifications from the last 30 days" });
    }
  }

  /**
   * Registers a client for server-sent events.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  static registerClient(req, res) {
    const clientId = req.query.clientId; // Extract client ID from query parameters
    if (!clientId) {
      res.status(400).send("Client ID is required");
      return;
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    Notification.registerClient(clientId, res); //response object is sent as argument to register client to keep the connection

    req.on("close", () => {
      Notification.unregisterClient(clientId);
    });
  }
}

module.exports = NotificationController;
