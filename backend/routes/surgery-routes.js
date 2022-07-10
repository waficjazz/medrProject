const express = require("express");

const surgeryController = require("../controllers/surgery-controller");

const router = express.Router();

router.post("/add", surgeryController.addSurgery);
router.get("/all/:id", surgeryController.getSurgeries);
// router.get("/one/:id", vaccinationController.getOneVaccination);
router.delete("/delete/:id", surgeryController.deleteSurgery);
// router.post("/update/", vaccinationController.updateVaccination);
router.get("/visit/:id/:vid", surgeryController.getSurgeriesByVisit);
router.get("/one/:id", surgeryController.getOneSurgery);
router.post("/update", surgeryController.updateSurgery);
module.exports = router;
