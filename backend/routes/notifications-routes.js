const express = require("express");

const notificationController = require("../controllers/notfications-controller");
const router = express.Router();

router.post("/add", notificationController.addNotification);
router.post("/update", notificationController.updateNotification);
router.get("/:id", notificationController.getNotifications);
module.exports = router;
