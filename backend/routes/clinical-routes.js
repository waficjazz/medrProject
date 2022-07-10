const express = require("express");

const clinicalController = require("../controllers/clinical-controller");

const router = express.Router();

router.get("/visits/:id", clinicalController.getClinicalVisits);
router.get("/one/:id", clinicalController.getOneVisit);
router.post("/visits/add", clinicalController.addClinicalVisit);
router.post("/visit/update", clinicalController.updateVisit);
router.delete("/delete/visit/:id", clinicalController.deleteClinicalVisit);
module.exports = router;
