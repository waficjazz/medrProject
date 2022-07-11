const express = require("express");
const { auth } = require("../middleware/rbac");

const vaccinationController = require("../controllers/vaccination-controller");

const router = express.Router();

router.post("/add", auth, vaccinationController.addVaccination);
router.get("/all/:id", vaccinationController.getVaccinations);
router.get("/one/:id", vaccinationController.getOneVaccination);
router.delete("/delete/:id", auth, vaccinationController.deleteVaccination);
router.post("/update/", auth, vaccinationController.updateVaccination);

module.exports = router;
