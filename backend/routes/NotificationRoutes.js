const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/NotificationController");

// Routes
router.get("/notifications", notificationController.readAllNotifications);
router.put(
  "/notifications/:id/mark-seen",
  notificationController.makeNotificationSeen
);
router.get(
  "/notifications/latest",
  notificationController.getLatest10Notifications
);
router.get(
  "/notifications/last-30-days",
  notificationController.getNotificationsFromLast30Days
);

// SSE endpoint
// router.get("/notifications/stream", (req, res) => {
//   res.setHeader("Content-Type", "text/event-stream");
//   res.setHeader("Cache-Control", "no-cache");
//   res.setHeader("Connection", "keep-alive");

//   notificationController.registerClient(res);

//   req.on("close", () => {
//     notificationController.unregisterClient(res);
//   });
// });
router.get("/notifications/stream", notificationController.registerClient);

module.exports = router;
