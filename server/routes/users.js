const express = require("express");
const usersController = require("../controllers/usersController");

const router = express.Router();

router.use(express.json());

router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getUserById);
router.post("/", usersController.createUser);
router.post("/login", usersController.login);
router.put("/:id", usersController.updateUser);
router.post("/:id/change-password", usersController.changePassword);

module.exports = router;

