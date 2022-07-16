const express = require("express");
const { check } = require("express-validator");
const hospitalController = require("../controllers/hospital-controller");
const analytics = require("../controllers/analytics-controller");
const { auth } = require("../middleware/rbac");
const router = express.Router();

router.get("/test", analytics.test);

router.get("/vhospitals/all", hospitalController.getVerfiedHospitals);
router.get("/visits/:id", hospitalController.gethospitalVisits);
router.get("/visit/one/:id", hospitalController.getOneVisit);
router.post("/update", auth, hospitalController.updateHospital);
router.post("/visit/update/", auth, hospitalController.updateVisit);
router.get("/", hospitalController.getHospitals);
router.get("/:id", hospitalController.getHospitalById);
router.get("/verified/:id", hospitalController.getVerifiedHospitalById);
router.post("/visits/add", auth, hospitalController.addHospitalVisit);
router.post("/add", auth, hospitalController.addHospital);
router.post("/signup", [check("email").normalizeEmail().isEmail(), check("password").isLength({ min: 5 })], hospitalController.signup);
router.post("/signin", hospitalController.signin);
router.delete("/delete/visit/:id", auth, hospitalController.deleteHopitalVisit);
router.post("/verifyCode", hospitalController.verifyCode);
module.exports = router;
