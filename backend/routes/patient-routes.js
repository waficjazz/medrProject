const express = require("express");

const patientController = require("../controllers/patient-controller");

const router = express.Router();

router.post("/", patientController.signup);

module.exports = router;
