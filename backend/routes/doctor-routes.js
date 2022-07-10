const express = require("express");

const doctorController = require("../controllers/doctor-controller");

const router = express.Router();

router.post("/signup", doctorController.signup);
router.post("/signin", doctorController.signin);
router.post("/add", doctorController.addDoctor);
router.get("/verified/all", doctorController.getVerfiedDoctors);
router.post("/verifyCode", doctorController.verifyCode);
router.get("/one/:id", doctorController.getDoctorById);
router.post("/update", doctorController.updateDoctor);
module.exports = router;
