const express = require("express");

const doctorController = require("../controllers/doctor-controller");

const router = express.Router();

router.post("/signup", doctorController.signup);
router.post("/signin", doctorController.signin);

module.exports = router;
