const express = require("express");

const surgeryController = require("../controllers/surgery-controller");

const router = express.Router();

router.post("/add", surgeryController.addSurgery);
router.get("/all/:id", surgeryController.getSurgeries);
// router.get("/one/:id", vaccinationController.getOneVaccination);
router.delete("/delete/:id", surgeryController.deleteSurgery);
// router.post("/update/", vaccinationController.updateVaccination);

module.exports = router;
