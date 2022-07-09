const express = require("express");

const patientController = require("../controllers/patient-controller");

const router = express.Router();

router.get("/info/:id", patientController.patientInfo);
router.post("/signup", patientController.signup);
router.post("/signin", patientController.signin);
router.post("/update", patientController.updatePatient);
router.post("/verifyCode", patientController.verifyCode);

module.exports = router;
