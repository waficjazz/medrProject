const express = require("express");

const clinicalController = require("../controllers/clinical-controller");

const router = express.Router();

router.get("/visits/:id", clinicalController.getclinicalVisits);
router.post("/visits/add", clinicalController.getclinicalVisits);

module.exports = router;
