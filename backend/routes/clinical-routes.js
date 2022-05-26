const express = require("express");

const clinicalController = require("../controllers/clinical-controller");

const router = express.Router();

router.get("/visits/:id", clinicalController.getClinicalVisits);
router.post("/visits/add", clinicalController.addClinicalVisit);

module.exports = router;
