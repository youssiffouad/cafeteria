const Notification = require("../models/Notification");

class NotificationController {
  static async readAllNotifications(req, res) {
    try {
      const notifications = await Notification.readAllNotifications();
      res.status(200).json(notifications);
    } catch (err) {
      res.status(500).json({ error: "Failed to read all notifications" });
    }
  }

  static async makeNotificationSeen(req, res) {
    const { id } = req.params;
    try {
      const result = await Notification.makeNotificationSeen(id);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: "Failed to mark notification as seen" });
    }
  }

  static async getLatest10Notifications(req, res) {
    try {
      const notifications = await Notification.getLatest10Notifications();
      res.status(200).json(notifications);
    } catch (err) {
      res.status(500).json({ error: "Failed to get latest 10 notifications" });
    }
  }

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

  static registerClient(req, res) {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    Notification.registerClient(res);

    req.on("close", () => {
      Notification.unregisterClient(res);
    });
  }
}

module.exports = NotificationController;
