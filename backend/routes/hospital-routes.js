const express = require("express");

const hospitalController = require("../controllers/hospital-controller");

const router = express.Router();

router.get("/vhospitals/all", hospitalController.getVerfiedHospitals);
router.get("/visits/:id", hospitalController.gethospitalVisits);
router.get("/visit/one/:id", hospitalController.getOneVisit);
router.post("/update", hospitalController.updateHospital);
router.post("/visit/update/", hospitalController.updateVisit);
router.get("/", hospitalController.getHospitals);
router.get("/:id", hospitalController.getHospitalById);
router.get("/verified/:id", hospitalController.getVerifiedHospitalById);
router.post("/visits/add", hospitalController.addHospitalVisit);
router.post("/add", hospitalController.addHospital);
router.post("/signup", hospitalController.signup);
router.post("/signin", hospitalController.signin);
router.delete("/delete/visit/:id", hospitalController.deleteHopitalVisit);
router.post("/verifyCode", hospitalController.verifyCode);
module.exports = router;
