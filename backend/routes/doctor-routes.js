const express = require("express");

const doctorController = require("../controllers/doctor-controller");

const router = express.Router();

router.post("/signup", doctorController.signup);

module.exports = router;
