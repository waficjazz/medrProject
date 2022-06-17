const express = require("express");

const vaccinationController = require("../controllers/vaccination-controller");

const router = express.Router();

router.post("/add", vaccinationController.addVaccination);
router.get("/all/:id", vaccinationController.getVaccinations);
router.delete("/delete/:id", vaccinationController.deleteVaccination);

module.exports = router;
