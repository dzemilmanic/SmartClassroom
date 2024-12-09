const express = require("express");
const lostFoundController = require("../controllers/lostFoundController");
const router = express.Router();

router.get("/", lostFoundController.getAllLostFound);
router.get("/:id", lostFoundController.getLostFoundById);
router.post("/", lostFoundController.createLostFound);
router.put("/:id", lostFoundController.updateLostFound);
router.delete("/:id", lostFoundController.deleteLostFound);

module.exports = router;