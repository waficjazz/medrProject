const express = require("express");
const { auth } = require("../middleware/rbac");

const surgeryController = require("../controllers/surgery-controller");

const router = express.Router();

router.post("/add", auth, surgeryController.addSurgery);
router.get("/all/:id", surgeryController.getSurgeries);
// router.get("/one/:id", vaccinationController.getOneVaccination);
router.delete("/delete/:id", auth, surgeryController.deleteSurgery);
// router.post("/update/", vaccinationController.updateVaccination);
router.get("/visit/:id/:vid", surgeryController.getSurgeriesByVisit);
router.get("/one/:id", surgeryController.getOneSurgery);
router.post("/update", auth, surgeryController.updateSurgery);
module.exports = router;
