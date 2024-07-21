const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/NotificationController");

// Routes
router.get(
  "/readallnotifications",
  notificationController.readAllNotifications
);
router.put("/:id/mark-seen", notificationController.makeNotificationSeen);
router.get("/latest", notificationController.getLatest10Notifications);
router.get(
  "/latest-30-days",
  notificationController.getNotificationsFromLast30Days
);

router.get("/stream", notificationController.registerClient);

module.exports = router;
