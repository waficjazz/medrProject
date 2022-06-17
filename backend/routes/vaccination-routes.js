const express = require("express");

const vaccinationController = require("../controllers/vaccination-controller");

const router = express.Router();

router.post("/add", vaccinationController.addVaccination);
router.get("/all/:id", vaccinationController.getVaccinations);
router.get("/one/:id", vaccinationController.getOneVaccination);
router.delete("/delete/:id", vaccinationController.deleteVaccination);
router.post("/update/", vaccinationController.updateVaccination);

module.exports = router;
