const express = require("express");

const clinicalController = require("../controllers/clinical-controller");
const { auth } = require("../middleware/rbac");
const router = express.Router();

router.get("/visits/:id", clinicalController.getClinicalVisits);
router.get("/one/:id", clinicalController.getOneVisit);
router.post("/visits/add", auth, clinicalController.addClinicalVisit);
router.post("/visit/update", auth, clinicalController.updateVisit);
router.delete("/delete/visit/:id", auth, clinicalController.deleteClinicalVisit);
module.exports = router;
