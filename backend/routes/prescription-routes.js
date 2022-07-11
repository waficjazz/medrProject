const express = require("express");
const { auth } = require("../middleware/rbac");

const prescirptionController = require("../controllers/prescription-controller");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();

router.post("/add", prescirptionController.addPrescription);
router.post("/update", prescirptionController.updatePrescription);
router.get("/all/:id", prescirptionController.getPrescriptions);
router.get("/one/:id", prescirptionController.getOne);
router.delete("/delete/:id", prescirptionController.deletePrescription);
module.exports = router;
