const express = require("express");

const patientController = require("../controllers/patient-controller");

const router = express.Router();

router.get("/info/:id", patientController.patientInfo);
router.post("/signup", patientController.signup);

module.exports = router;
