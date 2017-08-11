const express = require("express");
const eventController = require("../controllers/eventController");

const router = express.Router();

router.get("/", eventController.getAllEvents);
router.post("/", eventController.addNewEvent);
router.get("/:id", eventController.getEventById);
router.delete("/:id", eventController.deleteEventById);
router.put("/:id", eventController.changeEventInfo);

// брони определенного пользователя

module.exports = router;
