const express = require("express");
const materialsController = require("../controllers/materialsController");
const router = express.Router();

router.get("/", materialsController.getAllMaterials);
router.get("/:id", materialsController.getMaterialById);
router.post("/", materialsController.createMaterial);
router.put("/:id", materialsController.updateMaterial);
router.delete("/:id", materialsController.deleteMaterial);

module.exports = router;