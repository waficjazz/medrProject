const express = require("express");

const hospitalController = require("../controllers/hospital-controller");

const router = express.Router();

router.get("/visits/:id", hospitalController.gethospitalVisits);
router.get("/", hospitalController.getHospitals);
router.get("/:id", hospitalController.getHospitalById);
router.post("/visits/add", hospitalController.addHospitalVisit);
router.post("/add", hospitalController.addHospital);
router.delete("/delete/visit/:id", hospitalController.deleteHopitalVisit);

module.exports = router;
