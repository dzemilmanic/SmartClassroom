const express = require("express");
const meetingController = require("../controllers/meetingsController");
const router = express.Router();

router.get("/", meetingController.getAllMeetings);
router.post("/", meetingController.createMeeting);
router.delete('/:id', meetingController.deleteMeeting);

module.exports = router;