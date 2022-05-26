const express = require("express");

const hospitalController = require("../controllers/hospital-controller");

const router = express.Router();

router.get("/visits/:id", hospitalController.gethospitalVisits);
router.get("/", hospitalController.getHospitals);
router.post("/visits/add", hospitalController.addHospitalVisit);
router.post("/add", hospitalController.addHospital);

module.exports = router;
