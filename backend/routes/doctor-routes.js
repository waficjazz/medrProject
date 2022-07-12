const express = require("express");
const { check } = require("express-validator");
const doctorController = require("../controllers/doctor-controller");
const { auth } = require("../middleware/rbac");
const router = express.Router();

router.post("/signup", [check("email").normalizeEmail().isEmail(), check("password").isLength({ min: 5 })], doctorController.signup);
router.post("/signin", doctorController.signin);
router.post("/add", auth, doctorController.addDoctor);
router.get("/verified/all", doctorController.getVerfiedDoctors);
router.post("/verifyCode", doctorController.verifyCode);
router.get("/one/:id", doctorController.getDoctorById);
router.get("/verified/:id", doctorController.getVerifiedDoctorById);
router.post("/update", auth, doctorController.updateDoctor);
module.exports = router;
