const express = require("express");
const { auth } = require("../middleware/rbac");

const prescirptionController = require("../controllers/prescription-controller");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();

router.post("/add", prescirptionController.addPrescription);
module.exports = router;
