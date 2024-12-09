const express = require("express");
const notificationController = require("../controllers/notificationsController");
const router = express.Router();

router.get("/", notificationController.getAllNotifications);
router.post("/", notificationController.createNotification);
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;